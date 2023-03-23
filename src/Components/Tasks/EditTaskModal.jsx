import { Modal, Select, MenuItem } from "@mui/material";
import React, { useContext, useState } from "react";
import { Context } from "../../Context/Context";
import { themeToggler } from "../../Styles";

const EditTaskModal = () => {
  const {
    EditTaskOpen,
    handleEditTaskClose,
    task,
    current,
    column,
    setColumn,
    allData,
    setAllData,
    theme,
  } = useContext(Context);
  const { Container, textHeader, Background } = themeToggler();
  const [curCol, setCurCol] = useState("");

  const changeSubtaskStatus = (index) => {
    setAllData((prev) =>
      prev.map((board) => {
        if (board.name === current) {
          const mapedInsideBoard = board.columns.map((col) => {
            if (col.name === column) {
              const mapedInsideColumn = col.tasks.map((ta) => {
                if (ta.title === task.title) {
                  const maptedInsideSubtask = ta.subtasks.map((subT, ind) => {
                    if (ind === index) {
                      return { ...subT, isCompleted: !subT.isCompleted };
                    } else return { ...subT };
                  });
                  return { ...ta, subtasks: [...maptedInsideSubtask] };
                } else return ta;
              });

              return { ...col, tasks: [...mapedInsideColumn] };
            }
            return col;
          });
          return { ...board, columns: [...mapedInsideBoard] };
        }
        return board;
      })
    );
  };

  const changeStatus = (e) => {
    setCurCol(e.target.value);
  };

  const close = () => {
    handleEditTaskClose();
    if (curCol !== column && curCol) {
      setAllData((prev) => {
        const col = prev.filter((item) => item.name === current);

        const changed = col[0].columns.map((item) => {
          if (item.name === column) {
            const filtered = item.tasks.filter((ta) => ta.title !== task.title);
            return { ...item, tasks: [...filtered] };
          } else if (item.name === curCol) {
            console.log({ ...item, tasks: [...item.tasks, task] }, "ss");
            return { ...item, tasks: [...item.tasks, task] };
          } else {
            return item;
          }
        });
        return prev.map((boards) => {
          if (boards.name === current) {
            return { ...boards, columns: [...changed] };
          } else return boards;
        });
      });
    }
    setCurCol("");
  };

  const currentColumn = allData
    .filter((item) => item.name === current)[0]
    ?.columns.filter((col) => col.name === column)[0];

  const currentTask =
    currentColumn?.tasks.filter((item) => item.title === task.title) || [];

  const currentBoardColumns = allData.filter((item) => item.name === current)[0]
    ?.columns;

  return (
    <Modal open={EditTaskOpen} onClose={close}>
      <div
        className={`absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] ${Container} w-[90vw] max-w-[480px] py-10 px-5 border-2`}
      >
        <h2 className={`${textHeader} font-bold mb-6`}>{task.title}</h2>
        <h3 className="text-[#828FA3] mb-6 font-medium">{task.description}</h3>
        <h3 className="text-[#828FA3] mb-4 font-bold">
          Subtasks: (
          {currentTask[0]?.subtasks?.filter((item) => item.isCompleted).length}{" "}
          of {task?.subtasks.length})
        </h3>

        {task?.subtasks?.map((item, index) => (
          <div
            key={item.title}
            className={`flex gap-2 items-center p-3 mb-2 ${Background}`}
          >
            <input
              type="checkbox"
              checked={
                currentColumn?.tasks.filter((ta) => ta.title === task.title)[0]
                  ?.subtasks[index].isCompleted
              }
              onChange={(e) => {
                changeSubtaskStatus(index);
                console.log(currentColumn, "cur");
              }}
            />
            <h2
              className={`${textHeader} ${
                currentColumn?.tasks.filter((ta) => ta.title === task.title)[0]
                  ?.subtasks[index].isCompleted && "opacity-50 line-through"
              }`}
            >
              {item.title}
            </h2>
          </div>
        ))}
        <h2
          className={`${
            theme === "light" ? "text-[#828FA3]" : "text-white"
          } font-bold mt-6 mb-2`}
        >
          Current Status
        </h2>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          MenuProps={{
            PaperProps: {
              sx: {
                color: theme === "light" ? "#000" : "#fff",
                bgcolor: theme === "light" ? "#F4F7FD" : "#1F212C",
              },
            },
          }}
          sx={{
            width: "100%",
            height: "40px",
            color: theme === "light" ? "black" : "white",
          }}
          value={curCol || column}
          onChange={changeStatus}
        >
          {currentBoardColumns.map((item) => (
            <MenuItem key={item.name} value={item.name}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </div>
    </Modal>
  );
};

export default EditTaskModal;
