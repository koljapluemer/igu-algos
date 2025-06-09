[**igu-algos v1.0.0**](../README.md)

***

[igu-algos](../README.md) / Igu

# Class: Igu

The "meta object" of the library, essentially a mediator
holds LearningGoals, holds Exercises.
Matches them against each other, decides what to learn next

## Constructors

### Constructor

> **new Igu**(): `Igu`

Creates a new Igu instance with empty collections

#### Returns

`Igu`

## Methods

### addData()

> **addData**(`learningGoals`, `exercises`): `void`

Create a basic instance by passing in all the data

#### Parameters

##### learningGoals

[`LearningGoalData`](../interfaces/LearningGoalData.md)[]

##### exercises

[`ExerciseData`](../interfaces/ExerciseData.md)[]

#### Returns

`void`

***

### getChildrenExercisesForLearningGoalID()

> **getChildrenExercisesForLearningGoalID**(`learningGoalId`): `Exercise`[]

Returns all exercises associated with a specific learning goal

#### Parameters

##### learningGoalId

`string`

#### Returns

`Exercise`[]

***

### getExerciseByID()

> **getExerciseByID**(`id`): `undefined` \| `Exercise`

Finds an exercise by its ID

#### Parameters

##### id

`string`

#### Returns

`undefined` \| `Exercise`

***

### getExercises()

> **getExercises**(): `Exercise`[]

Returns all exercises in the collection

#### Returns

`Exercise`[]

***

### getLearningGoalByID()

> **getLearningGoalByID**(`id`): `undefined` \| `LearningGoal`

Finds a learning goal by its ID

#### Parameters

##### id

`string`

#### Returns

`undefined` \| `LearningGoal`

***

### getLearningGoals()

> **getLearningGoals**(): `LearningGoal`[]

Returns all learning goals in the collection

#### Returns

`LearningGoal`[]

***

### getRandomExerciseFromLearningGoalID()

> **getRandomExerciseFromLearningGoalID**(`learningGoalId`): `undefined` \| `Exercise`

Returns a random exercise associated with a specific learning goal, avoiding the last selected one

#### Parameters

##### learningGoalId

`string`

#### Returns

`undefined` \| `Exercise`

***

### getRandomExerciseWithLearningGoal()

> **getRandomExerciseWithLearningGoal**(): `undefined` \| \{ `exercise`: `Exercise`; `learningGoal`: `LearningGoal`; \}

Return a random exercise and the learning goal it is associated with

#### Returns

`undefined` \| \{ `exercise`: `Exercise`; `learningGoal`: `LearningGoal`; \}

***

### getRandomLearningGoal()

> **getRandomLearningGoal**(): `undefined` \| `LearningGoal`

Returns a random learning goal from the collection, avoiding the last selected one

#### Returns

`undefined` \| `LearningGoal`

***

### recordLearningEvent()

> **recordLearningEvent**(`exerciseId`, `event`): `undefined` \| `Exercise`

Records a learning event for an exercise and updates its learning data

#### Parameters

##### exerciseId

`string`

The ID of the exercise to record the event for

##### event

[`LearningEventFSRS`](../interfaces/LearningEventFSRS.md)

The learning event containing the rating and timestamp

#### Returns

`undefined` \| `Exercise`

The updated exercise, or undefined if the exercise wasn't found
