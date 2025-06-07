import { describe, it, expect } from 'vitest';
import { Igu } from './Igu';
import { GeneratorVaryPropertyWholeNumberRange } from './types/exerciseTemplates/generators/subclasses/GeneratorVaryPropertyWholeNumberRange';
import { GeneratorSingle } from './types/exerciseTemplates/generators/subclasses/GeneratorSingle';
import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

describe('Igu factory functions', () => {
    const learningGoalsData = JSON.parse(
        readFileSync(join(__dirname, 'exampleData/learningGoalsShort.json'), 'utf-8')
    );
    const exerciseTemplatesData = JSON.parse(
        readFileSync(join(__dirname, 'exampleData/exerciseTemplatesShort.json'), 'utf-8')
    );

    it('should create learning goals with proper relationships', () => {
        const learningGoals = Igu.makeLearningGoalsFromDataDict(learningGoalsData);
        
        expect(learningGoals).toHaveLength(6);
        
        const barbadosMain = learningGoals.find(g => g.id === 'barbados-main');
        expect(barbadosMain?.associatedLearningGoals).toHaveLength(3);
        
        const barbados3 = learningGoals.find(g => g.id === 'barbados-3');
        expect(barbados3?.blockedBy).toHaveLength(2);
    });

    it('should create exercise templates with proper generators', () => {
        const exerciseTemplates = Igu.makeExerciseTemplatesFromDataDict(exerciseTemplatesData);
        
        expect(exerciseTemplates).toHaveLength(4);
        
        const barbados2 = exerciseTemplates.find(t => t.id === 'barbados-2');
        expect(barbados2?.generator.constructor.name).toBe('GeneratorVaryPropertyWholeNumberRange');
        
        const barbados1 = exerciseTemplates.find(t => t.id === 'barbados-1');
        expect(barbados1?.generator.constructor.name).toBe('GeneratorSingle');
    });
}); 