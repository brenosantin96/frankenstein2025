import { endOfDay, format, startOfDay } from "date-fns";
import { Task } from "../types/Task";

type TaskProps = {
    task: Task;
}

export const TaskComponent = ({ task }: TaskProps) => {

    const start = startOfDay(new Date());
    const end = endOfDay(new Date());

    return (
        <div key={task.id} className="py-2">
            <div className="text-sm font-inter">
                <span><input type="checkbox" /> {task.name}</span>
            </div>
            {task.dateToFinish < start &&
                <div className="text-xs font-bold text-[#BC6C25]">
                    {`para ${format(task.dateToFinish, 'dd-MMM-yyyy')}`}
                </div>
            }
            {task.dateToFinish > end &&
                <div className="text-xs font-bold text-[#559928]">
                    {`para ${format(task.dateToFinish, 'dd-MMM-yyyy')}`}
                </div>
            }
        </div>
    )
}