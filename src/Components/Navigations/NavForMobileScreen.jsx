import { Modal } from "@mui/material";
import React, { useContext } from "react";
import { Context } from "../../Context/Context";
import { themeToggler } from "../../Styles";
import { TbLayoutBoardSplit } from "react-icons/tb";
import { BsMoonStarsFill, BsFillSunFill } from "react-icons/bs";

const NavForMobileScreen = ({ open, close }) => {
  const { Container, Background } = themeToggler();
  const { allData, current, setCurrent, boardModalOpener, theme, setTheme } =
    useContext(Context);

  return (
    <Modal open={open} onClose={close}>
      <div
        className={`absolute sm:hidden w-[70vw] top-20 left-[50%] -translate-x-[50%] ${Container} py-10 text-[#828FA3]`}
      >
        <div className=" flex flex-col font-bold">
          <div className="flex items-center h-12 pl-[8%] mt-4 mb-1 text-xs">
            <h2 className="tracking-[2px]">ALL BOARDS ({allData.length})</h2>
          </div>

          {allData.map((item) => (
            <div
              key={item.name}
              onClick={() => setCurrent(item.name)}
              className={`w-[92%] gap-4 pl-[8%] rounded-r-full  h-12 flex items-center text-[15px] cursor-pointer ${
                current === item.name && "bg-[#635FC7]"
              } ${current === item.name ? "text-white" : "text-[#828FA3]"} ${
                current !== item.name &&
                (theme === "light" ? "hover:bg-[#EFEFF9]" : "hover:bg-white")
              }`}
            >
              <TbLayoutBoardSplit size={25} />
              <h2 className="tracking-[1px]">{item.name}</h2>
            </div>
          ))}
          <div className="flex items-center gap-4 h-12 pl-[8%] text-[15px] text-[#635FC7]">
            <TbLayoutBoardSplit size={25} />
            <h2
              className="tracking-[1px] cursor-pointer"
              onClick={boardModalOpener}
            >
              + Create New Board
            </h2>
          </div>
        </div>
        <div
          className={`flex gap-4 mt-8 py-[14px] items-center justify-center w-[84%] m-auto  ${Background} rounded-md`}
        >
          <BsFillSunFill size={25} className=" scale-[85%] 2xl:scale-100" />
          <div
            className="bg-[#635FC7] relative w-10 h-5 2xl:w-16 2xlh-7 rounded-[20px] cursor-pointer"
            onClick={() =>
              setTheme((prev) => (prev === "light" ? "dark" : "light"))
            }
          >
            <div
              className={`absolute bg-white rounded-full w-4 h-4 2xlw-6 2xlh-6 top-[50%] -translate-y-[50%]  ${
                theme === "light" ? "left-1" : "right-1"
              }`}
            ></div>
          </div>{" "}
          <BsMoonStarsFill size={25} className=" scale-[85%] 2xl:scale-100" />
        </div>
      </div>
    </Modal>
  );
};

export default NavForMobileScreen;
