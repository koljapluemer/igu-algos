import { Exercise } from "../../../exercises/Exercise";
import { Generator } from "../Generator";

export class GeneratorVaryPropertyWholeNumberRange extends Generator {
  public readonly propertyToVary: string;
  public readonly lowestVariationNumber: number;
  public readonly highestVariationNumber: number;

  generateExercices(): Exercise[] {
    // do a bunch of times:
    const exercise = this.generationStrategy.generateExercise();
    return [];
  }
}
