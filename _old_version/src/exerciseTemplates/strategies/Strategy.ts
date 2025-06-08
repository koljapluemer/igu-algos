import { Exercise } from "./Exercise";

export interface Strategy {
  generateExercise(data?: { [key: string]: unknown }): Exercise;
  getStrategyName(): string;
}
