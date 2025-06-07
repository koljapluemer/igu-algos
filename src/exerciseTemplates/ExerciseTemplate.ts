import { LearningGoal } from "../learningGoals/LearningGoal";
import { Generator } from "./generators/Generator";
import { GeneratorSingle } from "./generators/subclasses/GeneratorSingle";
import { GeneratorVaryPropertyWholeNumberRange } from "./generators/subclasses/GeneratorVaryPropertyWholeNumberRange";
import { StrategyByInstruction } from "./strategies/subclasses/StrategyByInstruction";

interface TemplateData {
    templateType: {
        generator: {
            name: string;
            data: {
                propertyToVary: string;
                lowestVariationNumber: number;
                highestVariationNumber: number;
            };
        };
    };
    belongsTo: LearningGoal;
    data?: { [key: string]: unknown };
}

/**
 * Represents a template for generating exercises with specific learning goals and generation strategies.
 */
export class ExerciseTemplate {
    public readonly id: string;
    public readonly belongsTo: LearningGoal;
    public readonly generator: Generator;
    public readonly data?: { [key: string]: unknown };

    /**
     * Creates a new exercise template with specified configuration.
     * @param id - Unique identifier for the template
     * @param belongsTo - The learning goal this template contributes to
     * @param generator - The generator responsible for creating exercises from this template
     * @param data - Optional data passed through
     */
    constructor(id: string, belongsTo: LearningGoal, generator: Generator, data?: { [key: string]: unknown }) {
        this.id = id;
        this.belongsTo = belongsTo;
        this.generator = generator;
        this.data = data;
    }

    /**
     * Creates multiple exercise templates from a dictionary of configuration data.
     */
    public static makeExerciseTemplatesFromDataDict(
        dataDict: { [key: string]: unknown },
        learningGoals: Map<string, LearningGoal>
    ): ExerciseTemplate[] {
        const templates: ExerciseTemplate[] = [];
        
        for (const [id, rawData] of Object.entries(dataDict)) {
            try {
                const data = rawData as { templateType: TemplateData['templateType'], belongsTo: string, data?: { [key: string]: unknown } };
                const learningGoal = learningGoals.get(data.belongsTo);
                if (!learningGoal) {
                    console.warn(`Learning goal ${data.belongsTo} not found for template ${id}`);
                    continue;
                }

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
                    learningGoal,
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