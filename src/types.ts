import type { ExerciseType as GeneratedExerciseType, Generator as GeneratedGenerator } from './generated-types';
import schemaJson from 'igu-schemas/schema.json';

export type ExerciseTypeName = GeneratedExerciseType['name'];
export type GeneratorName = GeneratedGenerator['name'];

export interface ExerciseType {
  name: ExerciseTypeName;
  data?: Record<string, unknown>;
}

export interface Generator {
  name: GeneratorName;
  data?: Record<string, unknown>;
}

export interface ExerciseTemplate {
  id: string;
  instruction: string;
  exerciseType: ExerciseType;
  generator: Generator;
  data?: Record<string, unknown>;
  blockedBy?: string[];
}

export interface Lesson {
  id: string;
  name: string;
  templates: ExerciseTemplate[];
}

export type Lessons = Lesson[];

// Import schema from igu-schemas for runtime validation
export const lessonsSchema = schemaJson as unknown;
