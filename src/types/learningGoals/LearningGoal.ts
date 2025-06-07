interface LearningGoalData {
    name: string;
    isLesson: boolean;
    data?: { [key: string]: unknown };
    associatedLearningGoals?: string[];
    blockedBy?: string[];
}

/**
 * Represents a learning goal or lesson that can be associated with exercises and other learning goals.
 */
export class LearningGoal {
  public readonly id: string;
  public readonly name: string;
  public readonly isLesson: boolean;
  private _associatedLearningGoals?: LearningGoal[];
  private _blockedBy?: LearningGoal[];
  public readonly data?: { [key: string]: unknown };

  /**
   * Creates a new learning goal instance.
   */
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

  /**
   * Gets the list of learning goals associated with this goal.
   */
  get associatedLearningGoals(): LearningGoal[] | undefined {
    return this._associatedLearningGoals;
  }

  /**
   * Gets the list of learning goals that block this goal.
   */
  get blockedBy(): LearningGoal[] | undefined {
    return this._blockedBy;
  }

  /**
   * Sets the learning goals associated with this goal.
   */
  setAssociatedLearningGoals(goals: LearningGoal[]) {
    this._associatedLearningGoals = goals;
  }

  /**
   * Sets the learning goals that block this goal.
   */
  setBlockedBy(goals: LearningGoal[]) {
    this._blockedBy = goals;
  }

  /**
   * Creates multiple learning goals from a dictionary of configuration data.
   */
  public static makeLearningGoalsFromDataDict(dataDict: {
    [key: string]: unknown;
  }): LearningGoal[] {
    const goals: LearningGoal[] = [];
    const goalMap = new Map<string, LearningGoal>();

    // First pass: Create all learning goals
    for (const [id, rawData] of Object.entries(dataDict)) {
      try {
        const data = rawData as LearningGoalData;
        const goal = new LearningGoal(id, data.name, data.isLesson, data.data);

        goals.push(goal);
        goalMap.set(id, goal);
      } catch (error) {
        console.warn(`Failed to create learning goal ${id}:`, error);
      }
    }

    // Second pass: Establish relationships
    for (const [id, rawData] of Object.entries(dataDict)) {
      const goal = goalMap.get(id);
      if (!goal) continue;

      const data = rawData as LearningGoalData;

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
