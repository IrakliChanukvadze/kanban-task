import React, { useContext, useState } from "react";
import { Context } from "../Context/Context";
import { themeToggler } from "../Styles";
import MainColumns from "./MainColumns";

const MainContent = () => {
  const { theme, open, allData, current, columnModalOpener } =
    useContext(Context);
  const { textHeader, Background, Container } = themeToggler();

  return (
    <div
      className={`flex-1 ${
        open
          ? "sm:ml-[33vw] md:ml-[21vw] sm:w-[67vw] md:w-[79vw] px-4"
          : "w-full px-10 m-auto "
      } ${Background}  ${textHeader} flex gap-8 overflow-auto scrollbar-thin ${
        theme === "light"
          ? "scrollbar-track-white scrollbar-thumb-gray-300 "
          : "scrollbar-track-black scrollbar-thumb-gray-500 "
      }   scrollbar-h-20 scrollbar-rounded-8   `}
    >
      {allData
        .filter((item) => item?.name === current)[0]
        .columns.map((item) => (
          <MainColumns key={item?.name} item={item} />
        ))}
      <div
        className={`flex items-center justify-center gap-6 w-[28%] max-h-[80vh] min-w-[250px] mt-6 ${Container} cursor-pointer ${textHeader} font-bold`}
        // onClick={columnModalOpener}
      >
        + add column
      </div>
    </div>
  );
};

export default MainContent;
