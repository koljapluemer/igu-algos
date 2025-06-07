[**igu-algos v0.0.1**](../README.md)

***

[igu-algos](../README.md) / ExerciseTemplateData

# Interface: ExerciseTemplateData

A type for ExerciseTemplate data represented as JSON (for file storage)

## Properties

### belongsTo

> **belongsTo**: [`LearningGoal`](../classes/LearningGoal.md)

***

### data?

> `optional` **data**: `object`

#### Index Signature

\[`key`: `string`\]: `unknown`

***

### templateType

> **templateType**: `object`

#### generator

> **generator**: `object`

##### generator.data

> **data**: `object`

##### generator.data.highestVariationNumber

> **highestVariationNumber**: `number`

##### generator.data.lowestVariationNumber

> **lowestVariationNumber**: `number`

##### generator.data.propertyToVary

> **propertyToVary**: `string`

##### generator.name

> **name**: `string`
