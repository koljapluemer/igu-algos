// TODO: kind of badly named

import { Exercise } from "../Exercise";
import { Strategy } from "../Strategy";

export class StrategyByInstruction implements Strategy {
    generateExercise(data?: { [key: string]: unknown; }): Exercise {
        return new Exercise()
    }

    getStrategyName(): string {
        return "BY_INSTRUCTION";
    }
}