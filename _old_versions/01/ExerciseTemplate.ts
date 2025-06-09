import Ajv from 'ajv';
import { lessonsSchema } from './types';
import type { JSONSchemaType } from 'ajv';
import type { ExerciseTemplateData, ExerciseType, Generator } from 'igu-schemas/types';
import type { Exercise } from './types';

/**
 * Manages exercise templates and their dependencies, resolving blockedBy relationships into actual template references
 */
export class ExerciseTemplate {
  public id: string;
  public instruction: string;
  public exerciseType: ExerciseType;
  public generator: Generator;
  public data?: Record<string, unknown>;
  private _blockedBy?: string[];
  private _blockedByTemplates: ExerciseTemplate[] = [];

  /**
   * Creates a new ExerciseTemplate instance
   * @param data - The template data
   */
  constructor(data: unknown) {
    const ajv = new Ajv({
      strict: false,
      validateSchema: false,
      allErrors: true
    });
    const validate = ajv.compile(lessonsSchema as unknown as JSONSchemaType<unknown[]>);
    
    // Create a minimal lesson object to validate against the schema
    const lesson = {
      id: 'temp',
      name: 'temp',
      templates: [data]
    };
    
    if (!validate([lesson])) {
      throw new Error(`Invalid template data: ${JSON.stringify(validate.errors)}`);
    }

    const template = data as ExerciseTemplateData;

    this.id = template.id;
    this.instruction = template.instruction;
    this.exerciseType = template.exerciseType;
    this.generator = template.generator;
    this.data = template.data;
    this._blockedBy = template.blockedBy;
  }

  /**
   * Returns the IDs of templates that block this template's execution
   */
  public get blockedBy(): string[] | undefined {
    return this._blockedBy;
  }

  /**
   * Returns the actual template instances that block this template, resolved from their IDs
   */
  public get blockedByTemplates(): ExerciseTemplate[] {
    return this._blockedByTemplates;
  }

  /**
   * Updates the blockedByTemplates by filtering the provided templates against the blockedBy IDs
   */
  public setBlockedByTemplates(templates: ExerciseTemplate[]): void {
    this._blockedByTemplates = templates.filter(template => 
      this._blockedBy?.includes(template.id)
    );
  }

  /**
   * Serializes the template back to its JSON representation, preserving the original structure
   */
  public toJSON(): unknown {
    return {
      id: this.id,
      instruction: this.instruction,
      exerciseType: this.exerciseType,
      generator: this.generator,
      data: this.data,
      blockedBy: this._blockedBy
    };
  }

  /**
   * Generates exercises based on the template's generator configuration
   * @returns Array of generated exercises
   */
  public generateExercises(): Exercise[] {
    if (this.generator.name === 'SINGLE') {
      return [{
        instruction: this.instruction,
        data: this.data
      }];
    }

    if (this.generator.name === 'VARY_PROPERTY_WHOLE_NUMBER_RANGE') {
      const { propertyToVary, lowestVariationNumber, highestVariationNumber } = this.generator.data || {};
      
      if (!propertyToVary || typeof lowestVariationNumber !== 'number' || typeof highestVariationNumber !== 'number') {
        throw new Error('VARY_PROPERTY_WHOLE_NUMBER_RANGE generator requires propertyToVary, lowestVariationNumber, and highestVariationNumber in its data');
      }

      const exercises: Exercise[] = [];
      for (let i = lowestVariationNumber; i <= highestVariationNumber; i++) {
        exercises.push({
          instruction: this.instruction,
          data: {
            ...this.data,
            [propertyToVary as string]: i
          }
        });
      }
      return exercises;
    }

    throw new Error(`Unsupported generator type: ${this.generator.name}`);
  }
}
