import React from "react";
import TodoItem from "./TodoItem";

const TodoList = (props) => {
  return (
    <ul>
      {props.todos.map((todo, index) => {
        return (
          <TodoItem
            key={index}
            index={index}
            id={todo.id}
            todo={todo}
            toggleTodoDone={props.toggleTodoDone}
            toggleTodoImportant={props.toggleTodoImportant}
            removeTodo={props.removeTodo}
          />
        );
      })}
    </ul>
  );
};
export default TodoList;
