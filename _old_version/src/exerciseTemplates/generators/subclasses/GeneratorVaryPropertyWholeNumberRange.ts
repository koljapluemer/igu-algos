import { Exercise } from "../../strategies/Exercise";
import { Generator } from "../Generator";
import { Strategy } from "../../strategies/Strategy";

/**
 * Generator that creates exercises by varying a specific property within a whole number range.
 */
export class GeneratorVaryPropertyWholeNumberRange extends Generator {
  public readonly propertyToVary: string;
  public readonly lowestVariationNumber: number;
  public readonly highestVariationNumber: number;

  /** Creates a generator that varies a numeric property across a range of values */
  constructor(generationStrategy: Strategy, propertyToVary: string, lowestVariationNumber: number, highestVariationNumber: number) {
    super(generationStrategy);
    this.propertyToVary = propertyToVary;
    this.lowestVariationNumber = lowestVariationNumber;
    this.highestVariationNumber = highestVariationNumber;
  }

  /** Generates exercises with the specified property varying across the defined range */
  generateExercices(): Exercise[] {
    const exercises: Exercise[] = [];
    
    for (let value = this.lowestVariationNumber; value <= this.highestVariationNumber; value++) {
      // Create a new data object for each exercise with the varied property
      const exerciseData = { [this.propertyToVary]: value };
      const exercise = this.generationStrategy.generateExercise(exerciseData);
      exercises.push(exercise);
    }

    return exercises;
  }

  /** Returns the identifier for this generator type */
  getGeneratorName(): string {
    return "VARY_PROPERTY_WHOLE_NUMBER_RANGE";
  }
}
