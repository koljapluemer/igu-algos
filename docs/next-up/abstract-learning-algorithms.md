# Learning Algorithms Abstraction

## Overview
This document outlines the plan to abstract different learning algorithms in the Igu library, allowing users to choose and switch between different spaced repetition algorithms.

## Design Goals
- Support multiple learning algorithms (FSRS, SM2, Leitner, etc.)
- Make it easy to add new algorithms
- Keep the core Exercise and Igu classes algorithm-agnostic
- Maintain type safety and good testing capabilities

## Implementation Plan

### 1. Core Interfaces and Types

```typescript
enum LearningAlgorithmType {
    FSRS = "FSRS",
    SM2 = "SM2",
    LEITNER = "LEITNER"
}

interface LearningAlgorithm {
    processLearningEvent(exercise: Exercise, event: LearningEvent): ExerciseLearningData;
    isDue(exercise: Exercise, currentTime: Date): boolean;
    
    // Optional methods for algorithm-specific features
    getNextReviewTime?(exercise: Exercise): Date;
    getDifficulty?(exercise: Exercise): number;
}
```

### 2. Algorithm Implementations

Each algorithm will be implemented as a separate class:

```typescript
class FSRSAlgorithm implements LearningAlgorithm {
    private fsrs: FSRS;
    
    constructor() {
        this.fsrs = new FSRS({});
    }
    
    processLearningEvent(exercise: Exercise, event: LearningEvent): ExerciseLearningData {
        // FSRS-specific implementation
    }
    
    isDue(exercise: Exercise, currentTime: Date): boolean {
        // FSRS-specific due logic
    }
}

class SM2Algorithm implements LearningAlgorithm {
    processLearningEvent(exercise: Exercise, event: LearningEvent): ExerciseLearningData {
        // SM2-specific implementation
    }
    
    isDue(exercise: Exercise, currentTime: Date): boolean {
        // SM2-specific due logic
    }
}
```

### 3. Igu Class Modifications

The Igu class will be modified to use the algorithm interface:

```typescript
class Igu {
    private _learningAlgorithm: LearningAlgorithm;
    
    constructor(algorithm: LearningAlgorithmType = LearningAlgorithmType.FSRS) {
        this._learningAlgorithm = this.createAlgorithm(algorithm);
    }
    
    private createAlgorithm(type: LearningAlgorithmType): LearningAlgorithm {
        switch(type) {
            case LearningAlgorithmType.FSRS:
                return new FSRSAlgorithm();
            case LearningAlgorithmType.SM2:
                return new SM2Algorithm();
            // Add more cases as needed
        }
    }
    
    public recordLearningEvent(exerciseId: string, event: LearningEvent): Exercise | undefined {
        const exercise = this.getExerciseByID(exerciseId);
        if (!exercise) return undefined;
        
        exercise._learningData = this._learningAlgorithm.processLearningEvent(exercise, event);
        return exercise;
    }
    
    public isExerciseDue(exercise: Exercise): boolean {
        return this._learningAlgorithm.isDue(exercise, new Date());
    }
}
```

## Benefits

1. **Extensibility**: New algorithms can be added by implementing the `LearningAlgorithm` interface
2. **Encapsulation**: Each algorithm's logic is contained within its own class
3. **Type Safety**: The enum ensures only valid algorithms can be selected
4. **Flexibility**: Algorithms can have their own specific methods while maintaining a common interface
5. **Testability**: Each algorithm can be tested independently

## Adding New Algorithms

To add a new algorithm:

1. Add it to the `LearningAlgorithmType` enum
2. Create a new class implementing the `LearningAlgorithm` interface
3. Add the new case to the `createAlgorithm` factory method in Igu

## Next Steps

1. Create the core interfaces and types
2. Implement the FSRS algorithm as the first concrete implementation
3. Add tests for the algorithm abstraction
4. Document the API for adding new algorithms
5. Implement additional algorithms (SM2, Leitner, etc.)
