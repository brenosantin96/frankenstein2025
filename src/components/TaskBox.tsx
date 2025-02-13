import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover";
import { Task } from "@/types/Task";
import { formatDate } from "@/utils/Formatters";
import { useState } from "react";
import { TaskComponent } from "./TaskComponent";

type TaskBoxProps = {
    date: Date;
    setDate: (date: Date | undefined) => void; // Função para atualizar a data
    tasks: Task[];
}

export const TaskBox = ({ date, setDate, tasks }: TaskBoxProps) => {

    const [isPopoverOpen, setIsPopoverOpen] = useState(false);

    const handleDateSelect = (selectedDate: Date | undefined) => {
        setDate(selectedDate); //updating selectedDate
        setIsPopoverOpen(false);
    }

    return (
        <div id="TaskBox" className="h-[430px] w-[600px] rounded-md bg-green-pakistan p-2">
            <div id="headerTaskBox" className="text-center font-bold text-2xl pb-3">
                <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen} >
                    <PopoverTrigger onClick={() => setIsPopoverOpen(true)}>{formatDate(date)}</PopoverTrigger>
                    <PopoverContent>
                        <Calendar
                            mode="single"
                            selected={date}
                            onSelect={handleDateSelect} // Passando a função setDate diretamente
                            className="rounded-md border"
                        />
                    </PopoverContent>
                </Popover>
            </div>

            <div id="contentTaskBox">
                {tasks.map((task) => (
                    <TaskComponent task={task} key={task.id} />
                ))}
            </div>
        </div>
    );
}