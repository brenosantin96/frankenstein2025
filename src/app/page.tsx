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

function Main() {
  const router = useRouter();

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);

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
          <Header svgLeft="backward" svgRight="menu" title="Tasks" />

          <div className="flex justify-center items-center flex-col mt-10 bg-red-300">

            <div id="datePicker">
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
            <div id="todayTasks">
              {tasks
                .filter((task) => {
                  // Filtra as tarefas que estão dentro do intervalo de datas
                  const start = startOfDay(selectedDate as Date);
                  const end = endOfDay(selectedDate as Date);
                  return task.dateToFinish >= start && task.dateToFinish <= end;
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