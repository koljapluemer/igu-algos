import { ExerciseData } from "../types/ExerciseData";
import { LearningGoalData } from "../types/LearningGoalData";
import { Exercise } from "./Exercise";
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

    /**
     * Creates a new Igu instance with empty collections
     */
    constructor() {
        this._learningGoals = []
        this._exercises = []
    }

    /**
     * Create a basic instance by passing in all the data
     */
    public addData(learningGoals: LearningGoalData[], exercises: ExerciseData[]): void {
        // First create all learning goals
        const learningGoalInstances = learningGoals.map(data => LearningGoal.createFromLearningGoalData(data))
        this.setLearningGoals(learningGoalInstances)

        // Then create exercises using the learning goal instances
        const exerciseInstances = exercises.map(data => Exercise.makeFromExerciseData(data, learningGoalInstances))
        this.setExercises(exerciseInstances)
    }

    /**
     * Returns all exercises in the collection
     */
    public getExercises(): Exercise[] {
        return this._exercises
    }

    /**
     * Replaces the entire exercise collection
     */
    public setExercises(exercises: Exercise[]): void {
        this._exercises = exercises
    }

    /**
     * Adds a single exercise to the collection
     */
    public addExercise(exercise: Exercise): void {
        this._exercises.push(exercise)
    }

    /**
     * Returns all learning goals in the collection
     */
    public getLearningGoals(): LearningGoal[] {
        return this._learningGoals
    }

    /**
     * Replaces the entire learning goals collection
     */
    public setLearningGoals(goals: LearningGoal[]): void {
        this._learningGoals = goals
    }

    /**
     * Adds a single learning goal to the collection
     */
    public addLearningGoal(goal: LearningGoal): void {
        this._learningGoals.push(goal)
    }

    /**
     * Finds a learning goal by its ID
     */
    public getLearningGoalByID(id: string): LearningGoal | undefined {
        return this._learningGoals.find(goal => goal.id === id)
    }

    /**
     * Finds an exercise by its ID
     */
    public getExerciseByID(id: string): Exercise | undefined {
        return this._exercises.find(exercise => exercise._id === id)
    }

    /**
     * Returns all exercises associated with a specific learning goal
     */
    public getChildrenExercisesForLearningGoalID(learningGoalId: string): Exercise[] {
        return this._exercises.filter(exercise => 
            exercise._learningGoals.some(goal => goal.id === learningGoalId)
        )
    }

    /**
     * Returns a random learning goal from the collection
     */
    public getRandomLearningGoal(): LearningGoal | undefined {
        if (this._learningGoals.length === 0) return undefined
        return this._learningGoals[Math.floor(Math.random() * this._learningGoals.length)]
    }

    /**
     * Returns a random exercise from the collection
     */
    public getRandomExercise(): Exercise | undefined {
        if (this._exercises.length === 0) return undefined
        return this._exercises[Math.floor(Math.random() * this._exercises.length)]
    }

    /**
     * Returns a random exercise associated with a specific learning goal
     */
    public getRandomExerciseFromLearningGoalID(learningGoalId: string): Exercise | undefined {
        const exercises = this.getChildrenExercisesForLearningGoalID(learningGoalId)
        if (exercises.length === 0) return undefined
        return exercises[Math.floor(Math.random() * exercises.length)]
    }
}