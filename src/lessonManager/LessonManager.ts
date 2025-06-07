import { LearningGoal } from "../learningGoals/LearningGoal";
import { ExerciseTemplate } from "../exerciseTemplates/ExerciseTemplate";
import { Lesson } from "./Lesson";

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
    ): Lesson[] {
        const lessons: Lesson[] = [];

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
            const templateMap: { [key: string]: ExerciseTemplate } = {};
            
            // Get templates for the main goal
            const mainTemplates = templatesByGoalId.get(goal.id) || [];
            mainTemplates.forEach(template => {
                templateMap[template.id] = template;
            });

            // Get templates for associated goals
            if (goal.associatedLearningGoals) {
                goal.associatedLearningGoals.forEach(associatedGoal => {
                    // Look up templates by the associated goal's ID
                    const associatedTemplates = templatesByGoalId.get(associatedGoal.id) || [];
                    associatedTemplates.forEach(template => {
                        templateMap[template.id] = template;
                    });
                });
            }

            const lesson = new Lesson(
                goal.id,
                goal.name,
                templateMap,
                goal.data
            );

            lessons.push(lesson);
        });

        return lessons;
    }
}
