import { describe, it, expect } from 'vitest'
import { Igu } from '../classes/Igu'
import { LearningGoalData } from '../types/LearningGoalData'
import { ExerciseData } from '../types/ExerciseData'
import { Rating, createEmptyCard } from 'ts-fsrs'

describe('Igu', () => {
    describe('addData', () => {
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

    describe('recordLearningEvent', () => {
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
            const updatedExercise = igu.recordLearningEvent('ex1', Rating.Good)

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
            const result = igu.recordLearningEvent('non-existent', Rating.Good)

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
            const updatedExercise = igu.recordLearningEvent('ex1', Rating.Good)

            // Assert
            expect(updatedExercise).toBeDefined()
            expect(updatedExercise?._learningData).toBeDefined()
            expect(updatedExercise?._learningData?.reps).toBe(1)
            expect(updatedExercise?._learningData?.last_review).toBeDefined()
            expect(updatedExercise?._learningData?.due).toBeDefined()
        })
    })

    describe('random selection', () => {
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
            igu.addData([], exercisesData)

            // Act & Assert
            const first = igu.getRandomExercise()
            expect(first).toBeDefined()
            
            const second = igu.getRandomExercise()
            expect(second).toBeDefined()
            expect(second?._id).not.toBe(first?._id)

            const third = igu.getRandomExercise()
            expect(third).toBeDefined()
            expect(third?._id).not.toBe(second?._id)
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

            const firstEx = igu.getRandomExercise()
            expect(firstEx).toBeDefined()
            
            const secondEx = igu.getRandomExercise()
            expect(secondEx).toBeDefined()
            expect(secondEx?._id).toBe(firstEx?._id)
        })
    })
}) 