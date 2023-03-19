import React, { useState } from "react";
import data from "../Data/data.json";
import useModalOpener from "../Hooks/useModalOpener";

const Context = React.createContext();

const ContextProvider = (props) => {
  const [open, setOpen] = React.useState(false);
  const [theme, setTheme] = useState("light");
  const [allData, setAllData] = useState(data.boards);
  const [current, setCurrent] = useState("Platform Launch");
  const [boardModal, boardModalOpener, boardModalCloser] = useModalOpener();

  const toggleDrawer = (open) => (event) => {
    setOpen(open);
  };

  return (
    <Context.Provider
      value={{
        toggleDrawer,
        setOpen,
        open,
        theme,
        setTheme,
        allData,
        setAllData,
        current,
        setCurrent,
        boardModal,
        boardModalOpener,
        boardModalCloser,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export { ContextProvider, Context };
