export type Task = {
    id: number;
    description: string;
    isFinished: boolean;
    dateCreated: Date;
    dateFinished: Date | null;
    dateToFinish: Date | null;

}