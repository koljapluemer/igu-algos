import { LearningGoalData } from "../types/LearningGoalData"

/**
 * A goal the learner wants to strive for. 
 * Pretty useless if not for its attached exercises.
 * May be in relations with other LearningGoals
 */
export class LearningGoal {
    public readonly id: string
    public readonly name: string

    private _parents: LearningGoal[] 

    /**
     * Creates a new LearningGoal with the given parameters
     */
    constructor(id: string, name: string, parents: LearningGoal[] = []) {
        this.id = id
        this.name = name
        this._parents = parents
    }

    /**
     * Creates a LearningGoal instance from raw learning goal data
     */
    public static createFromLearningGoalData(data: LearningGoalData): LearningGoal {
        return new LearningGoal(data.id, data.name)
    }
}