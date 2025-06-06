import { LearningGoal } from "../learningGoals/LearningGoal";
import { Generator } from "./generators/Generator";

export abstract class ExerciseTemplate {
    public readonly id: string;
    public readonly belongsTo: LearningGoal;
    public readonly generator: Generator;

    public readonly data?: { [key: string]: any }
}