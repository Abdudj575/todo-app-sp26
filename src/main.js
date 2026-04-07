import "./style.css";
import TodoApp from "./todo-app"; 

document.addEventListener("DOMContentLoaded", () => {
    const todoApp = new TodoApp();
    todoApp.renderTodos();
});