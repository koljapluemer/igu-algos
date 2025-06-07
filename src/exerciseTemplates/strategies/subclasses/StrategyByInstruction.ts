// TODO: kind of badly named

import { Exercise } from "../Exercise";
import { Strategy } from "../Strategy";

/**
 * Strategy that generates exercises based on predefined instructions.
 */
export class StrategyByInstruction implements Strategy {
    /**
     * Generates a new exercise based on the strategy's instructions.
     */
    generateExercise(data?: { [key: string]: unknown; }): Exercise {
        console.log("Generating exercise with data:", data);
        // TODO: Implement actual exercise generation using _data
        return new Exercise();
    }

    /**
     * Returns the name identifier for this strategy.
     */
    getStrategyName(): string {
        return "BY_INSTRUCTION";
    }
}