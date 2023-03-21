import { Modal } from "@mui/material";
import React, { useContext, useState } from "react";
import { Context } from "../../Context/Context";
import { themeToggler } from "../../Styles";

const SubtaskModal = ({ open, close, subtasks, setTaskForm }) => {
  const { Container, textHeader } = themeToggler();
  const { theme } = useContext(Context);
  const [subtaskName, setSubtaskName] = useState("");
  const [error, setError] = useState("");

  const addColumn = () => {
    if (!subtaskName) {
      setError("Name is required");
    } else if (subtasks.some((item) => item.title === subtaskName)) {
      setError("Column already excists");
    } else {
      setTaskForm((prev) => ({
        ...prev,
        subtasks: [
          ...prev.subtasks,
          { title: subtaskName, isCompleted: false },
        ],
      }));
      close();
      setError("");
      setSubtaskName("");
    }
  };

  return (
    <Modal
      open={open}
      onClose={() => {
        close();
        setError("");
        setSubtaskName("");
      }}
    >
      <div
        className={`absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] ${Container} w-[90vw] max-w-[480px] py-10 border-2`}
      >
        <h2 className={`text-center mb-4 ${textHeader}`}>Add new Column</h2>
        <div className="w-[87%] m-auto">
          <input
            type="text"
            className="w-full  p-2 border-2 rounded-lg"
            value={subtaskName}
            onChange={(e) => setSubtaskName(e.target.value)}
            placeholder="Subtask name"
          />
        </div>
        {error && (
          <p className="text-red-500 text-sm mt-4 text-center ">{error}</p>
        )}
        <div
          className={`w-[40%] m-auto py-2 border-2 rounded-lg ${
            theme === "light" ? "bg-[#EFEFF9]" : "bg-white"
          } text-[#635FC7] cursor-pointer flex justify-center mt-4`}
          onClick={addColumn}
        >
          Add Column
        </div>
      </div>
    </Modal>
  );
};

export default SubtaskModal;
