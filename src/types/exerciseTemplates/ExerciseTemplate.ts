import { LearningGoal } from "../learningGoals/LearningGoal";
import { Generator } from "./generators/Generator";
import { GeneratorSingle } from "./generators/subclasses/GeneratorSingle";
import { GeneratorVaryPropertyWholeNumberRange } from "./generators/subclasses/GeneratorVaryPropertyWholeNumberRange";
import { StrategyByInstruction } from "./strategies/subclasses/StrategyByInstruction";

/**
 *
 */
export class ExerciseTemplate {
    public readonly id: string;
    public readonly belongsTo: LearningGoal;
    public readonly generator: Generator;
    public readonly data?: { [key: string]: unknown };

    /**
     *
     * @param id
     * @param belongsTo
     * @param generator
     */
    constructor(id: string, belongsTo: LearningGoal, generator: Generator, data?: { [key: string]: unknown }) {
        this.id = id;
        this.belongsTo = belongsTo;
        this.generator = generator;
        this.data = data;
    }

    /**
     *
     */
    public static makeExerciseTemplatesFromDataDict(dataDict: { [key: string]: unknown }): ExerciseTemplate[] {
        const templates: ExerciseTemplate[] = [];
        
        for (const [id, data] of Object.entries(dataDict)) {
            try {
                // Create strategy
                const strategy = new StrategyByInstruction();
                
                // Create generator based on type
                let generator;
                if (data.templateType.generator.name === GeneratorVaryPropertyWholeNumberRange.prototype.getGeneratorName()) {
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
}