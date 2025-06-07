import { Exercise } from "./types/exerciseTemplates/strategies/Exercise";
import { ExerciseTemplate } from "./types/exerciseTemplates/ExerciseTemplate";
import { LearningGoal } from "./types/learningGoals/LearningGoal";
import { GeneratorSingle } from "./types/exerciseTemplates/generators/subclasses/GeneratorSingle";
import { GeneratorVaryPropertyWholeNumberRange } from "./types/exerciseTemplates/generators/subclasses/GeneratorVaryPropertyWholeNumberRange";
import { StrategyByInstruction } from "./types/exerciseTemplates/strategies/subclasses/StrategyByInstruction";

    /**
     *
     */
    export class Igu {

        // props

        private _exercisePool: Exercise[] = []
    

        // getters/setters
    
        /**
         *
         */
        get exercisePool() {
            return this._exercisePool
        }
    
        /**
         *
         */
        set exercisePool(exercises:Exercise[]) {
            this._exercisePool = exercises
        }  
        
        // private functions


        // public functions

        /**
         *
         * @param exercises
         */
        addExercises(exercises:Exercise[]) {
            this.exercisePool.push(...exercises)
        }

        /**
         *
         */
        getRandomDueExercise():Exercise | undefined {
            if (this._exercisePool.length === 0) {
                return undefined;
            }
            const randomIndex = Math.floor(Math.random() * this._exercisePool.length);
            return this._exercisePool[randomIndex];
        }

        // static functions



        
    }