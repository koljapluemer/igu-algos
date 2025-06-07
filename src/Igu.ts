import { Exercise } from "./types/exercises/Exercise";
import { ExerciseTemplate } from "./types/exerciseTemplates/ExerciseTemplate";
import { LearningGoal } from "./types/learningGoals/LearningGoal";
import { GeneratorSingle } from "./types/exerciseTemplates/generators/subclasses/GeneratorSingle";
import { GeneratorVaryPropertyWholeNumberRange } from "./types/exerciseTemplates/generators/subclasses/GeneratorVaryPropertyWholeNumberRange";
import { StrategyByInstruction } from "./types/exerciseTemplates/strategies/subclasses/StrategyByInstruction";

    export class Igu {

        // props

        private _exercisePool: Exercise[] = []
    

        // getters/setters
    
        get exercisePool() {
            return this._exercisePool
        }
    
        set exercisePool(exercises:Exercise[]) {
            this._exercisePool = exercises
        }  
        
        // private functions


        // public functions

        addExercises(exercises:Exercise[]) {
            this.exercisePool.push(...exercises)
        }

        getRandomDueExercise():Exercise | undefined {
            if (this._exercisePool.length === 0) {
                return undefined;
            }
            const randomIndex = Math.floor(Math.random() * this._exercisePool.length);
            return this._exercisePool[randomIndex];
        }

        // static functions

        public static makeExerciseTemplatesFromDataDict(dataDict: { [key: string]: any }): ExerciseTemplate[] {
            const templates: ExerciseTemplate[] = [];
            
            for (const [id, data] of Object.entries(dataDict)) {
                try {
                    // Create strategy
                    const strategy = new StrategyByInstruction();
                    
                    // Create generator based on type
                    let generator;
                    if (data.templateType.method === 'VARY_PROPERTY_WHOLE_NUMBER_RANGE') {
                        const generatorData = data.templateType.generator.data;
                        generator = new GeneratorVaryPropertyWholeNumberRange(
                            strategy,
                            generatorData.propertyToVary,
                            generatorData.lowestVariationNumber,
                            generatorData.highestVariationNumber
                        );
                    } else {
                        generator = new GeneratorSingle(strategy);
                    }
                    
                    // Create template
                    const template = new ExerciseTemplate(
                        id,
                        data.belongsTo,
                        generator,
                        data.data
                    );
                    
                    templates.push(template);
                } catch (error) {
                    console.warn(`Failed to create exercise template ${id}:`, error);
                }
            }
            
            return templates;
        }

        public static makeLearningGoalsFromDataDict(dataDict: { [key: string]: any }): LearningGoal[] {
            const goals: LearningGoal[] = [];
            const goalMap = new Map<string, LearningGoal>();
            
            // First pass: Create all learning goals
            for (const [id, data] of Object.entries(dataDict)) {
                try {
                    const goal = new LearningGoal(
                        id,
                        data.name,
                        data.isLesson,
                        data.data
                    );
                    
                    goals.push(goal);
                    goalMap.set(id, goal);
                } catch (error) {
                    console.warn(`Failed to create learning goal ${id}:`, error);
                }
            }
            
            // Second pass: Establish relationships
            for (const [id, data] of Object.entries(dataDict)) {
                const goal = goalMap.get(id);
                if (!goal) continue;
                
                // Handle associated learning goals
                if (data.associatedLearningGoals) {
                    const associatedGoals = data.associatedLearningGoals
                        .map((associatedId: string) => goalMap.get(associatedId))
                        .filter((g: LearningGoal | undefined) => g !== undefined) as LearningGoal[];
                    goal.setAssociatedLearningGoals(associatedGoals);
                }
                
                // Handle blocked by relationships
                if (data.blockedBy) {
                    const blockedByGoals = data.blockedBy
                        .map((blockedId: string) => goalMap.get(blockedId))
                        .filter((g: LearningGoal | undefined) => g !== undefined) as LearningGoal[];
                    goal.setBlockedBy(blockedByGoals);
                }
            }
            
            return goals;
        }
    }