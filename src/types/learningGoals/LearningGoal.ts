export class LearningGoal {
  public readonly id: string;
  public readonly name: string;
  public readonly isLesson: boolean;
  private _associatedLearningGoals?: LearningGoal[];
  private _blockedBy?: LearningGoal[];
  public readonly data?: { [key: string]: unknown };

  constructor(
    id: string,
    name: string,
    isLesson: boolean,
    data?: { [key: string]: unknown }
  ) {
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

  public static makeLearningGoalsFromDataDict(dataDict: {
    [key: string]: unknown;
  }): LearningGoal[] {
    const goals: LearningGoal[] = [];
    const goalMap = new Map<string, LearningGoal>();

    // First pass: Create all learning goals
    for (const [id, data] of Object.entries(dataDict)) {
      try {
        const goal = new LearningGoal(id, data.name, data.isLesson, data.data);

        goals.push(goal);
        goalMap.set(id, goal);
      } catch (error) {
        console.warn(`Failed to create learning goal ${id}:`, error);
      }
    }

    // Second pass: Establish relationships
    for (const [id, data] of Object.entries(dataDict)) {
      const goal = goalMap.get(id);
      if (!goal) continue;

      // Handle associated learning goals
      if (data.associatedLearningGoals) {
        const associatedGoals = data.associatedLearningGoals
          .map((associatedId: string) => goalMap.get(associatedId))
          .filter(
            (g: LearningGoal | undefined) => g !== undefined
          ) as LearningGoal[];
        goal.setAssociatedLearningGoals(associatedGoals);
      }

      // Handle blocked by relationships
      if (data.blockedBy) {
        const blockedByGoals = data.blockedBy
          .map((blockedId: string) => goalMap.get(blockedId))
          .filter(
            (g: LearningGoal | undefined) => g !== undefined
          ) as LearningGoal[];
        goal.setBlockedBy(blockedByGoals);
      }
    }

    return goals;
  }
}
