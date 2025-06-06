// TODO: kind of badly named

import { Exercise } from "../../../exercises/Exercise";
import { Strategy } from "../Strategy";

export class StrategyByInstruction implements Strategy {
    generateExercise(data?: { [key: string]: any; }): Exercise {
        return new Exercise()
    }
}