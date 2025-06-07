import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { LearningGoal } from '../../LearningGoal';

const __dirname = dirname(fileURLToPath(import.meta.url));

describe('Learning Goal Factory test with basic data file', () => {
    const learningGoalsData = JSON.parse(
        readFileSync(join(__dirname, 'learningGoalsShort.json'), 'utf-8')
    );


    it('should create learning goals with proper relationships', () => {
        const learningGoals = LearningGoal.makeLearningGoalsFromDataDict(learningGoalsData);
        
        expect(learningGoals).toHaveLength(6);
        
        const barbadosMain = learningGoals.find(g => g.id === 'barbados-main');
        expect(barbadosMain?.associatedLearningGoals).toHaveLength(3);
        
        const barbados3 = learningGoals.find(g => g.id === 'barbados-3');
        expect(barbados3?.blockedBy).toHaveLength(2);
    });


}); 