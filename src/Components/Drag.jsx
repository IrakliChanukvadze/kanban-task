import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const Drag = () => {
  const [itemData, setItemData] = useState([
    [
      { id: "1", className: "bg-yellow-500 w-40 h-40", author: "123544" },
      { id: "2", className: "bg-red-500 w-40 h-40", author: "123" },
      { id: "3", className: "bg-green-500 w-40 h-40", author: "123" },
    ],
    [
      { id: "12", className: "bg-yellow-500 w-40 h-40", author: "123544" },
      { id: "22", className: "bg-red-500 w-40 h-40", author: "123" },
    ],
  ]);

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(itemData);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setItemData(items);
  };
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="flex justify-center gap-20">
        <Droppable droppableId="2">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="p-10 border-black border-2 w-80 "
            >
              {itemData[0].map((item, index) => (
                <Draggable draggableId={item.id} key={item.id} index={index}>
                  {(provided) => (
                    <div
                      className={`${item.className} mt-4`}
                      key={item.id}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    ></div>
                  )}
                </Draggable>
              ))}
            </div>
          )}
        </Droppable>
        <Droppable droppableId="list">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="p-10 border-black border-2 w-80  "
            >
              {itemData[1].map((item, index) => (
                <Draggable draggableId={item.id} key={item.id} index={index}>
                  {(provided) => (
                    <div
                      className={`${item.className} mt-4`}
                      key={item.id}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    ></div>
                  )}
                </Draggable>
              ))}
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
};

export default Drag;
