import styled from "@emotion/styled";
import React from "react";
import {Draggable} from "react-beautiful-dnd";


const Card = styled.div<{ isDragging: boolean }>`
  margin-bottom: 5px;
  padding: 10px 10px;
  background-color: ${(props) => props.isDragging ? "#2D3748" : "#000"};
  box-shadow: rgb(15 15 15 / 10%) 0px 0px 0px 1px, rgb(15 15 15 / 10%) 0px 2px 4px;
  border-radius: 4px;
  color: ${props => props.isDragging ? "#fff" : "#282c34"};
`;

interface ITodoItem {
    toDoText: string;
    index: number;
    boardName: string;
}

function TodoItem({toDoText, index, boardName}: ITodoItem) {
    return (

        <Draggable draggableId={boardName + ""} index={index}>
            {
                (magic, snapshot) => (
                    <Card
                        isDragging={snapshot.isDragging}
                        ref={magic.innerRef}
                        {...magic.dragHandleProps}
                        {...magic.draggableProps}
                    >
                        {toDoText}
                    </Card>
                )}
        </Draggable>
    )

}


export default React.memo(TodoItem);