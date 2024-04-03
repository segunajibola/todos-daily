"use client";

import React, { useState } from "react";
import Task from "../types";
import { v4 as uuidv4 } from "uuid";

interface AddTaskFormProps {
  onAddTask: (task: Task) => void;
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({ onAddTask }) => {
  const [newTaskTitle, SetNewTaskTitle] = useState<string>("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTaskTitle.trim() !== "") {
      const newTask: Task = {
        id: uuidv4(),
        title: newTaskTitle,
        completed: false,
      };

      onAddTask(newTask);
      SetNewTaskTitle("");
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="w-[75%] flex gap-2 items-center mx-auto"
    >
      <input
        type="text"
        placeholder="add task"
        value={newTaskTitle}
        onChange={(e) => SetNewTaskTitle(e.target.value)}
        className="p-3 text-2xl outline-none w-full mx-auto rounded-md"
      />
      <button
        type="submit"
        className="bg-gray-700 text-white text-2xl p-3 m-4 mx-auto w-[25%] rounded-md"
      >
        Add
      </button>
    </form>
  );
};

export default AddTaskForm;
