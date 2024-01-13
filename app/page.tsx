"use client";

import React from "react";
import TaskList from "@/app/components/TaskLists";
import { FaGithub } from "react-icons/fa";

export default function Home() {
  return (
    <div className="flex flex-col gap-y-3 bg-gray-400">
      <header className="flex items-center justify-between p-5">
        <h1 className="text-center text-4xl my-10">Daily Dos</h1>
        <a
          href="https://github.com/segunajibola/todos-daily/"
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
