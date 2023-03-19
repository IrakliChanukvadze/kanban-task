import React, { useContext } from "react";
import { Context } from "../Context/Context";

export const themeToggler = () => {
  const { theme } = useContext(Context);
  const Background = theme === "light" ? "bg-[#F4F7FD]" : "bg-[#1F212C]";

  const Container = theme === "light" ? "bg-[#fff]" : "bg-[#2A2C37]";

  const textHeader = theme === "light" ? "text-black" : "text-white";

  return { Container, Background, textHeader };
};
