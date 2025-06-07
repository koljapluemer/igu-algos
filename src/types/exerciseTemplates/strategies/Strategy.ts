import { Exercise } from "./Exercise";

export interface Strategy {
  generateExercise(data?: { [key: string]: any }): Exercise;
  getStrategyName(): string;
}
