import { Exercise } from "../strategies/Exercise";
import { Strategy } from "../strategies/Strategy";

/**
 * Abstract base class for exercise generators that create exercises using specific strategies.
 */
export abstract class Generator {
    public readonly generationStrategy: Strategy;

    /**
     * Creates a new generator with the specified exercise generation strategy.
     * @param generationStrategy - The strategy to use for generating exercises
     */
    constructor(generationStrategy: Strategy) {
        this.generationStrategy = generationStrategy;
    }

    /**
     * Generates a set of exercises based on the generator's configuration and strategy.
     * @returns Array of generated exercises
     */
    public abstract generateExercices(): Exercise[];

    /**
     * Returns the unique identifier for this type of generator.
     */
    public abstract getGeneratorName(): string;
} 