import React, { useContext } from "react";
import { Context } from "../Context/Context";
import { themeToggler } from "../Styles";
import { BsThreeDotsVertical } from "react-icons/bs";
import AddNewTaskModal from "./Tasks/AddNewTaskModal";
import useModalOpener from "../Hooks/useModalOpener";

const Header = () => {
  const { theme, open, current } = useContext(Context);
  const { Container } = themeToggler();

  const [taskModal, taskModalOpener, taskModalCloser] = useModalOpener();

  return (
    <div
      className={`w-full h-15 md:h-16 xl:h-24 flex ${
        open && "sm:w-[67vw] md:w-[79vw] sm:ml-[33vw]  md:ml-[21vw]"
      } ${
        theme === "light" ? "border-b-[#E4EBFA]" : "border-b-[#3E3F4E]"
      } ${Container} border-b-[1px]  `}
    >
      <AddNewTaskModal open={taskModal} onClose={taskModalCloser} />
      <div
        className={`px-6 h-full flex items-center gap-4 w-[210px] ${
          theme === "light" ? "border-r-[#E4EBFA]" : "border-r-[#3E3F4E]"
        } ${open && "hidden"} border-r-[1px] `}
      >
        <div className="flex gap-[1px]">
          <div className="w-[6px] h-6 bg-[#635FC7] "></div>
          <div className="w-[6px] h-6 bg-[#635FC7] opacity-75 "></div>
          <div className="w-[6px] h-6 bg-[#635FC7] opacity-50 "></div>
        </div>
        <h2
          className={`font-bold text-2xl tracking-[1px] ${
            theme === "light" ? "text-black" : "text-white"
          }`}
        >
          kanban
        </h2>
      </div>
      <div className="flex-1 h-full flex justify-between items-center px-8">
        <h2
          className={`font-bold text-lg ${
            theme === "light" ? "text-black" : "text-white"
          }`}
        >
          {current}
        </h2>
        <div className="flex justify-between gap-4 md:gap-6 items-center">
          <div
            className="py-4 bg-[#635FC7] px-6 rounded-[24px] text-white cursor-pointer"
            onClick={taskModalOpener}
          >
            + add menu task
          </div>
          <BsThreeDotsVertical className="text-[#828FA3]" size={30} />
        </div>
      </div>
    </div>
  );
};

export default Header;
