import { describe, it, expect } from 'vitest'
import { Igu } from '../../classes/Igu'
import { LearningGoalData } from '../../types/LearningGoalData'
import { ExerciseData } from '../../types/ExerciseData'
import { Rating, createEmptyCard } from 'ts-fsrs'

describe('Igu > README Example', () => {
    it('should work as shown in the README', () => {
        // Step 1: Initialize and Add Data
        const igu = new Igu()

        const learningGoalsData: LearningGoalData[] = [
            { id: 'lg1', name: 'Basic Math' },
            { id: 'lg2', name: 'Advanced Math' }
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
                learningGoals: ['lg1', 'lg2'],
                learningData: {
                    ...emptyCard,
                    isBlacklisted: false
                }
            }
        ]

        igu.addData(learningGoalsData, exercisesData)

        // Step 2: Get Learning Content
        // Test getRandomLearningGoal
        const learningGoal = igu.getRandomLearningGoal()
        expect(learningGoal).toBeDefined()
        expect(['lg1', 'lg2']).toContain(learningGoal?.id)

        // Test getRandomExerciseWithLearningGoal
        const result = igu.getRandomExerciseWithLearningGoal()
        expect(result).toBeDefined()
        expect(result?.exercise).toBeDefined()
        expect(result?.learningGoal).toBeDefined()
        expect(['ex1', 'ex2']).toContain(result?.exercise._id)
        expect(['lg1', 'lg2']).toContain(result?.learningGoal.id)

        // Test getChildrenExercisesForLearningGoalID
        const exercises = igu.getChildrenExercisesForLearningGoalID('lg1')
        expect(exercises).toHaveLength(2)
        expect(exercises[0]._id).toBe('ex1')
        expect(exercises[1]._id).toBe('ex2')

        // Test getRandomExerciseFromLearningGoalID
        const exercise = igu.getRandomExerciseFromLearningGoalID('lg1')
        expect(exercise).toBeDefined()
        expect(['ex1', 'ex2']).toContain(exercise?._id)

        // Step 3: Record Learning Progress
        const updatedExercise = igu.recordLearningEvent('ex1', Rating.Good)
        expect(updatedExercise).toBeDefined()
        expect(updatedExercise?._id).toBe('ex1')
        expect(updatedExercise?._learningData).toBeDefined()
        expect(updatedExercise?._learningData?.reps).toBe(1)
        expect(updatedExercise?._learningData?.last_review).toBeDefined()
        expect(updatedExercise?._learningData?.due).toBeDefined()
        expect(updatedExercise?._learningData?.due!.getTime()).toBeGreaterThan(new Date().getTime())
    })
}) 