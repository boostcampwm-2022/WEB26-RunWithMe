import { Course } from "./Course";

export interface Recruit {
    id: number;
    title: string;
    startTime: string;
    maxPpl: number;
    currentPpl: number;
    userId: string;
    createdAt: string;
    course: Course;
    pace: number;
}
