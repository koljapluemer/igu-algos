[**igu-algos v0.0.1**](../README.md)

***

[igu-algos](../README.md) / LearningGoal

# Class: LearningGoal

Represents a learning goal or lesson that can be associated with exercises and other learning goals.

## Constructors

### Constructor

> **new LearningGoal**(`id`, `name`, `isLesson`, `data?`): `LearningGoal`

Creates a new learning goal instance.

#### Parameters

##### id

`string`

##### name

`string`

##### isLesson

`boolean`

##### data?

#### Returns

`LearningGoal`

## Properties

### data?

> `readonly` `optional` **data**: `object`

#### Index Signature

\[`key`: `string`\]: `unknown`

***

### id

> `readonly` **id**: `string`

***

### isLesson

> `readonly` **isLesson**: `boolean`

***

### name

> `readonly` **name**: `string`

## Accessors

### associatedLearningGoals

#### Get Signature

> **get** **associatedLearningGoals**(): `undefined` \| `LearningGoal`[]

Gets the list of learning goals associated with this goal.

##### Returns

`undefined` \| `LearningGoal`[]

***

### blockedBy

#### Get Signature

> **get** **blockedBy**(): `undefined` \| `LearningGoal`[]

Gets the list of learning goals that block this goal.

##### Returns

`undefined` \| `LearningGoal`[]

## Methods

### setAssociatedLearningGoals()

> **setAssociatedLearningGoals**(`goals`): `void`

Sets the learning goals associated with this goal.

#### Parameters

##### goals

`LearningGoal`[]

#### Returns

`void`

***

### setBlockedBy()

> **setBlockedBy**(`goals`): `void`

Sets the learning goals that block this goal.

#### Parameters

##### goals

`LearningGoal`[]

#### Returns

`void`

***

### makeLearningGoalsFromDataDict()

> `static` **makeLearningGoalsFromDataDict**(`dataDict`): `LearningGoal`[]

Creates multiple learning goals from a dictionary of configuration data.

#### Parameters

##### dataDict

#### Returns

`LearningGoal`[]
