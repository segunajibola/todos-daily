"use client";

import React, { useState, useEffect } from "react";
import Task from "../types";
import AddTaskForm from "./AddTaskForm";
import { MdOutlineDeleteForever } from "react-icons/md";

interface TaskListProps {
  tasks: Task[];
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  const [taskList, setTaskList] = useState<Task[]>(tasks);
  const [filter, setFilter] = useState<"all" | "done" | "not done">("all");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(taskList));
  }, [taskList]);

  const handleOnAddTask = (newTask: Task) => {
    setTaskList((prevTasks) => [...prevTasks, newTask]);
  };

  const handleCheckbox = (task: Task) => {
    setTaskList((prevTasks) =>
      prevTasks.map((t) =>
        t.id === task.id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const deleteTask = (id: number | string) => {
    setTaskList((prevTask) => prevTask.filter((task) => task.id !== id));
  };

  const getFilteredTasks = () => {
    switch (filter) {
      case "done":
        return taskList.filter((task) => task.completed);
      case "not done":
        return taskList.filter((task) => !task.completed);
      default:
        return taskList;
    }
  };

  return (
    <div>
      <AddTaskForm onAddTask={handleOnAddTask} />

      <h2 className="text-center mb-4 text-2xl">Task List</h2>
      {/* <label>
        Show:
        <select
          value={filter}
          onChange={(e) =>
            setFilter(e.target.value as "all" | "done" | "not done")
          }
        >
          <option value="all">All</option>
          <option value="done">Completed</option>
          <option value="not done">Incomplete</option>
        </select>
      </label> */}

      <div className="flex gap-x-3 m-4 justify-center items-center">
        <span
          className={`${
            filter === "all" ? "bg-gray-700 text-white" : "bg-gray-200"
          } px-1.5 py-1 rounded-lg cursor-pointer`}
          onClick={() => setFilter("all")}
        >
          All
        </span>
        <span
          className={`${
            filter === "not done" ? "bg-gray-700 text-white" : "bg-gray-200"
          } px-1.5 py-1 rounded-lg cursor-pointer`}
          onClick={() => setFilter("not done")}
        >
          Not done
        </span>
        <span
          className={`${
            filter === "done" ? "bg-gray-700 text-white" : "bg-gray-200"
          } px-1.5 py-1 rounded-lg cursor-pointer`}
          onClick={() => setFilter("done")}
        >
          Done
        </span>
      </div>

      <ul>
        {getFilteredTasks().map((task) => (
          <div
            key={task.id}
            className="flex justify-between items-center p-3 m-2 bg-gray-300"
          >
            <li key={task.id} className="flex gap-x-4">
              <input
                type="checkbox"
                checked={task.completed}
                className="w-4"
                onChange={() => handleCheckbox(task)}
              />
              <span
                style={{
                  textDecoration: task.completed ? "line-through" : "none",
                }}
                onClick={() => handleCheckbox(task)}
                className="text-xl"
              >
                {task.title}
              </span>
            </li>

            <MdOutlineDeleteForever
              onClick={() => deleteTask(task.id)}
              className=""
              size={20}
            />
          </div>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
