"use client";

import React, { useState } from "react";
import Task from "../types";
import { v4 as uuidv4 } from 'uuid';

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
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="add task"
        value={newTaskTitle}
        onChange={(e) => SetNewTaskTitle(e.target.value)}
        className="p-3 outline-none"
      />
      <button
        type="submit"
        className="bg-gray-100 text-black p-3 m-3 rounded-md"
      >
        Add
      </button>
    </form>
  );
};

export default AddTaskForm;
