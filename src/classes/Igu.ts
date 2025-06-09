import { Exercise } from "igu-algos";
import { LearningGoal } from "./LearningGoal";

/**
 * The "meta object" of the library, essentially a mediator
 * holds LearningGoals, holds Exercises.
 * Matches them against each other, decides what to learn next
 */
export class Igu {
    private _learningGoals: LearningGoal[]
    private _exercises: Exercise[]

    private _lastSelectedLearningGoal: LearningGoal | undefined
    private _lastSelectedExercise: Exercise | undefined

    constructor () {}

    public getExercises() {}

    public setExercises() {}

    public addExercise() {}

    public getLearningGoals() {}

    public setLearningGoals() {}

    public addLearningGoal() {}

    public getLearningGoalByID() {}

    public getExerciseByID() {}

    public getChildrenExercisesForLearningGoalID() {}

    public getRandomLearningGoal() {}

    public getRandomExercise() {}

    public getRandomExerciseFromLearningGoalID()
}