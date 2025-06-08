import { describe, it, expect } from 'vitest';
import { Lesson } from './Lesson';
import basicLessonData from './exampleData/basicLessonData.json';

describe('Lesson', () => {
  it('loads basic lesson data correctly', () => {
    const lesson = Lesson.fromJSON([basicLessonData]);
    
    expect(lesson.id).toBe('a');
    expect(lesson.name).toBe('Know where Barbados is');
    expect(lesson.templates).toHaveLength(2);
  });

  it('resolves template dependencies correctly', () => {
    const lesson = Lesson.fromJSON([basicLessonData]);
    const [t1, t2] = lesson.templates;

    // t1 has no dependencies
    expect(t1.blockedBy).toBeUndefined();
    expect(t1.blockedByTemplates).toHaveLength(0);

    // t2 depends on t1
    expect(t2.blockedBy).toEqual(['t1']);
    expect(t2.blockedByTemplates).toHaveLength(1);
    expect(t2.blockedByTemplates[0]).toBe(t1);
  });

  it('preserves template data through serialization', () => {
    const lesson = Lesson.fromJSON([basicLessonData]);
    const [t1, t2] = lesson.templates;

    // Check t1 data
    expect(t1.exerciseType.name).toBe('BY_INSTRUCTION');
    expect(t1.generator.name).toBe('SINGLE');
    expect(t1.data).toEqual({ zoom: 100 });

    // Check t2 data
    expect(t2.exerciseType.name).toBe('BY_INSTRUCTION');
    expect(t2.generator.name).toBe('VARY_PROPERTY_WHOLE_NUMBER_RANGE');
    expect(t2.generator.data).toEqual({
      propertyToVary: 'panField',
      lowestVariationNumber: 0,
      highestVariationNumber: 8
    });
    expect(t2.data).toEqual({ zoom: 102 });
  });

  it('roundtrips through JSON correctly', () => {
    const lesson = Lesson.fromJSON([basicLessonData]);
    const json = lesson.toJSON();
    const roundtripped = Lesson.fromJSON([json]);

    expect(roundtripped.id).toBe(lesson.id);
    expect(roundtripped.name).toBe(lesson.name);
    expect(roundtripped.templates).toHaveLength(lesson.templates.length);
  });

  it('validates schema on load', () => {
    const invalidData = {
      id: 'a',
      name: 'Invalid Lesson',
      templates: [
        {
          id: 't1',
          instruction: 'test',
          exerciseType: { name: 'INVALID_TYPE' },
          generator: { name: 'SINGLE' }
        }
      ]
    };

    expect(() => Lesson.fromJSON([invalidData])).toThrow();
  });
}); 