import { Exercise } from "../../exercises/Exercise";
import { Strategy } from "../strategies/Strategy";

export abstract class Generator {
    public readonly generationStrategy: Strategy

    public abstract generateExercices():Exercise[]
} 