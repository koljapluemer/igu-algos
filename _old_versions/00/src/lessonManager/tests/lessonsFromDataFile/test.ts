import { LearningGoal } from "../../../learningGoals/LearningGoal";
import { ExerciseTemplate } from "../../../exerciseTemplates/ExerciseTemplate";
import { LessonManager } from "../../LessonManager";
import * as fs from 'fs';
import * as path from 'path';
import { describe, it, expect } from 'vitest';

/**
 * Verifies that LessonManager correctly processes learning goals and templates into lessons.
 */
describe('LessonManager', () => {
    it('should generate lessons from data files', () => {
        // Read and parse the JSON files
        const learningGoalsPath = path.join(__dirname, 'learningGoalsShort.json');
        const exerciseTemplatesPath = path.join(__dirname, 'exerciseTemplatesShort.json');
        
        const learningGoalsData = JSON.parse(fs.readFileSync(learningGoalsPath, 'utf8'));
        const exerciseTemplatesData = JSON.parse(fs.readFileSync(exerciseTemplatesPath, 'utf8'));

        // Create LearningGoal instances
        const learningGoals = LearningGoal.makeLearningGoalsFromDataDict(learningGoalsData);
        
        // Create a map of learning goals by ID
        const learningGoalsMap = new Map<string, LearningGoal>();
        learningGoals.forEach(goal => learningGoalsMap.set(goal.id, goal));
        
        // Create ExerciseTemplate instances
        const exerciseTemplates = ExerciseTemplate.makeExerciseTemplatesFromDataDict(exerciseTemplatesData, learningGoalsMap);

        // Generate lessons
        const lessons = LessonManager.generateLessons(learningGoals, exerciseTemplates);

        // Basic validation
        expect(lessons).toHaveLength(2);

        // Verify Barbados lesson
        const barbadosLesson = lessons.find(l => l.id === 'barbados-main');
        expect(barbadosLesson).toBeDefined();
        expect(Object.keys(barbadosLesson!.templates)).toHaveLength(3);

        // Verify Pitcairn lesson
        const pitcairnLesson = lessons.find(l => l.id === 'pitcairn-is.-main');
        expect(pitcairnLesson).toBeDefined();
        expect(Object.keys(pitcairnLesson!.templates)).toHaveLength(1);
    });
});
