import { Exercise } from "../../../exercises/Exercise";
import { Generator } from "../Generator";
import { Strategy } from "../../strategies/Strategy";

export class GeneratorVaryPropertyWholeNumberRange extends Generator {
  public readonly propertyToVary: string;
  public readonly lowestVariationNumber: number;
  public readonly highestVariationNumber: number;

  constructor(generationStrategy: Strategy, propertyToVary: string, lowestVariationNumber: number, highestVariationNumber: number) {
    super(generationStrategy);
    this.propertyToVary = propertyToVary;
    this.lowestVariationNumber = lowestVariationNumber;
    this.highestVariationNumber = highestVariationNumber;
  }

  generateExercices(): Exercise[] {
    // do a bunch of times:
    const exercise = this.generationStrategy.generateExercise();
    return [];
  }
}
