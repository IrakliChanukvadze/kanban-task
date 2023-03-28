import React, { useContext, useState } from "react";
import { themeToggler } from "../../Styles";
import { RiDeleteBin6Line, RiDeleteBin6Fill } from "react-icons/ri";
import { Context } from "../../Context/Context";
import { useDrag } from "react-dnd";

const TaskContainer = ({ task, colName }) => {
  const { Container } = themeToggler();
  const { setAllData, current, handleEditTaskOpen, setTask, setColumn } =
    useContext(Context);
  const [hovered, setHovered] = useState(false);
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id: task.title, column: colName, task: task },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const deleteTask = () => {
    setAllData((prev) => {
      const curBoard = prev.filter((item) => item.name === current);

      return prev.map((board) => {
        if (board.name === curBoard[0].name) {
          const filtered = curBoard[0].columns.map((column) => {
            const filterdTasks = column.tasks.filter(
              (t) => t.title !== task.title
            );
            return { name: column.name, tasks: [...filterdTasks] };
          });
          return { name: curBoard[0].name, columns: [...filtered] };
        } else return board;
      });
    });
  };
  return (
    <div
      ref={drag}
      className={`flex flex-col gap-6 ${Container} py-2 px-4 relative cursor-pointer ${
        isDragging && "opacity-30"
      }`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <RiDeleteBin6Line
        className={`absolute bottom-4 right-4 cursor-pointer z-30 ${
          !hovered && "hidden"
        }`}
        onClick={() => {
          deleteTask();
        }}
      />
      <div
        onClick={() => {
          handleEditTaskOpen();
          setTask(task);
          setColumn(colName);
        }}
      >
        <h2 className="font-bold">{task?.title}</h2>
        <h2 className="text-[#828FA3]">
          Subtasks{" "}
          {task?.subtasks.filter((subTask) => subTask.isCompleted).length}/
          {task?.subtasks.length}
        </h2>
      </div>
    </div>
  );
};

export default TaskContainer;
