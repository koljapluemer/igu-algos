import Ajv from 'ajv';
import { lessonsSchema } from './types';
import { ExerciseTemplate } from './ExerciseTemplate';
import type { JSONSchemaType } from 'ajv';
import type { Lessons } from './types';

/**
 * Handles lesson data and template dependencies, automatically resolving blockedBy relationships between templates
 */
export class Lesson {
  public id: string;
  public name: string;
  private _templates: ExerciseTemplate[] = [];

  /**
   * Creates a new Lesson instance
   * @param data - The lesson data
   */
  constructor(data: unknown) {
    const ajv = new Ajv({
      strict: false,
      validateSchema: false,
      allErrors: true
    });
    const validate = ajv.compile(lessonsSchema as unknown as JSONSchemaType<Lessons>);
    
    if (!validate([data])) {
      throw new Error(`Invalid lesson data: ${JSON.stringify(validate.errors)}`);
    }

    const lesson = data as { id: string; name: string; templates: unknown[] };
    this.id = lesson.id;
    this.name = lesson.name;
    this._templates = lesson.templates.map(template => new ExerciseTemplate(template));
    this._resolveTemplateDependencies();
  }

  /**
   * Returns all templates in this lesson, with their dependencies already resolved
   */
  public get templates(): ExerciseTemplate[] {
    return this._templates;
  }

  /**
   * Resolves all template dependencies by linking blockedBy IDs to actual template instances
   */
  private _resolveTemplateDependencies(): void {
    this._templates.forEach(template => {
      template.setBlockedByTemplates(this._templates);
    });
  }

  /**
   * Serializes the lesson back to its JSON representation, preserving the original structure
   */
  public toJSON(): unknown {
    return {
      id: this.id,
      name: this.name,
      templates: this._templates.map(template => template.toJSON())
    };
  }

  /**
   * Creates a Lesson instance from JSON data, validating against the schema and throwing on invalid data
   */
  public static fromJSON(json: unknown): Lesson {
    const ajv = new Ajv({
      strict: false,
      validateSchema: false,
      allErrors: true
    });
    const validate = ajv.compile(lessonsSchema as unknown as JSONSchemaType<Lessons>);
    
    if (!validate(json)) {
      throw new Error(`Invalid lesson data: ${JSON.stringify(validate.errors)}`);
    }

    const lessons = json as Lessons;
    if (lessons.length === 0) {
      throw new Error('No lessons found in data');
    }

    return new Lesson(lessons[0]);
  }

  /**
   * Creates multiple Lesson instances from JSON data, validating against the schema and throwing on invalid data
   */
  public static fromJSONArray(json: unknown): Lesson[] {
    const ajv = new Ajv({
      strict: false,
      validateSchema: false,
      allErrors: true
    });
    const validate = ajv.compile(lessonsSchema as unknown as JSONSchemaType<Lessons>);
    
    if (!validate(json)) {
      throw new Error(`Invalid lessons data: ${JSON.stringify(validate.errors)}`);
    }

    const lessons = json as Lessons;
    return lessons.map(lessonData => new Lesson(lessonData));
  }
}
