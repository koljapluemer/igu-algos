export class LearningGoal {
  public readonly id: string;
  public readonly name: string;
  public readonly isLesson: boolean;
  private _associatedLearningGoals?: LearningGoal[];
  private _blockedBy?: LearningGoal[];
  public readonly data?: { [key: string]: any };

  constructor(id: string, name: string, isLesson: boolean, data?: { [key: string]: any }) {
    this.id = id;
    this.name = name;
    this.isLesson = isLesson;
    this.data = data;
  }

  get associatedLearningGoals(): LearningGoal[] | undefined {
    return this._associatedLearningGoals;
  }

  get blockedBy(): LearningGoal[] | undefined {
    return this._blockedBy;
  }

  setAssociatedLearningGoals(goals: LearningGoal[]) {
    this._associatedLearningGoals = goals;
  }

  setBlockedBy(goals: LearningGoal[]) {
    this._blockedBy = goals;
  }
}
