import { ExerciseTemplate as IExerciseTemplate, ExerciseType, Generator } from './types';

/**
 * Manages exercise templates and their dependencies, resolving blockedBy relationships into actual template references
 */
export class ExerciseTemplate implements IExerciseTemplate {
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
  constructor(data: IExerciseTemplate) {
    this.id = data.id;
    this.instruction = data.instruction;
    this.exerciseType = data.exerciseType;
    this.generator = data.generator;
    this.data = data.data;
    this._blockedBy = data.blockedBy;
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
  public toJSON(): IExerciseTemplate {
    return {
      id: this.id,
      instruction: this.instruction,
      exerciseType: this.exerciseType,
      generator: this.generator,
      data: this.data,
      blockedBy: this._blockedBy
    };
  }
}
