import { ExerciseLearningData } from "../types/ExerciseLearningData"
import { LearningGoal } from "./LearningGoal"
import { ExerciseData } from "../types/ExerciseData"

/**
 * Represents a learning exercise that can be blocked by other exercises and has associated learning goals
 */
export class Exercise {
    _id: string
    _learningGoals: LearningGoal[]
    _blockedBy: Exercise[]
    _learningData: ExerciseLearningData | undefined

    /**
     * Creates a new Exercise with the given parameters
     */
    constructor(id: string, learningGoals: LearningGoal[], blockedBy: Exercise[] = [], learningData?: ExerciseLearningData) {
        this._id = id
        this._learningGoals = learningGoals
        this._blockedBy = blockedBy
        this._learningData = learningData
    }

    /**
     * Creates an Exercise instance from raw exercise data
     */
    public static makeFromExerciseData(data: ExerciseData, learningGoals: LearningGoal[]): Exercise {
        const exerciseLearningGoals = learningGoals.filter(goal => data.learningGoals.includes(goal.id))
        return new Exercise(data.id, exerciseLearningGoals, [], data.learningData)
    }
}