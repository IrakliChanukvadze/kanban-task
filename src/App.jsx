import { useContext, useState } from "react";
import "./App.css";
import { Context } from "./Context/Context";
import SideBar from "./Components/SideBar";
import { themeToggler } from "./Styles";
import { BsEye } from "react-icons/bs";
import BoardModal from "./Components/BoardModal";

function App() {
  const { setOpen, theme, open } = useContext(Context);
  const { Background, Container } = themeToggler();

  return (
    <div className={`h-[100vh] w-[100vw] ${Background}`}>
      <BoardModal />
      <div
        className={`bg-[#635FC7] text-white absolute left-0 bottom-8 w-16 h-12 rounded-tr-full rounded-br-full flex items-center justify-center cursor-pointer `}
        onClick={() => setOpen(true)}
      >
        <BsEye size={20} className="font-bold" />
      </div>
      <div
        className={`absolute h-15 md:h-16 xl:h-24 px-6 top-0 left-0 flex items-center gap-4 w-[210px] ${
          theme === "light" ? "border-r-#E4EBFA" : "border-r-#3E3F4E"
        } ${open && "hidden"} border-r-[1px] ${Container} `}
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
      <SideBar />
    </div>
  );
}

export default App;
