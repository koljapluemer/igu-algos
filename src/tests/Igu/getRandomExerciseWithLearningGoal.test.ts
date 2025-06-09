import { describe, it, expect } from 'vitest'
import { Igu } from '../../classes/Igu'
import { LearningGoalData } from '../../types/LearningGoalData'
import { ExerciseData } from '../../types/ExerciseData'
import { createEmptyCard } from 'ts-fsrs'

describe('Igu > getRandomExerciseWithLearningGoal', () => {
    it('should return undefined when no exercises exist', () => {
        // Arrange
        const igu = new Igu()

        // Act
        const result = igu.getRandomExerciseWithLearningGoal()

        // Assert
        expect(result).toBeUndefined()
    })

    it('should return undefined when exercise has no learning goals', () => {
        // Arrange
        const igu = new Igu()
        const emptyCard = createEmptyCard()
        const exercisesData: ExerciseData[] = [
            { 
                id: 'ex1', 
                learningGoals: [],
                learningData: {
                    ...emptyCard,
                    isBlacklisted: false
                }
            }
        ]
        igu.addData([], exercisesData)

        // Act
        const result = igu.getRandomExerciseWithLearningGoal()

        // Assert
        expect(result).toBeUndefined()
    })

    it('should return exercise and one of its learning goals', () => {
        // Arrange
        const igu = new Igu()
        const learningGoalsData: LearningGoalData[] = [
            { id: 'lg1', name: 'Learning Goal 1' },
            { id: 'lg2', name: 'Learning Goal 2' }
        ]
        const emptyCard = createEmptyCard()
        const exercisesData: ExerciseData[] = [
            { 
                id: 'ex1', 
                learningGoals: ['lg1', 'lg2'],
                learningData: {
                    ...emptyCard,
                    isBlacklisted: false
                }
            }
        ]
        igu.addData(learningGoalsData, exercisesData)

        // Act
        const result = igu.getRandomExerciseWithLearningGoal()

        // Assert
        expect(result).toBeDefined()
        expect(result?.exercise._id).toBe('ex1')
        expect(result?.learningGoal).toBeDefined()
        expect(['lg1', 'lg2']).toContain(result?.learningGoal.id)
    })

    it('should not return the same exercise twice in a row', () => {
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
            },
            { 
                id: 'ex2', 
                learningGoals: ['lg1'],
                learningData: {
                    ...emptyCard,
                    isBlacklisted: false
                }
            }
        ]
        igu.addData(learningGoalsData, exercisesData)

        // Act
        const first = igu.getRandomExerciseWithLearningGoal()
        const second = igu.getRandomExerciseWithLearningGoal()

        // Assert
        expect(first).toBeDefined()
        expect(second).toBeDefined()
        expect(second?.exercise._id).not.toBe(first?.exercise._id)
    })
}) 