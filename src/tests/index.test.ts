import { describe, it, expect } from 'vitest'
import { Igu, LearningGoalData, ExerciseData, LearningEventFSRS } from '../index'
import { createEmptyCard } from 'ts-fsrs'

describe('Index exports', () => {
    it('should allow importing and using Igu with its required types', () => {
        const igu = new Igu()
        
        const learningGoalsData: LearningGoalData[] = [
            { id: 'lg1', name: 'Test Goal' }
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
        
        const event: LearningEventFSRS = {
            timestamp: new Date(),
            fsrsRating: 2 // Rating.Good
        }
        const result = igu.recordLearningEvent('ex1', event)
        expect(result).toBeDefined()
    })
}) 