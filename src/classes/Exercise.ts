import { ExerciseLearningData } from "../types/ExerciseLearningData"
import { LearningGoal } from "./LearningGoal"

export class Exercise {
    _id: string
    _learningGoals: LearningGoal[]
    _blockedBy: Exercise[]
    _learningData: ExerciseLearningData | undefined

    public static makeFromExerciseData () {}
}