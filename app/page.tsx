"use client";

import React, { useState, useEffect } from "react";
import TaskList from "@/app/components/TaskLists";
import Task from "./types";
import { FaGithub } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";

export default function Home() {
  // let tasks: Task[] = [];

  // useEffect(() => {
  //   tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  //   console.log("tasks", tasks)
  // }, []);

  //   if (tasks.length === 0) {
  //     tasks = [
  //       { 
  //         id: uuidv4(),
  //         title: "Read a book",
  //         completed: false,
  //       },
  //       {
  //         id: uuidv4(),
  //         title: "Learn JavaScript",
  //         completed: false,
  //       },
  //     ];
  //   }
  

  // try {
  //   tasks = storedTasks ?
  // } catch (error) {
  //   console.error("Error parsing JSON:", error);
  // }

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
        <TaskList />
      </div>
    </div>
  );
}
