import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Task } from "@/types/Task";
import { formatDate } from "@/utils/Formatters";

type TaskBoxProps = {
    date: Date;
    setDate: (date: Date | undefined) => void; // Função para atualizar a data
    tasks: Task[];
}

export const TaskBox = ({ date, setDate, tasks }: TaskBoxProps) => {
    return (
        <div id="TaskBox" className="h-[430px] w-[600px] rounded-md bg-[#372554] border-white border p-2">
            <div id="headerTaskBox" className="text-center font-bold text-2xl pb-3">
                <Popover>
                    <PopoverTrigger>{formatDate(date)}</PopoverTrigger>
                    <PopoverContent>
                        <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate} // Passando a função setDate diretamente
                            className="rounded-md border"
                        />
                    </PopoverContent>
                </Popover>
            </div>

            <div id="contentTaskBox">
                {tasks.map((task) => (
                    <div key={task.id}>
                        <div className="py-1 text-xl pl-2">
                            <span><input type="checkbox" /> {task.description}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}