## How to Create `Lesson`s from JSON data files

### Assumptions

1. You have learning goals represented in a well-structured JSON, such as this:

```JSON
{
  "pitcairn-is.-main": {
    "name": "Know where Pitcairn Is. is",
    "isLesson": true,
    "associatedLearningGoals": [
      "pitcairn-is.-1"
    ],
    "data": {
      "country": "Pitcairn Is."
    }
  },
  "pitcairn-is.-1": {
    "name": "Find Pitcairn Is. on the worldmap",
    "isLesson": false,
    "data": {
      "country": "Pitcairn Is."
    }
  },
  "barbados-main": {
    "name": "Know where Barbados is",
    "isLesson": true,
    "associatedLearningGoals": [
      "barbados-1",
      "barbados-2",
      "barbados-3"
    ],
    "data": {
      "country": "Barbados"
    }
  },
  "barbados-1": {
    "name": "Find Barbados on the worldmap",
    "isLesson": false,
    "data": {
      "country": "Barbados"
    }
  }
}

```


2. You have exercise templates represented in a well-structured JSON which looks like this:


```JSON
{
  "pitcairn-is.-1": {
    "belongsTo": "pitcairn-is.-1",
    "instruction": "$task_pre Pitcairn Is. $task_post",
    "templateType": {
      "method": "BY_INSTRUCTION",
      "generator": {
        "name": "SINGLE"
      }
    },
    "data": {
      "zoom": 100
    }
  },
  "barbados-1": {
    "belongsTo": "barbados-1",
    "instruction": "$task_pre Barbados $task_post",
    "templateType": {
      "method": "BY_INSTRUCTION",
      "generator": {
        "name": "SINGLE"
      }
    },
    "data": {
      "zoom": 100
    }
  },
  "barbados-2": {
    "belongsTo": "barbados-2",
    "instruction": "$task_pre Barbados $task_post",
    "templateType": {
      "method": "BY_INSTRUCTION",
      "generator": {
        "name": "VARY_PROPERTY_WHOLE_NUMBER_RANGE",
        "data": {
          "propertyToVary": "panField",
          "lowestVariationNumber": 0,
          "highestVariationNumber": 8
        }
      }
    },
    "data": {
      "zoom": 102
    }
  }
}

```

### Process

1. Load the two files from whereever you need to load them
    - Use the interfaces `ExerciseTemplateData` and `LearningGoalData`
2. Use `LearningGoal.makeLearningGoalsFromDataDict()` and `ExerciseTemplate.makeExerciseTemplatesFromDataDict()` to create the respective object arrays, `LearningGoal[]` and `ExerciseTemplate[]`
3. Use `LessonManager.generateLessons()` (passing in both arrays) to generate the actual lesson data 