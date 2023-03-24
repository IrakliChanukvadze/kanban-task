import { Button, Drawer } from "@mui/material";
import React, { useContext } from "react";
import { Context } from "../../Context/Context";
import { themeToggler } from "../../Styles";
import { BsMoonStarsFill, BsFillSunFill, BsEyeSlash } from "react-icons/bs";
import { TbLayoutBoardSplit } from "react-icons/tb";

const SideBar = () => {
  const {
    open,
    setOpen,
    toggleDrawer,
    theme,
    setTheme,
    allData,
    current,
    setCurrent,
    boardModalOpener,
  } = useContext(Context);
  const { Container, Background } = themeToggler();

  return (
    <div className="">
      <React.Fragment key={"left"}>
        <Drawer
          PaperProps={{
            sx: {
              borderRight: `1px solid ${
                theme === "light" ? "#E4EBFA" : "#3E3F4E"
              }`,
            },
          }}
          anchor={"left"}
          open={open}
          onClose={() => {
            setOpen(false);
          }}
          variant="persistent"
        >
          {
            <div
              className={`h-full w-0 sm:w-[33vw] md:w-[21vw] ${Container} relative text-[#828FA3] `}
            >
              <div
                className={`py-4 sm:py-6 xl:py-8 m-auto flex items-center gap-4 w-[84%]  `}
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
              <div className=" flex flex-col font-bold">
                <div className="flex items-center h-12 pl-[8%] mt-4 mb-1 text-xs">
                  <h2 className="tracking-[2px]">
                    ALL BOARDS ({allData.length})
                  </h2>
                </div>

                {allData.map((item) => (
                  <div
                    key={item.name}
                    onClick={() => setCurrent(item.name)}
                    className={`w-[92%] gap-4 pl-[8%] rounded-r-full  h-12 flex items-center text-[15px] cursor-pointer ${
                      current === item.name && "bg-[#635FC7]"
                    } ${
                      current === item.name ? "text-white" : "text-[#828FA3]"
                    } ${
                      current !== item.name &&
                      (theme === "light"
                        ? "hover:bg-[#EFEFF9]"
                        : "hover:bg-white")
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
                className={`absolute left-[50%] -translate-x-[50%] bottom-8 w-[84%] m-auto flex items-center gap-4 2xl:gap-6 cursor-pointer`}
              >
                <BsEyeSlash
                  onClick={toggleDrawer(false)}
                  size={25}
                  className="cursor-pointer scale-[85%] 2xl:scale-100"
                />
                <p
                  onClick={toggleDrawer(false)}
                  className="cursor-pointer font-bold text-sm 2xl:text-lg"
                >
                  Hide Sidebar
                </p>
              </div>
              <div
                className={`flex gap-4 py-[14px] items-center justify-center absolute w-[84%] m-auto bottom-20 left-[50%] -translate-x-[50%] ${Background} rounded-md`}
              >
                <BsFillSunFill
                  size={25}
                  className=" scale-[85%] 2xl:scale-100"
                />
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
                <BsMoonStarsFill
                  size={25}
                  className=" scale-[85%] 2xl:scale-100"
                />
              </div>
            </div>
          }
        </Drawer>
      </React.Fragment>
    </div>
  );
};

export default SideBar;
