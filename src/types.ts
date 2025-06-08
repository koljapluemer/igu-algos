import schemaJson from 'igu-schemas/schema.json';

export type ExerciseTypeName = 'BY_INSTRUCTION';
export type GeneratorName = 'SINGLE' | 'VARY_PROPERTY_WHOLE_NUMBER_RANGE';

export interface ExerciseType {
  name: ExerciseTypeName;
  data?: Record<string, unknown>;
}

export interface Generator {
  name: GeneratorName;
  data?: Record<string, unknown>;
}

// Import schema from igu-schemas for runtime validation
export const lessonsSchema = schemaJson;

// Export the schema type for use in classes
export type Lessons = unknown[];
