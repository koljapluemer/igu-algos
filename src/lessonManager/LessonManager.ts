import { LearningGoal } from "../learningGoals/LearningGoal";
import { ExerciseTemplate } from "../exerciseTemplates/ExerciseTemplate";
import { GeneratorVaryPropertyWholeNumberRange } from "../exerciseTemplates/generators/subclasses/GeneratorVaryPropertyWholeNumberRange";

/**
 * Represents the data structure for a lesson, including its templates and metadata.
 */
interface LessonData {
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
}

/**
 * Converts learning goals and their associated templates into a structured lesson format,
 * maintaining the relationships between goals and their exercise templates.
 */
export class LessonManager {
    /**
     * Transforms learning goals marked as lessons into a structured format with their associated templates.
     */
    public static generateLessons(
        learningGoals: LearningGoal[],
        exerciseTemplates: ExerciseTemplate[]
    ): LessonData[] {
        const lessons: LessonData[] = [];

        // Filter only learning goals that are lessons
        const lessonGoals = learningGoals.filter(goal => goal.isLesson);

        // Create a map of templates by their belonging goal ID for quick lookup
        const templatesByGoalId = new Map<string, ExerciseTemplate[]>();
        exerciseTemplates.forEach(template => {
            const goalId = template.belongsTo.id;
            if (!templatesByGoalId.has(goalId)) {
                templatesByGoalId.set(goalId, []);
            }
            templatesByGoalId.get(goalId)?.push(template);
        });

        // Generate lesson data for each lesson goal
        lessonGoals.forEach(goal => {
            const templateMap: LessonData['templates'] = {};
            
            // Get templates for the main goal
            const mainTemplates = templatesByGoalId.get(goal.id) || [];
            mainTemplates.forEach(template => {
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

            // Get templates for associated goals
            if (goal.associatedLearningGoals) {
                goal.associatedLearningGoals.forEach(associatedGoal => {
                    // Look up templates by the associated goal's ID
                    const associatedTemplates = templatesByGoalId.get(associatedGoal.id) || [];
                    associatedTemplates.forEach(template => {
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
                });
            }

            const lessonData: LessonData = {
                id: goal.id,
                name: goal.name,
                templates: templateMap,
                data: goal.data
            };

            lessons.push(lessonData);
        });

        return lessons;
    }
}
