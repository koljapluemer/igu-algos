import { Exercise } from "../../strategies/Exercise";
import { Generator } from "../Generator";
import { Strategy } from "../../strategies/Strategy";

/**
 * Generator that creates a single exercise using the provided strategy.
 */
export class GeneratorSingle extends Generator {
    /** Creates a generator that will produce exactly one exercise per generation */
    constructor(generationStrategy: Strategy) {
        super(generationStrategy);
    }

    /** Produces a single exercise using the configured strategy */
    generateExercices(): Exercise[] {
        const exercise = this.generationStrategy.generateExercise();
        return [exercise];
    }

    /** Returns the identifier for this generator type */
    getGeneratorName(): string {
        return "SINGLE";
    }
}