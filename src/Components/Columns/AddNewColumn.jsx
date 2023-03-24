import { Modal } from "@mui/material";
import React, { useContext, useState } from "react";
import { Context } from "../../Context/Context";
import useModalOpener from "../../Hooks/useModalOpener";
import { themeToggler } from "../../Styles";
import TaskModalInsideColumnAdded from "./TaskModalInsideColumnAdded";

const AddNewColumn = () => {
  const { textHeader, Container } = themeToggler();
  const {
    newColumnModal,
    newColumnModalCloser,
    theme,
    allData,
    setAllData,
    current,
  } = useContext(Context);
  const [taskModal, taskModalOpener, taskModalCloser] = useModalOpener();
  const [error, setError] = useState("");
  const [formText, setFormText] = useState({
    name: "",
    tasks: [
      {
        title: "task1",
        description: "s",
        subtasks: [{ title: "subtask1", isCompleted: false }],
      },
    ],
  });

  const addColumn = () => {
    const currentBoard = allData.filter((item) => item.name === current);
    if (!formText.name) {
      setError("Name is required");
    } else if (
      currentBoard[0].columns.some(
        (item) => item.name.toLowerCase() === formText.name.toLowerCase()
      )
    ) {
      console.log("entered");
      setError("Column already exists");
    } else {
      setError("");
      setAllData((prev) =>
        prev.map((board) => {
          if (board.name === current) {
            console.log(board.columns);
            return {
              ...board,
              columns: [
                ...board.columns,
                { name: formText.name, tasks: [...formText.tasks] },
              ],
            };
          } else return board;
        })
      );
      setFormText({
        name: "",
        tasks: [
          {
            title: "task1",
            description: "s",
            subtasks: [{ title: "subtask1", isCompleted: false }],
          },
        ],
      });
      newColumnModalCloser();
    }
  };
  return (
    <Modal
      open={newColumnModal}
      onClose={() => {
        newColumnModalCloser();
        setError("");
        setFormText({
          name: "",
          tasks: [
            {
              title: "task1",
              description: "s",
              subtasks: [{ title: "subtask1", isCompleted: false }],
            },
          ],
        });
      }}
    >
      <div
        className={`absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] ${textHeader} ${Container} w-[90vw] max-w-[480px] `}
      >
        <TaskModalInsideColumnAdded
          open={taskModal}
          close={taskModalCloser}
          theme={theme}
          tasks={formText.tasks}
          setFormText={setFormText}
        />
        <div className="w-[87%] m-auto py-8">
          <h2 className={` font-bold mb-6 text-[18px] leading-6`}>
            Add New Column {error}
          </h2>
          <h3 className={`mb-2`}>Column Name</h3>
          <input
            type="text"
            name="boardName"
            className={`w-full rounded border-[1px] border-[#828FA3]  pl-4 py-2  mb-6 bg-transparent`}
            placeholder="e.g. Web Design"
            value={formText.name}
            onChange={(e) =>
              setFormText((prev) => ({ ...prev, name: e.target.value }))
            }
          />

          <h3 className={`mb-2`}>Tasks</h3>
          <div className=" overflow-auto max-h-[40vh]">
            {formText.tasks.map((item, index) => (
              <div key={item.title} className="flex items-center gap-4 mb-3 ">
                <div
                  className={`flex-1 flex items-center pl-4 py-2  rounded border-[1px] border-[#828FA3]  bg-transparent `}
                >
                  {item.title}
                </div>

                <h2
                  className="text-[#828FA3] cursor-pointer text-xl"
                  onClick={() => {
                    setFormText((prev) => ({
                      ...prev,
                      tasks: prev.tasks.filter(
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
            onClick={taskModalOpener}
          >
            + Add New task
          </div>
          <div
            className={`flex justify-center w-full rounded-[20px] py-2 bg-[#635FC7] text-white cursor-pointer mt-6`}
            onClick={addColumn}
          >
            Save Changes
          </div>
          {error && (
            <p className="text-red-500 text-sm mt-1 text-center ">{error}</p>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default AddNewColumn;
