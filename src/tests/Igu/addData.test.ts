import { describe, it, expect } from 'vitest'
import { Igu } from '../../classes/Igu'
import { LearningGoalData } from '../../types/LearningGoalData'
import { ExerciseData } from '../../types/ExerciseData'

describe('Igu > addData', () => {
    it('should correctly convert and store learning goals and exercises', () => {
        // Arrange
        const igu = new Igu()
        const learningGoalsData: LearningGoalData[] = [
            { id: 'lg1', name: 'Learning Goal 1' },
            { id: 'lg2', name: 'Learning Goal 2' }
        ]
        const exercisesData: ExerciseData[] = [
            { 
                id: 'ex1', 
                learningGoals: ['lg1'],
                learningData: {
                    isBlacklisted: false,
                    due: new Date(),
                    stability: 0,
                    difficulty: 0,
                    elapsed_days: 0,
                    scheduled_days: 0,
                    reps: 0,
                    lapses: 0,
                    state: 0,
                    last_review: new Date(),
                    learning_steps: 0
                }
            },
            { 
                id: 'ex2', 
                learningGoals: ['lg1', 'lg2'],
                learningData: {
                    isBlacklisted: false,
                    due: new Date(),
                    stability: 0,
                    difficulty: 0,
                    elapsed_days: 0,
                    scheduled_days: 0,
                    reps: 0,
                    lapses: 0,
                    state: 0,
                    last_review: new Date(),
                    learning_steps: 0
                }
            }
        ]

        // Act
        igu.addData(learningGoalsData, exercisesData)

        // Assert
        const storedLearningGoals = igu.getLearningGoals()
        const storedExercises = igu.getExercises()

        // Check learning goals
        expect(storedLearningGoals).toHaveLength(2)
        expect(storedLearningGoals[0].id).toBe('lg1')
        expect(storedLearningGoals[0].name).toBe('Learning Goal 1')
        expect(storedLearningGoals[1].id).toBe('lg2')
        expect(storedLearningGoals[1].name).toBe('Learning Goal 2')

        // Check exercises
        expect(storedExercises).toHaveLength(2)
        expect(storedExercises[0]._id).toBe('ex1')
        expect(storedExercises[0]._learningGoals).toHaveLength(1)
        expect(storedExercises[0]._learningGoals[0].id).toBe('lg1')
        expect(storedExercises[1]._id).toBe('ex2')
        expect(storedExercises[1]._learningGoals).toHaveLength(2)
        expect(storedExercises[1]._learningGoals[0].id).toBe('lg1')
        expect(storedExercises[1]._learningGoals[1].id).toBe('lg2')
    })
}) 