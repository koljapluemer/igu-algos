import { JSONSchemaType } from 'ajv';

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

// Schema for validation
export const lessonsSchema: JSONSchemaType<Lessons> = {
  type: 'array',
  minItems: 1,
  items: {
    type: 'object',
    required: ['id', 'name', 'templates'],
    properties: {
      id: { type: 'string' },
      name: { type: 'string' },
      templates: {
        type: 'array',
        minItems: 1,
        items: {
          type: 'object',
          required: ['id', 'instruction', 'exerciseType', 'generator'],
          properties: {
            id: { type: 'string' },
            instruction: { type: 'string' },
            exerciseType: {
              type: 'object',
              required: ['name'],
              properties: {
                name: { type: 'string', enum: ['BY_INSTRUCTION'] },
                data: { type: 'object', nullable: true }
              }
            },
            generator: {
              type: 'object',
              required: ['name'],
              properties: {
                name: { 
                  type: 'string', 
                  enum: ['SINGLE', 'VARY_PROPERTY_WHOLE_NUMBER_RANGE'] 
                },
                data: { type: 'object', nullable: true }
              }
            },
            data: { type: 'object', nullable: true },
            blockedBy: { 
              type: 'array', 
              items: { type: 'string' },
              nullable: true
            }
          }
        }
      }
    }
  }
};
