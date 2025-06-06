import { Exercise } from "../exercises/Exercise";

export interface LearningAlgo {
    init?():void;
    initExercisePool?(exercises:Exercise[]):void;
    isExerciseDue(exercise:Exercise): boolean;
}