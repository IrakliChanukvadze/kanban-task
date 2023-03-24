import { useContext, useState } from "react";
import "./App.css";
import { Context } from "./Context/Context";
import SideBar from "./Components/Navigations/SideBar";
import { themeToggler } from "./Styles";
import { BsEye } from "react-icons/bs";
import BoardModal from "./Components/BoardModals/BoardModal";
import Header from "./Components/Header";
import MainContent from "./Components/MainContent";
import DeleteBoard from "./Components/BoardModals/DeleteBoard";
import AddNewColumn from "./Components/Columns/AddNewColumn";

function App() {
  const { setOpen } = useContext(Context);
  const { Background } = themeToggler();

  return (
    <div className={`h-[100vh] ${Background}`}>
      {/* Modals */}
      <BoardModal />
      <DeleteBoard />
      <AddNewColumn />
      <div
        className={`bg-[#635FC7] text-white hidden absolute left-0 bottom-8 w-16 h-12 rounded-tr-full rounded-br-full sm:flex items-center justify-center cursor-pointer `}
        onClick={() => setOpen(true)}
      >
        <BsEye size={20} className="font-bold" />
      </div>
      <SideBar />
      <div className="flex flex-col h-[100vh]">
        <Header />
        <MainContent />
      </div>
    </div>
  );
}

export default App;
