export class LearningGoal {
  public readonly id: string;
  public readonly name: string;
  public readonly isLesson: boolean;
  public readonly associatedLearningGoals?: LearningGoal[];
  public readonly blockedBy?: LearningGoal[];
  public readonly data?: { [key: string]: any };
}
