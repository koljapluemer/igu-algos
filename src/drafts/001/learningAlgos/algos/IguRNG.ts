import { Exercise } from "../../exercises/Exercise";
import { LearningAlgo } from "../LearningAlgo";

export class IguRng implements LearningAlgo {
    isExerciseDue(exercise: Exercise): boolean {
        return true
    }
}