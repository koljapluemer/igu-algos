import { describe, it, expect } from 'vitest'
import { Igu } from '../../classes/Igu'
import { LearningGoalData } from '../../types/LearningGoalData'
import { ExerciseData } from '../../types/ExerciseData'
import { Rating, createEmptyCard } from 'ts-fsrs'
import { LearningEventFSRS } from '../../types/LearningEvent'

describe('Igu > recordLearningEvent', () => {
    it('should update exercise learning data when recording a learning event', () => {
        // Arrange
        const igu = new Igu()
        const learningGoalsData: LearningGoalData[] = [
            { id: 'lg1', name: 'Learning Goal 1' }
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
            }
        ]

        igu.addData(learningGoalsData, exercisesData)

        // Act
        const event: LearningEventFSRS = {
            timestamp: new Date(),
            fsrsRating: Rating.Good
        }
        const updatedExercise = igu.recordLearningEvent('ex1', event)

        // Assert
        expect(updatedExercise).toBeDefined()
        expect(updatedExercise?._id).toBe('ex1')
        expect(updatedExercise?._learningData).toBeDefined()
        expect(updatedExercise?._learningData?.reps).toBe(1) // Should increment reps
        expect(updatedExercise?._learningData?.last_review).toBeDefined()
        expect(updatedExercise?._learningData?.due).toBeDefined()
        expect(updatedExercise?._learningData?.due).toBeInstanceOf(Date)
        expect(updatedExercise?._learningData?.due!.getTime()).toBeGreaterThan(new Date().getTime()) // Due date should be in the future
    })

    it('should return undefined for non-existent exercise', () => {
        // Arrange
        const igu = new Igu()

        // Act
        const event: LearningEventFSRS = {
            timestamp: new Date(),
            fsrsRating: Rating.Good
        }
        const result = igu.recordLearningEvent('non-existent', event)

        // Assert
        expect(result).toBeUndefined()
    })

    it('should initialize learning data for first review', () => {
        // Arrange
        const igu = new Igu()
        const learningGoalsData: LearningGoalData[] = [
            { id: 'lg1', name: 'Learning Goal 1' }
        ]
        const emptyCard = createEmptyCard()
        const exercisesData: ExerciseData[] = [
            { 
                id: 'ex1', 
                learningGoals: ['lg1'],
                learningData: {
                    ...emptyCard,
                    isBlacklisted: false
                }
            }
        ]

        igu.addData(learningGoalsData, exercisesData)

        // Act
        const event: LearningEventFSRS = {
            timestamp: new Date(),
            fsrsRating: Rating.Good
        }
        const updatedExercise = igu.recordLearningEvent('ex1', event)

        // Assert
        expect(updatedExercise).toBeDefined()
        expect(updatedExercise?._learningData).toBeDefined()
        expect(updatedExercise?._learningData?.reps).toBe(1)
        expect(updatedExercise?._learningData?.last_review).toBeDefined()
        expect(updatedExercise?._learningData?.due).toBeDefined()
    })
}) 