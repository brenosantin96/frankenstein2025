"use client";

import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ThemeToggler from "../components/themeToggler";
import { Context } from "@/contexts/themeContext";
import { Task } from "@/types/Task";
import { useApi } from "@/api/api";
import { formatDate } from "../utils/Formatters";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TaskBox } from "@/components/TaskBox";

function Main() {
  const router = useRouter();

  const context = useContext(Context);
  if (!context) return null;

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
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
      <div className="h-screen text-2xl"
        style={{
          backgroundColor: context.theme === "LIGHT" ? context.lightSchemeColor.bgcolor : context.darkSchemeColor.bgcolor,
          color: context.theme === "LIGHT" ? context.lightSchemeColor.textColor : context.darkSchemeColor.textColor,
        }}
      >
        <div className="container mx-auto">
          <div id="HeaderArea" className="flex justify-end pr-10 pt-5 ">
            <ThemeToggler />
          </div>

          <div className="flex justify-center items-center mt-20">
            <div className="justify-center items-center">
              <h2 className="text-[36px] font-semibold font-inter text-center pb-5">Tasks</h2>

              <TaskBox
                date={selectedDate as Date}
                tasks={tasks}
                setDate={setSelectedDate} // Passando setDate como prop
              />

              <button
                className="p-3 h-15 bg-blue-400 rounded-md font-semibold"
                style={{
                  backgroundColor: context.theme === "LIGHT" ? context.lightSchemeColor.buttonBGColor : context.darkSchemeColor.buttonBGColor,
                  color: context.theme === "LIGHT" ? context.lightSchemeColor.buttonTextColor : context.darkSchemeColor.buttonTextColor,
                }}
                onClick={() => router.push("/login")}
              >
                Login Page!
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;