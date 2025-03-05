export type Task = {
    id: number;
    name: string;
    isFinished: boolean;
    dateCreated: Date;
    dateToFinish: Date;
    dateFinished: Date | null;

}