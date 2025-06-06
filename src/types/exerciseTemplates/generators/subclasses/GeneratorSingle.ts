import { Exercise } from "../../../exercises/Exercise";
import { Generator } from "../Generator";

export class GeneratorSingle extends Generator {

    generateExercices(): Exercise[] {
        const exercise = this.generationStrategy.generateExercise()

        return [exercise]
    }
}