import React, { useContext, useEffect, useState } from "react";
import { Context } from "../Context/Context";
import { themeToggler } from "../Styles";
import { BsThreeDotsVertical } from "react-icons/bs";
import AddNewTaskModal from "./Tasks/AddNewTaskModal";
import useModalOpener from "../Hooks/useModalOpener";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import NavForMobileScreen from "./NavForMobileScreen";

const Header = () => {
  const { theme, open, current } = useContext(Context);
  const { Container } = themeToggler();
  const [butText, setButText] = useState("+ add menu task");
  const [navModalOpen, navModalOpener, navModalCloser] = useModalOpener();

  const [taskModal, taskModalOpener, taskModalCloser] = useModalOpener();
  useEffect(() => {
    const resizeListener = () => {
      if (window.innerWidth < 640) {
        setButText("+");
      } else {
        setButText("+ add menu task");
      }
    };
    window.addEventListener("resize", resizeListener);

    return () => {
      window.removeEventListener("resize", resizeListener);
    };
  }, []);

  return (
    <div
      className={`w-full py-2 sm:py-4  xl:py-6 flex items-center ${
        open && "sm:w-[67vw] md:w-[79vw] sm:ml-[33vw]  md:ml-[21vw]"
      } ${
        theme === "light" ? "border-b-[#E4EBFA]" : "border-b-[#3E3F4E]"
      } ${Container} border-b-[1px]  `}
    >
      <NavForMobileScreen open={navModalOpen} close={navModalCloser} />
      <AddNewTaskModal open={taskModal} onClose={taskModalCloser} />
      <div
        className={`px-3 sm:px-4 h-full flex items-center gap-2 sm:gap-4 sm:w-[210px] ${
          theme === "light" ? "border-r-[#E4EBFA]" : "border-r-[#3E3F4E]"
        } ${open && "hidden"} border-r-0 sm:border-r-[1px] `}
      >
        <div className="flex gap-[1px]">
          <div className="w-[6px] h-6 bg-[#635FC7] "></div>
          <div className="w-[6px] h-6 bg-[#635FC7] opacity-75 "></div>
          <div className="w-[6px] h-6 bg-[#635FC7] opacity-50 "></div>
        </div>
        <h2
          className={`hidden sm:block font-bold text-lg sm:text-2xl tracking-[1px] ${
            theme === "light" ? "text-black" : "text-white"
          }`}
        >
          kanban
        </h2>
      </div>
      <div className="flex-1 h-full flex justify-between items-center px-2 sm:px-4">
        <div className="flex gap-2 items-center">
          <h2
            className={`font-bold text-lg ${
              theme === "light" ? "text-black" : "text-white"
            }`}
          >
            {current}
          </h2>
          {navModalOpen ? (
            <IoIosArrowUp
              size={20}
              className="sm:hidden text-[#635FC7] "
              onClick={navModalCloser}
            />
          ) : (
            <IoIosArrowDown
              size={20}
              className="sm:hidden text-[#635FC7] font-bold "
              onClick={navModalOpener}
            />
          )}
        </div>

        <div className="flex justify-between gap-2 sm:gap-4 md:gap-6 items-center">
          <div
            className="py-2 sm:py-4 bg-[#635FC7] px-4 sm:px-6 rounded-[24px] text-white cursor-pointer"
            onClick={taskModalOpener}
          >
            {butText}
          </div>
          <BsThreeDotsVertical className="text-[#828FA3] " size={30} />
        </div>
      </div>
    </div>
  );
};

export default Header;
