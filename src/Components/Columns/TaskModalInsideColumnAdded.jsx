import { Modal } from "@mui/material";
import React, { useState } from "react";
import useModalOpener from "../../Hooks/useModalOpener";
import { themeToggler } from "../../Styles";
import SubtaskModal from "../Tasks/SubtaskModal";

const TaskModalInsideColumnAdded = ({
  open,
  close,
  theme,
  tasks,
  setFormText,
}) => {
  const { Container, textHeader } = themeToggler();
  const [error, setError] = useState();
  const [subtaskOpen, subTaskOpener, subTaskCloser] = useModalOpener();
  const [taskForm, setTaskForm] = useState({
    title: "",
    description: "",
    subtasks: [{ title: "subtask1", isCompleted: false }],
  });

  const addTask = () => {
    if (!taskForm.title) {
      setError("Name is required");
    } else if (tasks.some((item) => item.title === taskForm.title)) {
      setError("Task already exists");
    } else {
      console.log(taskForm);
      setFormText((prev) => ({
        ...prev,
        tasks: [
          ...prev.tasks,
          {
            ...taskForm,
          },
        ],
      }));
      close();
      setError("");
      setTaskForm({
        title: "",
        description: "",
        subtasks: [{ title: "subtask1", isCompleted: false }],
      });
    }
  };
  return (
    <Modal
      open={open}
      onClose={() => {
        close();
        setError("");
        setTaskName("");
      }}
    >
      <div
        className={`absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] ${Container} w-[90vw] max-w-[480px] py-10 border-2`}
      >
        <SubtaskModal
          open={subtaskOpen}
          close={subTaskCloser}
          subtasks={taskForm.subtasks}
          setTaskForm={setTaskForm}
        />
        <h2 className={`text-center mb-4 ${textHeader}`}>Add new Task</h2>
        <div className="w-[87%] m-auto">
          <h3 className={`mt-4`}>Task name</h3>
          <input
            type="text"
            className="w-full  p-2 border-2 rounded-lg mt-1"
            value={taskForm.title}
            onChange={(e) =>
              setTaskForm((prev) => ({ ...prev, title: e.target.value }))
            }
            placeholder="Task name"
          />
          {error && (
            <p className="text-red-500 text-sm mt-4 text-center ">{error}</p>
          )}
          <h3 className={`mt-4`}>Description</h3>
          <textarea
            type="text"
            name="boardName"
            className={`w-full rounded border-[1px] border-[#828FA3]  pl-4 py-2 mt-1  bg-transparent max-h-[20vh]`}
            placeholder="e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little."
            value={taskForm.description}
            onChange={(e) =>
              setTaskForm((prev) => ({ ...prev, description: e.target.value }))
            }
          />
          <div className=" overflow-auto max-h-[40vh]">
            <h3 className={`mt-4 mb-1`}>Subtasks</h3>
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
            onClick={subTaskOpener}
          >
            + Add New Subtask
          </div>
        </div>
        <div
          className={`w-[40%] m-auto py-2 border-2 rounded-lg ${
            theme === "light" ? "bg-[#EFEFF9]" : "bg-white"
          } text-[#635FC7] cursor-pointer flex justify-center mt-4`}
          onClick={addTask}
        >
          Add Task
        </div>
      </div>
    </Modal>
  );
};

export default TaskModalInsideColumnAdded;
