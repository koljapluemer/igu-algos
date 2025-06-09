import { Rating } from "ts-fsrs";

export interface LearningEvent {
    timestamp: Date
}

export interface LearningEventFSRS extends LearningEvent {
    fsrsRating: Rating
}