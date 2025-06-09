// TODO: kind of badly named

import { Exercise } from "../Exercise";
import { Strategy } from "../Strategy";

/**
 * Strategy that generates exercises based on predefined instructions.
 */
export class StrategyByInstruction implements Strategy {
    private readonly instruction: string;

    /**
     * Creates a new strategy with the specified instruction.
     * @param instruction - The instruction to use for generated exercises
     */
    constructor(instruction: string) {
        this.instruction = instruction;
    }

    /**
     * Generates a new exercise based on the strategy's instructions.
     * @param data - Optional data to be passed through to the exercise
     */
    generateExercise(data?: { [key: string]: unknown; }): Exercise {
        return {
            instruction: this.instruction,
            data: data || {}
        };
    }

    /**
     * Returns the name identifier for this strategy.
     */
    getStrategyName(): string {
        return "BY_INSTRUCTION";
    }
}