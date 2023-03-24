import { Modal, Select, MenuItem } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../Context/Context";
import useModalOpener from "../../Hooks/useModalOpener";
import { themeToggler } from "../../Styles";
import SubtaskModal from "./SubtaskModal";

const AddNewTaskModal = ({ open, onClose }) => {
  const { textHeader, Container } = themeToggler();
  const { current, theme, allData, setAllData } = useContext(Context);
  const [error, setError] = useState("");
  const [subtaskOpen, handleSubtaskOpener, handleSubtaskCloser] =
    useModalOpener();
  const [taskForm, setTaskForm] = useState({
    title: "",
    description: "",
    subtasks: [
      { title: "Sign in page", isCompleted: false },
      { title: "Welcome page", isCompleted: false },
    ],
  });
  const currentBoardColumns = allData.filter((item) => item.name === current)[0]
    .columns;

  const [status, setStatus] = useState(currentBoardColumns[0].name);

  useEffect(() => {
    setStatus(currentBoardColumns[0].name);
  }, [current]);

  const addTask = () => {
    const curBoard = allData.filter((item) => item.name === current);
    const curColumn = curBoard[0].columns.filter(
      (item) => item.name === status
    );

    if (!taskForm.title) {
      setError("required");
    } else if (
      curColumn[0].tasks.some(
        (item) => item.title.toLowerCase() === taskForm.title.toLowerCase()
      )
    ) {
      setError("Task already exists");
    } else {
      setAllData((prev) => {
        return prev.map((item) => {
          if (current === item.name) {
            const newColumns = item.columns.map((column) => {
              if (column.name === status) {
                return { ...column, tasks: [...column.tasks, { ...taskForm }] };
              } else return column;
            });

            return { ...item, columns: [...newColumns] };
          } else {
            return item;
          }
        });
      });
      onClose();
      setError("");
      setTaskForm({
        title: "",
        description: "",
        subtasks: [
          { title: "Sign in page", isCompleted: false },
          { title: "Welcome page", isCompleted: false },
        ],
      });
    }
  };

  return (
    <Modal
      open={open}
      onClose={() => {
        onClose();
        setError("");
        setTaskForm({
          title: "",
          description: "",
          subtasks: [
            { title: "Sign in page", isCompleted: false },
            { title: "Welcome page", isCompleted: false },
          ],
        });
      }}
    >
      <div
        className={`absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] ${textHeader} ${Container} w-[90vw]  max-w-[480px] max-h-[90vh]`}
      >
        <SubtaskModal
          open={subtaskOpen}
          close={handleSubtaskCloser}
          subtasks={taskForm.subtasks}
          setTaskForm={setTaskForm}
        />
        <div className="w-[87%] m-auto py-8 ">
          <h2 className={` font-bold mb-6 text-[18px] leading-6`}>
            Add New Task
          </h2>
          <div className="flex gap-3 items-center">
            <h3 className={`${textHeader}`}>Task Name</h3>
            {error === "required" && (
              <p className="text-red-500 text-xs">{error}</p>
            )}
          </div>

          <input
            type="text"
            name="boardName"
            className={`w-full rounded border-[1px] border-[#828FA3]  pl-4 py-2 mt-1 mb-6 bg-transparent`}
            placeholder="e.g. Take Cofee break"
            value={taskForm.title}
            onChange={(e) =>
              setTaskForm((prev) => ({ ...prev, title: e.target.value }))
            }
          />
          <h3 className={`${textHeader}`}>Description</h3>
          <textarea
            type="text"
            name="boardName"
            className={`w-full rounded border-[1px] border-[#828FA3]  pl-4 py-2 mt-1 mb-6 bg-transparent max-h-[20vh]`}
            placeholder="e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little."
            value={taskForm.description}
            onChange={(e) =>
              setTaskForm((prev) => ({ ...prev, description: e.target.value }))
            }
          />
          <h3 className={`${textHeader}`}>Subtasks</h3>
          <div className=" overflow-auto max-h-[40vh]">
            {taskForm.subtasks.map((item, index) => (
              <div key={item.title} className="flex items-center gap-4 mb-3 ">
                <div
                  className={`flex-1 flex items-center pl-4 py-2  rounded border-[1px] border-[#828FA3]  bg-transparent `}
                >
                  {item.title}
                </div>

                <h2
                  className="text-[#828FA3] cursor-pointer text-xl"
                  onClick={() => {
                    setTaskForm((prev) => ({
                      ...prev,
                      subtasks: prev.subtasks.filter(
                        (name) => name.title !== item.title
                      ),
                    }));
                  }}
                >
                  X
                </h2>
              </div>
            ))}
          </div>
          <div
            className={`flex justify-center w-full rounded-[20px] mt-3 py-2 ${
              theme === "light" ? "bg-[#EFEFF9]" : "bg-white"
            } text-[#635FC7] cursor-pointer`}
            onClick={handleSubtaskOpener}
          >
            + Add New Subtask
          </div>
          <h3 className={`${textHeader} mt-4`}>Status</h3>
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
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            {currentBoardColumns.map((item) => (
              <MenuItem key={item.name} value={item.name}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
          <div
            className={`flex justify-center w-full rounded-[20px] py-2 bg-[#635FC7] text-white cursor-pointer mt-6`}
            onClick={addTask}
          >
            Save Changes
          </div>
          {error === "Task already exists" && (
            <p className="text-red-500 text-xs my-1 text-center">{error}</p>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default AddNewTaskModal;
