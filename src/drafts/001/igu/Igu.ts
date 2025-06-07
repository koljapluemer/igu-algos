import { Exercise } from "../exercises/Exercise";
import { IguFSRS } from "../learningAlgos/algos/IguFSRS";
import { LearningAlgo } from "../learningAlgos/LearningAlgo";

/**
 *
 */
export class Igu {
    private _exercisePool: Exercise[]
    private _defaultLearningAlgo: LearningAlgo    

    /**
     *
     * @param exercises
     * @param learningAlgo
     */
    constructor(exercises:Exercise[], learningAlgo:LearningAlgo = new IguFSRS()) {
        this._exercisePool = exercises;
        this._defaultLearningAlgo = learningAlgo
    }

    /**
     *
     * @param exercises
     */
    addExercises(exercises:Exercise[]) {
        this.exercisePool.push(...exercises)
    }

    /**
     *
     */
    get exercisePool() {
        return this._exercisePool
    }

    /**
     *
     */
    set exercisePool(exercises:Exercise[]) {
        this._exercisePool = exercises
    }

    /**
     *
     */
    set defaultLearningAlgo(learningAlgo:LearningAlgo) {
        this._defaultLearningAlgo = learningAlgo
    }

    /**
     *
     */
    get defaultLearningAlgo() {
        return this._defaultLearningAlgo
    }
    
    
}