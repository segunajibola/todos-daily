"use client";

import React, { useState, useEffect } from "react";
import Task from "../types";
import AddTaskForm from "./AddTaskForm";
import { MdOutlineDeleteForever } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";

// interface TaskListProps {
//   tasks: Task[];
// }

const TaskList: React.FC = () => {
  const [filter, setFilter] = useState<"all" | "done" | "not done">("all");
  const [taskList, setTaskList] = useState<Task[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      let data = JSON.parse(localStorage.getItem("tasks") || "[]");
      console.log("data", data);
      if (data.length === 0) {
        data = [
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
      setTaskList(data);
      console.log("taskList", taskList);
    }
  }, []);

  // useEffect(() => {
  // if (taskList.length === 0) {
  //   setTaskList([
  //     {
  //       id: uuidv4(),
  //       title: "Read a book",
  //       completed: false,
  //     },
  //     {
  //       id: uuidv4(),
  //       title: "Learn JavaScript",
  //       completed: false,
  //     },
  //   ]);
  // }
  // }, [taskList]);

  const handleOnAddTask = (newTask: Task) => {
    if (typeof window !== "undefined" && window.localStorage) {
      setTaskList((prevTasks) => {
        const updatedTasks = [...prevTasks, newTask];
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
        return updatedTasks;
      });
    }
  };

  const handleCheckbox = (task: Task) => {
    setTaskList((prevTasks) =>
      prevTasks.map((t) =>
        t.id === task.id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const deleteTask = (id: number | string) => {
    setTaskList((prevTask) => {
      const deletedTask = prevTask.filter((task) => task.id !== id);
      localStorage.setItem("tasks", JSON.stringify(deletedTask));
      return deletedTask;
    });
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
            <li className="flex gap-x-4">
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
