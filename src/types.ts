import schemaJson from 'igu-schemas/schema.json';
import type { 
  SchemaData, 
  LessonData, 
  ExerciseTemplateData, 
  ExerciseType, 
  Generator 
} from 'igu-schemas/types';

export type {
  SchemaData,
  LessonData,
  ExerciseTemplateData,
  ExerciseType,
  Generator
};

// Import schema from igu-schemas for runtime validation
export const lessonsSchema = schemaJson;

// Export the schema type for use in classes
export type Lessons = unknown[];
