"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Task } from "@/types/Task";
import { useApi } from "@/api/api";
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover";
import Header from "@/components/Header";
import { Calendar } from "@/components/ui/calendar";
import { formatDate } from "@/utils/Formatters";
import { TaskComponent } from "@/components/TaskComponent";
import { endOfDay, startOfDay } from "date-fns";
import SideMenu from "@/components/SideMenu";

function Main() {
  const router = useRouter();

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isMenuOpened, setIsMenuOpened] = useState(false);

  useEffect(() => {
    setSelectedDate(new Date()); // Evita diferenças entre SSR e CSR
    getAllTasks();
  }, []);

  const getAllTasks = async () => {
    const responseTasksApi = await useApi.getTasks();

    //manageDates
    try {
      const formattedTasks: Task[] = responseTasksApi.map((task) => ({
        id: task.id,
        description: task.description,
        isFinished: task.isFinished,
        dateCreated: new Date(task.dateCreated),
        dateFinished: task.dateFinished ? new Date(task.dateFinished) : null,
        dateToFinish: new Date(task.dateToFinish),
      }));

      console.log(formattedTasks);
      setTasks(formattedTasks);
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setSelectedDate(selectedDate); //updating selectedDate
    setIsPopoverOpen(false);
  }


  return (
    <>
      <div className="h-screen text-2xl bg-beige-cornsilk text-green-pakistan">
        <div className="container mx-auto">
          <Header svgLeft="backward" svgRight="menu" onClickRightIcon={() => setIsMenuOpened(true)} title="Tasks" />
          
          <SideMenu menuOpened={isMenuOpened} onClose={() => setIsMenuOpened(false)} />

          <div className="flex justify-center items-center flex-col mt-10">

            <div id="datePicker" className="font-bold cursor-pointer">
              <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen} >
                <PopoverTrigger onClick={() => setIsPopoverOpen(true)}>{formatDate(selectedDate as Date)}</PopoverTrigger>
                <PopoverContent>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={handleDateSelect} // Passando a função setDate diretamente
                    className="rounded-md border"
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div id="todayTasks" className="flex flex-col text-[#283618] w-full mt-7 pl-5">
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

export default Main;