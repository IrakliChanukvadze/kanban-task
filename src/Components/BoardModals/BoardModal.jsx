import { Modal } from "@mui/material";
import React, { useContext, useState } from "react";
import { Context } from "../../Context/Context";
import { themeToggler } from "../../Styles";
import { GrClose } from "react-icons/gr";
import NewColumnModal from "./NewColumnModal";
import useModalOpener from "../../Hooks/useModalOpener";

const BoardModal = () => {
  const { Container, textHeader } = themeToggler();
  const { boardModal, boardModalCloser, theme, allData, setAllData } =
    useContext(Context);
  const [columnModal, columnModalOpener, columnModalCloser] = useModalOpener();

  const [error, setError] = useState("");
  const [formText, setFormText] = useState({
    boardName: "",
    columns: ["todo", "doing", "done"],
  });

  const addFormText = (e) => {
    const { name, value } = e.target;
    setFormText((prev) => ({ ...prev, [name]: value }));
  };

  const addBoard = () => {
    if (allData.some((item) => item.name === formText.boardName)) {
      setError("Board already excists");
    } else if (!formText.boardName) {
      setError("Please fill board name");
    } else if (!formText.columns.length) {
      setError("Please add at least one column");
    } else {
      setAllData((prev) => [
        ...prev,
        {
          name: formText.boardName,
          columns: [
            ...formText.columns.map((item) => ({ name: item, tasks: [] })),
          ],
        },
      ]);
      boardModalCloser();
      setFormText({
        boardName: "",
        columns: ["todo", "doing", "done"],
      });
      setError("");
    }
  };

  return (
    <Modal open={boardModal} onClose={boardModalCloser}>
      <div
        className={`absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] ${textHeader} ${Container} w-[90vw] max-w-[480px]`}
      >
        <NewColumnModal
          open={columnModal}
          close={columnModalCloser}
          setFormText={setFormText}
          columns={formText.columns}
        />
        <div className="w-[87%] m-auto py-8 ">
          <h2 className={` font-bold mb-6 text-[18px] leading-6`}>
            Add New Board
          </h2>
          <h3 className={`${textHeader}`}>Board Name</h3>
          <input
            type="text"
            name="boardName"
            className={`w-full rounded border-[1px] border-[#828FA3]  pl-4 py-2 mt-2 mb-6 bg-transparent`}
            placeholder="e.g. Web Design"
            value={formText.boardName}
            onChange={addFormText}
          />
          <h3 className={` mb-2`}>Board Columns</h3>
          <div className=" overflow-auto max-h-[40vh]">
            {formText.columns.map((item, index) => (
              <div key={item} className="flex items-center gap-4 mb-3 ">
                <div
                  className={`flex-1 flex items-center pl-4 py-2  rounded border-[1px] border-[#828FA3]  bg-transparent `}
                >
                  {item}
                </div>

                <h2
                  className="text-[#828FA3] cursor-pointer text-xl"
                  onClick={() => {
                    setFormText((prev) => ({
                      ...prev,
                      columns: prev.columns.filter((name) => name !== item),
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
            onClick={columnModalOpener}
          >
            + Add New Column
          </div>

          <div
            className={`flex justify-center w-full rounded-[20px] py-2 bg-[#635FC7] text-white cursor-pointer mt-6`}
            onClick={addBoard}
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

export default BoardModal;
