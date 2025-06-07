import { Igu } from './Igu.js';
import { GeneratorVaryPropertyWholeNumberRange } from './types/exerciseTemplates/generators/subclasses/GeneratorVaryPropertyWholeNumberRange.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { readFileSync } from 'fs';

// Get __dirname equivalent in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load the example data
const learningGoalsData = JSON.parse(
    readFileSync(dirname(__dirname) + '/src/exampleData/learningGoalsShort.json', 'utf-8')
);
const exerciseTemplatesData = JSON.parse(
    readFileSync(dirname(__dirname) + '/src/exampleData/exerciseTemplatesShort.json', 'utf-8')
);

// Create learning goals
console.log('Creating learning goals...');
const learningGoals = Igu.makeLearningGoalsFromDataDict(learningGoalsData);
console.log(`Created ${learningGoals.length} learning goals:`);
learningGoals.forEach(goal => {
    console.log(`- ${goal.name} (${goal.id})`);
    if (goal.associatedLearningGoals?.length) {
        console.log(`  Associated with: ${goal.associatedLearningGoals.map(g => g.name).join(', ')}`);
    }
    if (goal.blockedBy?.length) {
        console.log(`  Blocked by: ${goal.blockedBy.map(g => g.name).join(', ')}`);
    }
});

// Create exercise templates
console.log('\nCreating exercise templates...');
const exerciseTemplates = Igu.makeExerciseTemplatesFromDataDict(exerciseTemplatesData);
console.log(`Created ${exerciseTemplates.length} exercise templates:`);
exerciseTemplates.forEach(template => {
    console.log(`- Template ${template.id}`);
    console.log(`  Belongs to: ${template.belongsTo.name}`);
    console.log(`  Generator: ${template.generator.constructor.name}`);
    if (template.generator instanceof GeneratorVaryPropertyWholeNumberRange) {
        console.log(`  Varies property: ${template.generator.propertyToVary}`);
        console.log(`  Range: ${template.generator.lowestVariationNumber} to ${template.generator.highestVariationNumber}`);
    }
}); 