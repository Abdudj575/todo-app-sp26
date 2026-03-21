import "./style.css";

// State of the app
const todos = [
    {id: 1, text: "Buy milk", completed: false},
    {id: 2, text: "Buy bread", completed: false},
    {id: 3, text: "Buy jam", completed: true},
];
let nextTodoId = 4;
let filter = "all"; //can be "all", "completed", or "active"

function renderTodos(){
    const todoListElement = document.getElementById("todo-list");
    todoListElement.innerHTML = "";
    for(let i = 0; i < todos.length; i++){
        const todo = todos[i];

        const todoItem = document.createElement("div");
        todoItem.classList.add("p-4", "todo-item");
        todoListElement.appendChild(todoItem);

        const todoText = document.createElement("div");
        todoText.classList.add("p-4", "todo-text");
        todoText.textContent = todo.text;
        todoItem.appendChild(todoText);

        const todoEdit = document.createElement("div");
        todoEdit.classList.add("hidden", "todo-edit");
        todoEdit.value = todo.text;
        todoItem.appendChild(todoEdit);
    }
}

document.addEventListener("DOMContentLoaded", renderTodos);