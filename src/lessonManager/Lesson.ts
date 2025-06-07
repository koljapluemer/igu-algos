import { ExerciseTemplate } from "../exerciseTemplates/ExerciseTemplate";
import { GeneratorVaryPropertyWholeNumberRange } from "../exerciseTemplates/generators/subclasses/GeneratorVaryPropertyWholeNumberRange";
import { Exercise } from "../exerciseTemplates/strategies/Exercise";

/**
 * Represents a lesson containing exercise templates and associated metadata.
 */
export class Lesson {
    public readonly id: string;
    public readonly name: string;
    public readonly templates: { [key: string]: ExerciseTemplate };
    public readonly data?: { [key: string]: unknown };

    /**
     * Creates a new lesson with the specified configuration.
     * @param id - Unique identifier for the lesson
     * @param name - Display name of the lesson
     * @param templates - Object mapping template IDs to their templates
     * @param data - Optional metadata for the lesson
     */
    constructor(
        id: string,
        name: string,
        templates: { [key: string]: ExerciseTemplate },
        data?: { [key: string]: unknown }
    ) {
        this.id = id;
        this.name = name;
        this.templates = templates;
        this.data = data;
    }

    /**
     * Generates exercises from all templates in this lesson.
     */
    public generateExercises(): Exercise[] {
        const exercises: Exercise[] = [];
        
        // Generate exercises from each template
        Object.values(this.templates).forEach(template => {
            const templateExercises = template.generateExercises();
            exercises.push(...templateExercises);
        });

        return exercises;
    }

    /**
     * Converts the lesson to a data structure suitable for storage.
     */
    public toData(): {
        id: string;
        name: string;
        templates: { [key: string]: {
            id: string;
            belongsTo: string;
            templateType: {
                method: string;
                generator: {
                    name: string;
                    data?: {
                        propertyToVary?: string;
                        lowestVariationNumber?: number;
                        highestVariationNumber?: number;
                    };
                };
            };
            data?: { [key: string]: unknown };
        }};
        data?: { [key: string]: unknown };
    } {
        const templateMap: { [key: string]: {
            id: string;
            belongsTo: string;
            templateType: {
                method: string;
                generator: {
                    name: string;
                    data?: {
                        propertyToVary?: string;
                        lowestVariationNumber?: number;
                        highestVariationNumber?: number;
                    };
                };
            };
            data?: { [key: string]: unknown };
        }} = {};
        
        Object.values(this.templates).forEach(template => {
            const generatorData = template.generator instanceof GeneratorVaryPropertyWholeNumberRange ? {
                propertyToVary: template.generator.propertyToVary,
                lowestVariationNumber: template.generator.lowestVariationNumber,
                highestVariationNumber: template.generator.highestVariationNumber
            } : undefined;

            templateMap[template.id] = {
                id: template.id,
                belongsTo: template.belongsTo.id,
                templateType: {
                    method: template.generator.generationStrategy.getStrategyName(),
                    generator: {
                        name: template.generator.getGeneratorName(),
                        data: generatorData
                    }
                },
                data: template.data
            };
        });

        return {
            id: this.id,
            name: this.name,
            templates: templateMap,
            data: this.data
        };
    }
}
