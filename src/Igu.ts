import { Exercise } from "./types/exercises/Exercise";

    export class Igu {

        // props

        private _exercisePool: Exercise[] = []
    

        // getters/setters
    
        get exercisePool() {
            return this._exercisePool
        }
    
        set exercisePool(exercises:Exercise[]) {
            this._exercisePool = exercises
        }  
        
        // private functions


        // public functions

        addExercises(exercises:Exercise[]) {
            this.exercisePool.push(...exercises)
        }

        getRandomDueExercise():Exercise | undefined {
            if (this._exercisePool.length === 0) {
                return undefined;
            }
            const randomIndex = Math.floor(Math.random() * this._exercisePool.length);
            return this._exercisePool[randomIndex];
        }

        // static functions

        public static
    }