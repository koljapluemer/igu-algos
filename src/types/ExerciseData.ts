import { ExerciseLearningData } from "./ExerciseLearningData"

export interface ExerciseData {
    id: string
    learningGoals: string[] // an array of LearningGoal/LearningGoalData ids
    blockedBy?: string[] // an array of other ExerciseData/Exercise's ids
    learningData?: ExerciseLearningData
}