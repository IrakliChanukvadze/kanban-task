import { Modal } from "@mui/material";
import React, { useContext } from "react";
import { Context } from "../../Context/Context";
import { themeToggler } from "../../Styles";

const DeleteBoard = () => {
  const { Container, textHeader } = themeToggler();
  const {
    deleteBoardModal,
    deleteBoardModalCloser,
    allData,
    setAllData,
    current,
    setCurrent,
  } = useContext(Context);
  const deleteBoard = () => {
    setCurrent(allData.filter((item) => item.name !== current)[0].name);
    setAllData((prev) => prev.filter((item) => item.name !== current));
    deleteBoardModalCloser();
  };
  return (
    <Modal open={deleteBoardModal} onClose={deleteBoardModalCloser}>
      <div
        className={`absolute top-[50%] -translate-x-[50%] left-[50%] -translate-y-[50%] ${Container} py-14 px-6`}
      >
        <h2 className={`text-center mb-4 ${textHeader} font-bold`}>
          Delete board?{" "}
        </h2>
        <button
          className={`flex justify-center w-full rounded-[20px] py-2 bg-[#635FC7] text-white cursor-pointer mt-6`}
          onClick={deleteBoard}
        >
          Delete
        </button>
      </div>
    </Modal>
  );
};

export default DeleteBoard;
