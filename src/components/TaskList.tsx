// components/TaskList.tsx
"use client";

import { useEffect, useState } from "react";
import { Task } from "@/types/Task";
import { TaskComponent } from "@/components/TaskComponent";
import SideMenu from "./SideMenu";
import Header from "./Header";
import { endOfDay } from "date-fns";
import { Icon } from "./svg/Icon";
import DatePicker from "./DatePicker";

type TaskListProps = {
    allTasks: Task[]
}

export default function TaskList({ allTasks }: TaskListProps) {

    const [tasks, setTasks] = useState<Task[]>(allTasks ? allTasks : []);
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [isMenuOpened, setIsMenuOpened] = useState(false);

    const handleDateSelect = (selectedDate: Date | undefined) => {
        setSelectedDate(selectedDate); //updating selectedDate
        setIsPopoverOpen(false);
    }

    useEffect(() => {
        console.log("Tasks: ", tasks)
    }, [tasks])


    return (
        <>
            <div className="h-screen text-2xl bg-beige-cornsilk text-green-pakistan">
                <div className="container mx-auto">
                    <Header svgLeft="backward" svgRight="menu" onClickRightIcon={() => setIsMenuOpened(true)} title="Tasks" />
                    <SideMenu menuOpened={isMenuOpened} onClose={() => setIsMenuOpened(false)} />
                    <div className="flex flex-col mt-10">

                        <DatePicker handleDateSelect={handleDateSelect} isPopoverOpen={isPopoverOpen} selectedDate={selectedDate as Date} setIsPopoverOpen={setIsPopoverOpen} />

                        <div className="flex justify-start pl-4 items-start">
                            <Icon svg="plus" />
                        </div>

                        <div id="todayTasks" className="flex flex-col text-[#283618] w-full mt-4 pl-5">
                            {tasks
                                .filter((task) => {
                                    // Filtra as tarefas que estão dentro do intervalo de datas
                                    //const start = startOfDay(selectedDate as Date);
                                    const end = endOfDay(selectedDate as Date);
                                    return task.dateToFinish <= end;
                                })
                                .sort((a, b) => {
                                    return a.dateToFinish.getTime() - b.dateToFinish.getTime();
                                })
                                .map((task) => (
                                    // Renderiza o componente TaskComponent para cada tarefa filtrada
                                    <TaskComponent task={task} key={task.id} />
                                ))}
                        </div>
                        <div id="futureTasks" className="flex mt-9 flex-col bg-[#283618] text-[#FEFAE0] w-full pl-5 pb-5">
                            <div className="text-center mb-2 text-lg pt-3 font-semibold">
                                Future Tasks
                            </div>
                            {tasks
                                .filter((task) => {
                                    // Filtra as tarefas que estão dentro do intervalo de datas
                                    //const start = startOfDay(selectedDate as Date);
                                    const end = endOfDay(selectedDate as Date);
                                    return task.dateToFinish >= end;
                                })
                                .sort((a, b) => {
                                    return a.dateToFinish.getTime() - b.dateToFinish.getTime();
                                })
                                .map((task) => (
                                    // Renderiza o componente TaskComponent para cada tarefa filtrada
                                    <TaskComponent task={task} key={task.id} />
                                ))}
                        </div>



                    </div>
                </div>
            </div>
        </>
    );
}