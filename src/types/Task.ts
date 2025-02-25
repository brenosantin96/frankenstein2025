export type Task = {
    id: number;
    description: string;
    isFinished: boolean;
    dateCreated: Date;
    dateToFinish: Date;
    dateFinished: Date | null;

}