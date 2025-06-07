[**igu-algos v0.0.1**](../README.md)

***

[igu-algos](../README.md) / Igu

# Class: Igu

Main class for managing exercises and their scheduling.

## Constructors

### Constructor

> **new Igu**(): `Igu`

#### Returns

`Igu`

## Accessors

### exercisePool

#### Get Signature

> **get** **exercisePool**(): `Exercise`[]

Current collection of exercises available for review

##### Returns

`Exercise`[]

#### Set Signature

> **set** **exercisePool**(`exercises`): `void`

Updates the entire collection of available exercises

##### Parameters

###### exercises

`Exercise`[]

##### Returns

`void`

## Methods

### addExercises()

> **addExercises**(`exercises`): `void`

Adds new exercises to the exercise pool.

#### Parameters

##### exercises

`Exercise`[]

#### Returns

`void`

***

### getRandomDueExercise()

> **getRandomDueExercise**(): `undefined` \| `Exercise`

Returns a random exercise that is due for review.

#### Returns

`undefined` \| `Exercise`
