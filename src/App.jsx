import { useContext, useState } from "react";
import "./App.css";
import { Context } from "./Context/Context";
import SideBar from "./Components/SideBar";
import { themeToggler } from "./Styles";
import { BsEye } from "react-icons/bs";
import BoardModal from "./Components/BoardModal";
import Header from "./Components/Header";

function App() {
  const { setOpen } = useContext(Context);
  const { Background } = themeToggler();

  return (
    <div className={`h-[100vh] w-[100vw] ${Background}`}>
      <BoardModal />
      <div
        className={`bg-[#635FC7] text-white absolute left-0 bottom-8 w-16 h-12 rounded-tr-full rounded-br-full flex items-center justify-center cursor-pointer `}
        onClick={() => setOpen(true)}
      >
        <BsEye size={20} className="font-bold" />
      </div>
      <Header />
      <SideBar />
    </div>
  );
}

export default App;
