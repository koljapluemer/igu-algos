import { LearningGoal } from "../learningGoals/LearningGoal";
import { Generator } from "./generators/Generator";

export class ExerciseTemplate {
    public readonly id: string;
    public readonly belongsTo: LearningGoal;
    public readonly generator: Generator;
    public readonly data?: { [key: string]: any };

    constructor(id: string, belongsTo: LearningGoal, generator: Generator, data?: { [key: string]: any }) {
        this.id = id;
        this.belongsTo = belongsTo;
        this.generator = generator;
        this.data = data;
    }
}