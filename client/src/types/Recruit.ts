import { Course } from "./Course";

export interface Recruit {
    title: string;
    recruitId: number;
    course: Course;
    startTime: Date;
    maxPpl: number;
    pace: number;
    authorId: string;
}
