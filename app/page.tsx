"use client";

import React from "react";
import TaskList from "@/app/components/TaskLists";
import { FaGithub } from "react-icons/fa";

export default function Home() {
  return (
    <div className="flex flex-col gap-y-2 py-5">
      <header className="flex items-center justify-between p-3">
        <h1 className="text-center text-4xl">Daily Dos</h1>
        <a
          href="https://github.com/segunajibola/todos-daily/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub size={25} className="flex items-center" />
        </a>
      </header>
      <div className="flex justify-center">
        <TaskList />
      </div>
    </div>
  );
}
