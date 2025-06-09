import { describe, it, expect } from 'vitest'
import { Igu } from '../../classes/Igu'
import { LearningGoalData } from '../../types/LearningGoalData'
import { ExerciseData } from '../../types/ExerciseData'
import { createEmptyCard } from 'ts-fsrs'

describe('Igu > random selection', () => {
    it('should not select the same learning goal twice in a row', () => {
        // Arrange
        const igu = new Igu()
        const learningGoalsData: LearningGoalData[] = [
            { id: 'lg1', name: 'Learning Goal 1' },
            { id: 'lg2', name: 'Learning Goal 2' },
            { id: 'lg3', name: 'Learning Goal 3' }
        ]
        igu.addData(learningGoalsData, [])

        // Act & Assert
        const first = igu.getRandomLearningGoal()
        expect(first).toBeDefined()
        
        const second = igu.getRandomLearningGoal()
        expect(second).toBeDefined()
        expect(second?.id).not.toBe(first?.id)

        const third = igu.getRandomLearningGoal()
        expect(third).toBeDefined()
        expect(third?.id).not.toBe(second?.id)
    })

    it('should not select the same exercise twice in a row', () => {
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
            },
            { 
                id: 'ex3', 
                learningGoals: ['lg1'],
                learningData: {
                    ...emptyCard,
                    isBlacklisted: false
                }
            }
        ]
        igu.addData(learningGoalsData, exercisesData)

        // Act & Assert
        const first = igu.getRandomExerciseWithLearningGoal()
        expect(first).toBeDefined()
        
        const second = igu.getRandomExerciseWithLearningGoal()
        expect(second).toBeDefined()
        expect(second?.exercise._id).not.toBe(first?.exercise._id)

        const third = igu.getRandomExerciseWithLearningGoal()
        expect(third).toBeDefined()
        expect(third?.exercise._id).not.toBe(second?.exercise._id)
    })

    it('should not select the same exercise twice in a row when getting from learning goal', () => {
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
            },
            { 
                id: 'ex3', 
                learningGoals: ['lg1'],
                learningData: {
                    ...emptyCard,
                    isBlacklisted: false
                }
            }
        ]
        igu.addData(learningGoalsData, exercisesData)

        // Act & Assert
        const first = igu.getRandomExerciseFromLearningGoalID('lg1')
        expect(first).toBeDefined()
        
        const second = igu.getRandomExerciseFromLearningGoalID('lg1')
        expect(second).toBeDefined()
        expect(second?._id).not.toBe(first?._id)

        const third = igu.getRandomExerciseFromLearningGoalID('lg1')
        expect(third).toBeDefined()
        expect(third?._id).not.toBe(second?._id)
    })

    it('should return the same item if it is the only one available', () => {
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

        // Act & Assert
        const first = igu.getRandomLearningGoal()
        expect(first).toBeDefined()
        
        const second = igu.getRandomLearningGoal()
        expect(second).toBeDefined()
        expect(second?.id).toBe(first?.id)

        const firstEx = igu.getRandomExerciseWithLearningGoal()
        expect(firstEx).toBeDefined()
        
        const secondEx = igu.getRandomExerciseWithLearningGoal()
        expect(secondEx).toBeDefined()
        expect(secondEx?.exercise._id).toBe(firstEx?.exercise._id)
    })
}) 