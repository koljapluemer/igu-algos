import { ExerciseTemplate } from './ExerciseTemplate';
import basicLessonData from './exampleData/basicLessonData.json';

describe('ExerciseTemplate', () => {
  describe('generateExercises', () => {
    it('should generate a single exercise for SINGLE generator', () => {
      const template = new ExerciseTemplate(basicLessonData.templates[0]);
      const exercises = template.generateExercises();

      expect(exercises).toHaveLength(1);
      expect(exercises[0]).toEqual({
        instruction: '$task_pre Barbados $task_post',
        data: {
          zoom: 100
        }
      });
    });

    it('should generate multiple exercises for VARY_PROPERTY_WHOLE_NUMBER_RANGE generator', () => {
      const template = new ExerciseTemplate(basicLessonData.templates[1]);
      const exercises = template.generateExercises();

      // Should generate 9 exercises (0 to 8 inclusive)
      expect(exercises).toHaveLength(9);

      // Check first exercise
      expect(exercises[0]).toEqual({
        instruction: '$task_pre Barbados $task_post',
        data: {
          zoom: 102,
          panField: 0
        }
      });

      // Check last exercise
      expect(exercises[8]).toEqual({
        instruction: '$task_pre Barbados $task_post',
        data: {
          zoom: 102,
          panField: 8
        }
      });

      // Check middle exercise
      expect(exercises[4]).toEqual({
        instruction: '$task_pre Barbados $task_post',
        data: {
          zoom: 102,
          panField: 4
        }
      });
    });

    it('should throw error for VARY_PROPERTY_WHOLE_NUMBER_RANGE with missing data', () => {
      const invalidTemplate = {
        ...basicLessonData.templates[1],
        generator: {
          name: 'VARY_PROPERTY_WHOLE_NUMBER_RANGE',
          data: {
            // Missing required properties
          }
        }
      };

      const template = new ExerciseTemplate(invalidTemplate);
      expect(() => template.generateExercises()).toThrow(
        'VARY_PROPERTY_WHOLE_NUMBER_RANGE generator requires propertyToVary, lowestVariationNumber, and highestVariationNumber in its data'
      );
    });
  });
}); 