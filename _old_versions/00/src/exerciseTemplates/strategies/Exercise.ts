/**
 * Represents an exercise with an instruction and associated data.
 */
export interface Exercise {
    /** The instruction text for the exercise */
    readonly instruction: string;
    /** Additional data associated with the exercise */
    readonly data: { [key: string]: unknown };
}