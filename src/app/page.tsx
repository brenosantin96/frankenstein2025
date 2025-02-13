"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Task } from "@/types/Task";
import { useApi } from "@/api/api";
import { TaskBox } from "@/components/TaskBox";
import { Icon } from '../components/svg/Icon';

function Main() {
  const router = useRouter();

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    setSelectedDate(new Date()); // Evita diferenças entre SSR e CSR
    getAllTasks();
  }, []);

  const getAllTasks = async () => {
    const responseTasksApi = await useApi.getTasks();

    try {
      const formattedTasks: Task[] = responseTasksApi.map((task) => ({
        id: task.id,
        description: task.description,
        isFinished: task.isFinished,
        dateCreated: new Date(task.dateCreated),
        dateFinished: task.dateFinished ? new Date(task.dateFinished) : null,
        dateToFinish: task.dateToFinish ? new Date(task.dateToFinish) : null,
      }));

      console.log(formattedTasks);
      setTasks(formattedTasks);
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  return (
    <>
      <div className="h-screen text-2xl bg-beige-cornsilk text-green-pakistan">
        <div className="container mx-auto">
          <div id="HeaderArea" className="flex justify-end pr-10 pt-5 ">

          </div>

          <div className="flex justify-center items-center mt-20">
            <div className="justify-center items-center">
              <h2 className="text-[36px] font-semibold font-inter text-center pb-5">Tasks</h2>

              <TaskBox
                date={selectedDate as Date}
                tasks={tasks}
                setDate={setSelectedDate} // Passando setDate como prop
              />

            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;