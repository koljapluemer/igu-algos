import { Exercise } from "../../exercises/Exercise";

export interface Strategy {
  generateExercise(data?: { [key: string]: any }): Exercise;
}
