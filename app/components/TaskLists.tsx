"use client";

import React, { useState, useEffect } from "react";
import Task from "../types";
import AddTaskForm from "./AddTaskForm";
import { MdOutlineDeleteForever, MdOutlineDone } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";
import { CiEdit } from "react-icons/ci";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";

const TaskList: React.FC = () => {
  const [filter, setFilter] = useState<"all" | "done" | "not done">("all");
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [editingTaskId, setEditingTaskId] = useState<string>("");
  const { width, height } = useWindowSize();

  useEffect(() => {
    // if (typeof window !== "undefined" && window.localStorage) {
    let data = JSON.parse(localStorage.getItem("tasks") || "[]");
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
    // }
  }, []);

  const handleOnAddTask = (newTask: Task) => {
    // if (typeof window !== "undefined" && window.localStorage) {
    setTaskList((prevTasks) => {
      const updatedTasks = [...prevTasks, newTask];
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      return updatedTasks;
    });
    // }
  };

  const handleCheckbox = (id: string) => {
    setTaskList((prevTasks) => {
      const updateCheckbox = prevTasks.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      );
      localStorage.setItem("tasks", JSON.stringify(updateCheckbox));
      return updateCheckbox;
    });
  };

  const deleteTask = (id: number | string) => {
    setTaskList((prevTask) => {
      const deletedTask = prevTask.filter((task) => task.id !== id);
      localStorage.setItem("tasks", JSON.stringify(deletedTask));
      return deletedTask;
    });
  };

  const handleEditTask = (taskId: string, newTitle: string) => {
    setTaskList((prevTasks) => {
      const editedTask = prevTasks.map((task) =>
        task.id === taskId ? { ...task, title: newTitle } : task
      );
      localStorage.setItem("tasks", JSON.stringify(editedTask));
      return editedTask;
    });
  };

  const handleUnselect = () => {
    setTaskList((prevTasks) => {
      const allUnselectedTask = prevTasks.map((task) => ({
        ...task,
        completed: false,
      }));
      localStorage.setItem("tasks", JSON.stringify(allUnselectedTask));
      return allUnselectedTask;
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

  const notDoneTask: Task[] = taskList.filter(
    (task) => task.completed === false
  );

  return (
    <div className="text-center">
      {notDoneTask.length === 0 && <Confetti width={width} height={height} />}

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

      <div>
        <span onClick={handleUnselect}>Unselect all</span>
      </div>

      <ul className="grid grid-cols-2 gap-2">
        {getFilteredTasks().map((task) => (
          <div
            key={task.id}
            className="flex justify-between items-center p-2.5 m-1.5 bg-gray-300"
          >
            {editingTaskId === task.id ? (
              <>
                <input
                  type="text"
                  value={task.title}
                  onChange={(e) => handleEditTask(task.id, e.target.value)}
                  className="p-2 h-11 outline-none"
                />
                <MdOutlineDone onClick={() => setEditingTaskId("")} size={25} />
              </>
            ) : (
              <>
                <li className="flex gap-x-4 p-2">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    className="w-4"
                    onChange={() => handleCheckbox(task.id)}
                  />
                  <span
                    style={{
                      textDecoration: task.completed ? "line-through" : "none",
                    }}
                    onClick={() => handleCheckbox(task.id)}
                    className="text-xl"
                  >
                    {task.title}
                  </span>
                </li>
                <div className="flex gap-x-2">
                  <MdOutlineDeleteForever
                    onClick={() => deleteTask(task.id)}
                    className=""
                    size={25}
                  />
                  <CiEdit onClick={() => setEditingTaskId(task.id)} size={25} />
                </div>
              </>
            )}
          </div>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
