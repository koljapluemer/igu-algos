import { Exercise } from "../../exercises/Exercise";
import { LearningAlgo } from "../LearningAlgo";

/**
 *
 */
export class IguRng implements LearningAlgo {
    /**
     *
     * @param exercise
     */
    isExerciseDue(exercise: Exercise): boolean {
        return true
    }
}