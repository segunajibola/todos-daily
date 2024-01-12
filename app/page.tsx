"use client";

import React from "react";
import TaskList from "@/app/components/TaskLists";
import Task from "./types";
import { FaGithub } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";

export default function Home() {
  const storedTasks: string | null = localStorage.getItem("tasks");
  let tasks: Task[] = [];

  try {
    tasks = storedTasks ? JSON.parse(storedTasks) : [];
  } catch (error) {
    console.error("Error parsing JSON:", error);
  }
  
  if (tasks.length === 0) {
    tasks = [
      {
        id: uuidv4(),
        title: "Read a book",
        completed: false,
      },
      {
        id: uuidv4(),
        title: "Learn JavaScript",
        completed: false,
      },
    ];
  }

  return (
    <div className="flex flex-col gap-y-3 bg-gray-400 h-screen">
      <header className="flex items-center justify-between p-5">
        <h1 className="text-center text-4xl my-10">Daily Dos</h1>
        <a
          href="https://github.com/segunajibola/daily-do"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub size={25} />
        </a>
      </header>
      <div className="flex justify-center">
        <TaskList tasks={tasks} />
      </div>
    </div>
  );
}
