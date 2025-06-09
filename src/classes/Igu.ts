import { ExerciseData } from "../types/ExerciseData";
import { LearningGoalData } from "../types/LearningGoalData";
import { Exercise } from "./Exercise";
import { LearningGoal } from "./LearningGoal";
import { FSRS, Rating, createEmptyCard, Card, RecordLog } from "ts-fsrs";

/**
 * The "meta object" of the library, essentially a mediator
 * holds LearningGoals, holds Exercises.
 * Matches them against each other, decides what to learn next
 */
export class Igu {
    private _learningGoals: LearningGoal[]
    private _exercises: Exercise[]
    private _fsrs: FSRS

    private _lastSelectedLearningGoal: LearningGoal | undefined
    private _lastSelectedExercise: Exercise | undefined

    /**
     * Creates a new Igu instance with empty collections
     */
    constructor() {
        this._learningGoals = []
        this._exercises = []
        this._fsrs = new FSRS({})
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
    private setExercises(exercises: Exercise[]): void {
        this._exercises = exercises
    }

    /**
     * Adds a single exercise to the collection
     */
    private addExercise(exercise: Exercise): void {
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
    private setLearningGoals(goals: LearningGoal[]): void {
        this._learningGoals = goals
    }

    /**
     * Adds a single learning goal to the collection
     */
    private addLearningGoal(goal: LearningGoal): void {
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
     * Returns a random learning goal from the collection, avoiding the last selected one
     */
    public getRandomLearningGoal(): LearningGoal | undefined {
        if (this._learningGoals.length === 0) return undefined
        
        // If we have only one learning goal, return it
        if (this._learningGoals.length === 1) {
            this._lastSelectedLearningGoal = this._learningGoals[0]
            return this._learningGoals[0]
        }

        // Filter out the last selected goal if it exists
        const availableGoals = this._learningGoals.filter(
            goal => goal.id !== this._lastSelectedLearningGoal?.id
        )
        
        const selectedGoal = availableGoals[Math.floor(Math.random() * availableGoals.length)]
        this._lastSelectedLearningGoal = selectedGoal
        return selectedGoal
    }

    /**
     * Returns a random exercise from the collection, avoiding the last selected one
     */
    private getRandomExercise(): Exercise | undefined {
        if (this._exercises.length === 0) return undefined

        // If we have only one exercise, return it
        if (this._exercises.length === 1) {
            this._lastSelectedExercise = this._exercises[0]
            return this._exercises[0]
        }

        // Filter out the last selected exercise if it exists
        const availableExercises = this._exercises.filter(
            exercise => exercise._id !== this._lastSelectedExercise?._id
        )
        
        const selectedExercise = availableExercises[Math.floor(Math.random() * availableExercises.length)]
        this._lastSelectedExercise = selectedExercise
        return selectedExercise
    }

    /**
     * Return a random exercise and the learning goal it is associated with
     */
    public getRandomExerciseWithLearningGoal(): { exercise: Exercise, learningGoal: LearningGoal } | undefined {
        const exercise = this.getRandomExercise()
        if (!exercise || exercise._learningGoals.length === 0) return undefined

        // Randomly select one of the exercise's learning goals
        const randomIndex = Math.floor(Math.random() * exercise._learningGoals.length)
        const learningGoal = exercise._learningGoals[randomIndex]

        return { exercise, learningGoal }
    }

    /**
     * Returns a random exercise associated with a specific learning goal, avoiding the last selected one
     */
    public getRandomExerciseFromLearningGoalID(learningGoalId: string): Exercise | undefined {
        const exercises = this.getChildrenExercisesForLearningGoalID(learningGoalId)
        if (exercises.length === 0) return undefined

        // If we have only one exercise, return it
        if (exercises.length === 1) {
            this._lastSelectedExercise = exercises[0]
            return exercises[0]
        }

        // Filter out the last selected exercise if it exists
        const availableExercises = exercises.filter(
            exercise => exercise._id !== this._lastSelectedExercise?._id
        )
        
        const selectedExercise = availableExercises[Math.floor(Math.random() * availableExercises.length)]
        this._lastSelectedExercise = selectedExercise
        return selectedExercise
    }

    /**
     * Records a learning event for an exercise and updates its learning data
     * @param exerciseId - The ID of the exercise to record the event for
     * @param rating - The rating given by the user (Again, Hard, Good, Easy)
     * @returns The updated exercise, or undefined if the exercise wasn't found
     */
    public recordLearningEvent(exerciseId: string, rating: Rating): Exercise | undefined {
        const exercise = this.getExerciseByID(exerciseId)
        if (!exercise || !exercise._learningData) return undefined

        // If this is the first review, initialize with empty card
        if (!exercise._learningData.last_review) {
            const emptyCard = createEmptyCard()
            exercise._learningData = {
                ...emptyCard,
                isBlacklisted: exercise._learningData.isBlacklisted
            }
        }

        // Get the scheduling cards for this rating
        const schedulingCards: RecordLog = this._fsrs.repeat(exercise._learningData as Card, new Date())
        const result = schedulingCards[rating as keyof RecordLog]

        if (!result) return undefined

        // Update the exercise's learning data with the new card state
        exercise._learningData = {
            ...result.card,
            isBlacklisted: exercise._learningData.isBlacklisted
        }

        return exercise
    }
}