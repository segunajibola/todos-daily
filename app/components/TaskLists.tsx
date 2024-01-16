"use client";

import React, { useState, useEffect } from "react";
import Task from "../types";
import AddTaskForm from "./AddTaskForm";
import { MdOutlineDeleteForever, MdOutlineDone } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";
import { CiEdit } from "react-icons/ci";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";
import Loading from "./Loading";

const TaskList: React.FC = () => {
  const [filter, setFilter] = useState<"all" | "done" | "not done">("all");
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [editingTaskId, setEditingTaskId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [confetti, setConfetti] = useState<boolean>(false);
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

  const checkNotDoneTask = (num: number) => {
    num === 0 ? setConfetti(true) : setConfetti(false);
  };

  const handleCheckbox = (id: string) => {
    setTaskList((prevTasks) => {
      const updateCheckbox = prevTasks.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      );
      localStorage.setItem("tasks", JSON.stringify(updateCheckbox));
      let data: Task[] = JSON.parse(localStorage.getItem("tasks") || "[]");
      const notDoneCheckBox = data.filter((task) => task.completed === false);
      checkNotDoneTask(notDoneCheckBox.length);
      return updateCheckbox;
    });
  };

  useEffect(() => {
    let data: Task[] = JSON.parse(localStorage.getItem("tasks") || "[]");
    setTimeout(() => {
      // setLocalStorageData(data);
      setLoading(false);
    }, 2000);
    const notDone = data.filter((task) => task.completed === false);
    checkNotDoneTask(notDone.length);
  }, []);

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

  return (
    <div className="text-center">
      {confetti && <Confetti width={width} height={height} />}

      <AddTaskForm onAddTask={handleOnAddTask} />

      <h2 className="text-center mb-4 text-2xl">Task List</h2>

      <div className="flex gap-x-3 m-4 justify-center items-center">
        <span
          className={`${
            filter === "all" ? "bg-gray-700 text-white" : "bg-gray-200"
          } px-1.5 py-1 rounded-lg cursor-pointer`}
          onClick={() => setFilter("all")}
        >
          All {filter === "all" && getFilteredTasks().length}
        </span>
        <span
          className={`${
            filter === "not done" ? "bg-gray-700 text-white" : "bg-gray-200"
          } px-1.5 py-1 rounded-lg cursor-pointer`}
          onClick={() => setFilter("not done")}
        >
          Not done {taskList.filter((task) => task.completed === false).length}
        </span>
        <span
          className={`${
            filter === "done" ? "bg-gray-700 text-white" : "bg-gray-200"
          } px-1.5 py-1 rounded-lg cursor-pointer`}
          onClick={() => setFilter("done")}
        >
          Done {taskList.filter((task) => task.completed === true).length}
        </span>
      </div>

      {/* if there are tasklist but notdone = 0,  */}

      {loading ? (
        <Loading />
      ) : (
        <>
          <div>
            <span onClick={handleUnselect}>Unselect all</span>
          </div>
          {getFilteredTasks().length === 0 ? (
            <div className="my-10">Empty</div>
          ) : (
            <ul className="grid grid-cols-2 gap-2 bg-red-500">
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
                        onChange={(e) =>
                          handleEditTask(task.id, e.target.value)
                        }
                        className="p-2 h-11 outline-none"
                      />
                      <MdOutlineDone
                        onClick={() => setEditingTaskId("")}
                        size={25}
                      />
                    </>
                  ) : (
                    <>
                      <li className="flex gap-x-2 p-1">
                        <input
                          type="checkbox"
                          checked={task.completed}
                          className="w-4"
                          onChange={() => handleCheckbox(task.id)}
                        />
                        <span
                          style={{
                            textDecoration: task.completed
                              ? "line-through"
                              : "none",
                          }}
                          onClick={() => handleCheckbox(task.id)}
                          className="text-xl"
                        >
                          {task.title}
                        </span>
                      </li>
                      <div className="flex flex-col gap-y-1">
                        <MdOutlineDeleteForever
                          onClick={() => deleteTask(task.id)}
                          className=""
                          size={25}
                        />
                        <CiEdit
                          onClick={() => setEditingTaskId(task.id)}
                          size={25}
                        />
                      </div>
                    </>
                  )}
                </div>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
};

export default TaskList;
