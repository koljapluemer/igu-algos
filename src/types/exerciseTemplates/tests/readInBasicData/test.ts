import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { ExerciseTemplate } from '../../ExerciseTemplate';

const __dirname = dirname(fileURLToPath(import.meta.url));

describe('ExerciseTemplate Factory based on small file', () => {

    const exerciseTemplatesData = JSON.parse(
        readFileSync(join(__dirname, 'exampleData/exerciseTemplatesShort.json'), 'utf-8')
    );

    it('should create exercise templates with proper generators', () => {
        const exerciseTemplates = ExerciseTemplate.makeExerciseTemplatesFromDataDict(exerciseTemplatesData);
        
        expect(exerciseTemplates).toHaveLength(4);
        
        const barbados2 = exerciseTemplates.find(t => t.id === 'barbados-2');
        expect(barbados2?.generator.constructor.name).toBe('GeneratorVaryPropertyWholeNumberRange');
        
        const barbados1 = exerciseTemplates.find(t => t.id === 'barbados-1');
        expect(barbados1?.generator.constructor.name).toBe('GeneratorSingle');
    });
}); 