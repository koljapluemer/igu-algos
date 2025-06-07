[**igu-algos v0.0.1**](../README.md)

***

[igu-algos](../README.md) / ExerciseTemplate

# Class: ExerciseTemplate

Represents a template for generating exercises with specific learning goals and generation strategies.

## Constructors

### Constructor

> **new ExerciseTemplate**(`id`, `belongsTo`, `generator`, `data?`): `ExerciseTemplate`

Creates a new exercise template with specified configuration.

#### Parameters

##### id

`string`

Unique identifier for the template

##### belongsTo

[`LearningGoal`](LearningGoal.md)

The learning goal this template contributes to

##### generator

`Generator`

The generator responsible for creating exercises from this template

##### data?

Optional data passed through

#### Returns

`ExerciseTemplate`

## Properties

### belongsTo

> `readonly` **belongsTo**: [`LearningGoal`](LearningGoal.md)

***

### data?

> `readonly` `optional` **data**: `object`

#### Index Signature

\[`key`: `string`\]: `unknown`

***

### generator

> `readonly` **generator**: `Generator`

***

### id

> `readonly` **id**: `string`

## Methods

### makeExerciseTemplatesFromDataDict()

> `static` **makeExerciseTemplatesFromDataDict**(`dataDict`, `learningGoals`): `ExerciseTemplate`[]

Creates multiple exercise templates from a dictionary of configuration data.

#### Parameters

##### dataDict

##### learningGoals

`Map`\<`string`, [`LearningGoal`](LearningGoal.md)\>

#### Returns

`ExerciseTemplate`[]
