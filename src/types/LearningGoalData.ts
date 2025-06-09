export interface LearningGoalData {
    id: string
    name: string
    parents?: string[] // an array of ids of other LearninGoalData/LearningGoals 
}