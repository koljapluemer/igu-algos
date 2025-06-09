import { Exercise } from "./exerciseTemplates/strategies/Exercise";

/**
 * Main class for managing exercises and their scheduling.
 */
export class Igu {
    private _exercisePool: Exercise[] = []

    /** Current collection of exercises available for review */
    get exercisePool() {
        return this._exercisePool
    }

    /** Updates the entire collection of available exercises */
    set exercisePool(exercises:Exercise[]) {
        this._exercisePool = exercises
    }  

    /**
     * Adds new exercises to the exercise pool.
     */
    addExercises(exercises:Exercise[]) {
        this.exercisePool.push(...exercises)
    }

    /**
     * Returns a random exercise that is due for review.
     */
    getRandomDueExercise():Exercise | undefined {
        if (this._exercisePool.length === 0) {
            return undefined;
        }
        const randomIndex = Math.floor(Math.random() * this._exercisePool.length);
        return this._exercisePool[randomIndex];
    }
}