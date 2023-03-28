import React, { useContext, useState } from "react";
import { Context } from "../../Context/Context";
import EditTaskModal from "../Tasks/EditTaskModal";
import TaskContainer from "../Tasks/TaskContainer";
import { RiDeleteBin6Line, RiDeleteBin6Fill } from "react-icons/ri";
import { useDrop } from "react-dnd";

const MaincColumns = ({ item }) => {
  const { theme, allData, setAllData, current, deleteBoardModalOpener } =
    useContext(Context);
  const [hovered, setHovered] = useState(false);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item) => {
      dropItem(item.id, item.column, item.task);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const dropItem = (id, startColumn, taskObj) => {
    if (startColumn !== item.name) {
      setAllData((prev) =>
        prev.map((board) => {
          if (board.name === current) {
            const columns = board.columns.map((column) => {
              if (column.name === startColumn) {
                const tasks = column.tasks.filter((task) => task.title !== id);
                return { ...column, tasks: tasks };
              } else if (column.name === item.name) {
                const tasks = [...column.tasks, { ...taskObj }];
                return { ...column, tasks: tasks };
              } else return column;
            });
            return { ...board, columns: columns };
          } else return board;
        })
      );
    }
  };

  const deleteColumn = () => {
    if (allData.filter((item) => item.name === current)[0].columns.length > 1) {
      setAllData((prev) =>
        prev.map((board) => {
          if (board.name === current) {
            const filtered = board.columns.filter(
              (columns) => columns.name !== item.name
            );
            return { ...board, columns: filtered };
          }
          return board;
        })
      );
    } else {
      console.log("clicked");
      deleteBoardModalOpener();
    }
  };
  return (
    <div
      ref={drop}
      className={`flex flex-col gap-6 w-[28%] max-h-[80vh] min-w-[250px] mt-6   `}
    >
      <EditTaskModal />
      <div className="flex w-full justify-between items-center pr-5">
        <div className="flex gap-4 items-center ">
          <div className="h-4 aspect-square bg-purple-700 rounded-full"></div>
          <h2 className="font-bold text-[#828FA3]">
            {item.name} ({item.tasks.length})
          </h2>
        </div>
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={deleteColumn}
        >
          {hovered ? (
            <RiDeleteBin6Fill size={20} />
          ) : (
            <RiDeleteBin6Line size={20} />
          )}
        </div>
      </div>

      <div
        className={`flex flex-col gap-6 overflow-auto scrollbar-thin ${
          theme === "light"
            ? "scrollbar-track-white scrollbar-thumb-gray-300 "
            : "scrollbar-track-black scrollbar-thumb-gray-500 "
        }   scrollbar-h-20 scrollbar-rounded-8 pr-6`}
      >
        {item?.tasks?.map((task) => (
          <TaskContainer key={task.title} task={task} colName={item.name} />
        ))}
      </div>
    </div>
  );
};

export default MaincColumns;
