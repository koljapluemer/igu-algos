import { Exercise } from "../../exercises/Exercise";
import { LearningAlgo } from "../LearningAlgo";

import { Card, createEmptyCard } from "ts-fsrs";

/**
 *
 */
export class IguFSRS implements LearningAlgo {
    /**
     *
     * @param exercise
     */
    isExerciseDue(exercise: Exercise): boolean {
        return true
    }
}