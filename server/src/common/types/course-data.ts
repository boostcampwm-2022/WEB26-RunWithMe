export interface CourseData {
    id: number;
    title: string;
    path: string;
    pathLength: number;
    name: string;
    createdAt: Date;
    user: { userId: string };
}
