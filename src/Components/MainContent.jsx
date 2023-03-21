import React, { useContext } from "react";
import { Context } from "../Context/Context";
import { themeToggler } from "../Styles";

const MainContent = () => {
  const { theme, open, allData, current } = useContext(Context);
  const { Container, textHeader } = themeToggler();
  const currentBoardColumns = allData.filter((item) => item.name === current)[0]
    .columns;

  return (
    <div
      className={`${
        open
          ? "sm:ml-[33vw] md:ml-[21vw] sm:w-[67vw] md:w-[79vw] px-4"
          : "w-full px-10 m-auto"
      } flex gap-8 ${textHeader} `}
    >
      {allData
        .filter((item) => item.name === current)[0]
        .columns.map((item) => (
          <div
            key={item.name}
            className={`flex flex-col gap-6 w-[28%] max-h-[80vh]  mt-6  `}
          >
            <div className="flex gap-4 items-center">
              <div className="h-4 aspect-square bg-purple-700 rounded-full"></div>
              <h2 className="font-bold text-[#828FA3]">
                {item.name} ({item.tasks.length})
              </h2>
            </div>

            <div
              className={`flex flex-col gap-6 overflow-auto scrollbar-thin ${
                theme === "light"
                  ? "scrollbar-track-white scrollbar-thumb-gray-300 "
                  : "scrollbar-track-black scrollbar-thumb-gray-500 "
              }   scrollbar-h-20 scrollbar-rounded-8 pr-6`}
            >
              {item?.tasks?.map((task) => (
                <div
                  key={task.title}
                  className={`flex flex-col gap-6 ${Container} py-2 px-4`}
                >
                  <h2 className="font-bold">{task?.title}</h2>
                  <h2 className="text-[#828FA3]">
                    Subtasks{" "}
                    {
                      task?.subtasks.filter((subTask) => subTask.isCompleted)
                        .length
                    }
                    /{task?.subtasks.length}
                  </h2>
                </div>
              ))}
            </div>
          </div>
        ))}
    </div>
  );
};

export default MainContent;
