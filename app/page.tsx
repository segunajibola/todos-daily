"use client";

import React from "react";
import TaskList from "@/app/components/TaskLists";
import Footer from "@/app/components/Footer";
import { FaGithub } from "react-icons/fa";

export default function Home() {
  return (
    <>
      <div className="flex flex-col gap-y-6">
        <header className="flex items-center justify-between py-3 w-[90%] mx-auto">
          <h1 className="text-center text-4xl">Daily Dos</h1>
          <a
            href="https://github.com/segunajibola/todos-daily/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub size={25} className="flex items-center" />
          </a>
        </header>
        <div className="w-[90%] mx-auto">
          <TaskList />
        </div>
      </div>
      <Footer />
    </>
  );
}
