import { Exercise } from "../strategies/Exercise";
import { Strategy } from "../strategies/Strategy";

/**
 *
 */
export abstract class Generator {
    public readonly generationStrategy: Strategy;

    /**
     *
     * @param generationStrategy
     */
    constructor(generationStrategy: Strategy) {
        this.generationStrategy = generationStrategy;
    }

    public abstract generateExercices(): Exercise[];

    public abstract getGeneratorName(): string;
} 