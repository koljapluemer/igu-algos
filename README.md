# Igu Algos

An opinionated collection of classes, types, utils and algos I use to build learning applications.

## Usage Guide

The `Igu` class is the main entry point for building learning applications. Here's how to use it:

### 1. Initialize and Add Data

```typescript
const igu = new Igu()

// Add your learning goals and exercises
igu.addData(
    [
        { id: 'lg1', name: 'Basic Math' },
        { id: 'lg2', name: 'Advanced Math' }
    ],
    [
        {
            id: 'ex1',
            learningGoals: ['lg1'],
            learningData: {
                isBlacklisted: false,
                // ... other FSRS card data
            }
        }
    ]
)
```

### 2. Get Learning Content

You can get learning content in several ways:

```typescript
// Get a random learning goal
const learningGoal = igu.getRandomLearningGoal()

// Get a random exercise with its associated learning goal
const { exercise, learningGoal } = igu.getRandomExerciseWithLearningGoal()

// Get exercises for a specific learning goal
const exercises = igu.getChildrenExercisesForLearningGoalID('lg1')

// Get a random exercise for a specific learning goal
const exercise = igu.getRandomExerciseFromLearningGoalID('lg1')
```

### 3. Record Learning Progress

When a user completes an exercise, record their performance:

```typescript
// Record a learning event (e.g., user rated the exercise as "Good")
const updatedExercise = igu.recordLearningEvent('ex1', Rating.Good)
```

The system uses the FSRS (Free Spaced Repetition Scheduler) algorithm to schedule when exercises should be reviewed next.

## Development

- Documentation can now be generated with `npx typedoc`