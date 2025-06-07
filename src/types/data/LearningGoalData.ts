export interface LearningGoalData {
  id: string;
  name: string;
  isLesson: boolean;
  associatedLearningGoals?: string[];
  blockedBy?: string[];
  data?: { [key: string]: unknown };
}

