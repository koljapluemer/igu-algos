import { Exercise } from "../../exercises/Exercise";
import { LearningAlgo } from "../LearningAlgo";


/**
 *
 */
export class IguSM2 implements LearningAlgo {
    /**
     *
     * @param exercise
     */
    isExerciseDue(exercise: Exercise): boolean {
        return true
    }
}