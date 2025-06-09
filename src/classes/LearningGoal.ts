/**
 * A goal the learner wants to strive for. 
 * Pretty useless if not for its attached exercises.
 * May be in relations with other LearningGoals
 */
export class LearningGoal {
    public readonly id:string
    public readonly name:string

    private _parents: LearningGoal[] 

    constructor() {
        
    } 

    public static createFromLearningGoalData () {}

}