import { Exercise } from "../../../exercises/Exercise";
import { Generator } from "../Generator";
import { Strategy } from "../../strategies/Strategy";

export class GeneratorSingle extends Generator {
    constructor(generationStrategy: Strategy) {
        super(generationStrategy);
    }

    generateExercices(): Exercise[] {
        const exercise = this.generationStrategy.generateExercise();
        return [exercise];
    }
}