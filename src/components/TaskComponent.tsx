import { Task } from "../types/Task";

type TaskProps = {
    task: Task;
}

export const TaskComponent = ({ task }: TaskProps) => {
    return (
        <div key={task.id}>
            <div className="py-1 text-xl pl-2">
                <span><input type="checkbox" /> {task.description}</span>
            </div>
        </div>
    )
}