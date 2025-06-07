import { Exercise } from "../../exercises/Exercise";
import { Strategy } from "../strategies/Strategy";

export abstract class Generator {
    public readonly generationStrategy: Strategy;

    constructor(generationStrategy: Strategy) {
        this.generationStrategy = generationStrategy;
    }

    public abstract generateExercices(): Exercise[];
} 