import React, { useState } from "react";
import data from "../Data/data.json";
import useModalOpener from "../Hooks/useModalOpener";

const Context = React.createContext();

const ContextProvider = (props) => {
  const [open, setOpen] = React.useState(false); // for side bar
  const [theme, setTheme] = useState("light");
  const [allData, setAllData] = useState(data.boards);
  const [current, setCurrent] = useState(allData[0].name);
  const [column, setColumn] = useState("");
  const [boardModal, boardModalOpener, boardModalCloser] = useModalOpener();
  const [deleteBoardModal, deleteBoardModalOpener, deleteBoardModalCloser] =
    useModalOpener();
  const [task, setTask] = useState({
    title: "",
    description: "",
    subtasks: [],
  });
  const [EditTaskOpen, handleEditTaskOpen, handleEditTaskClose] =
    useModalOpener();

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
        EditTaskOpen,
        handleEditTaskOpen,
        handleEditTaskClose,
        task,
        setTask,
        column,
        setColumn,
        deleteBoardModal,
        deleteBoardModalOpener,
        deleteBoardModalCloser,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export { ContextProvider, Context };
