import "./style.css";

// State of the app
const todos = [
    {id: 1, text: "Buy milk", completed: false},
    {id: 2, text: "Buy bread", completed: false},
    {id: 3, text: "Buy jam", completed: true},
];
let nextTodoId = 4;
let filter = "all"; //can be "all", "completed", or "active"

// Get HTML elements
const newTodoInput = document.getElementById("new-todo");
const todoNav = document.getElementById("todo-nav");
const todoList = document.getElementById("todo-list");

function renderTodos(){
    const todoListElement = document.getElementById("todo-list");
    todoListElement.innerHTML = "";

    const filteredTodos = [];
    for(let i = 0; i < todos.length; i++){
        const todo = todos[i];
        if(filter === "all"){
            filteredTodos.push(todo);
        } else if(filter === "completed" && todo.completed === true){
            filteredTodos.push(todo);
        } else if (filter === "active" && todo.completed === false){
            filteredTodos.push(todo);
        }
    }

    for(let i = 0; i < filteredTodos.length; i++){
        const todo = filteredTodos[i];

        const todoItem = document.createElement("div");
        todoItem.classList.add("p-4", "todo-item");
        todoListElement.appendChild(todoItem);

        const todoText = document.createElement("div");
        todoText.classList.add("todo-text");
        todoText.setAttribute("id", `todo-text-${todo.id}`);
        if(todo.completed){
            todoText.classList.add("line-through")
        }
        todoText.textContent = todo.text;
        todoItem.appendChild(todoText);

        const todoEdit = document.createElement("div");
        todoEdit.classList.add("hidden", "todo-edit");
        todoEdit.value = todo.text;
        todoItem.appendChild(todoEdit);
    }
}

function renderTodoNavBar(hrefValue){
    const todoNav = document.getElementById("todo-nav");
    const elements = todoNav.children;
    for(let i = 0; i < elements.length; i++){
        const element = elements[i];
        if(element.href === hrefValue){
            element.classList.add(
                "underline",
                "underline-offset-4",
                "decoration-rose-800",
                "decoration-2",
            );
        } else{
            element.classList.remove(
                "underline",
                "underline-offset-4",
                "decoration-rose-800",
                "decoration-2",
            );
        }
    }
}

function handleNewTodoKeyDown(event){
    const newTodoInput = event.target;
    const todoText = newTodoInput.value.trim();
    if(event.key === "Enter" && todoText !== ""){
        todos.push({
            id: nextTodoId++,
            text: todoText,
            completed: false
        });
        newTodoInput.value = "";
        renderTodos();
    }
}
 
function handleClickOnNavBar(event){
    //["#", completed]
    if(event.target.tagName === "A"){
        const hrefValue = event.target.href;
        const action = hrefValue.split("/").pop();
        filter = action === "" ? "all" : action;
        renderTodos();
        renderTodoNavBar(hrefValue);
    }
}   

function handleClickOnTodolist(event){
    if(event.target.id.includes("todo-text")){
        const todoId = event.target.id.split("-").pop();
        const todoIdNumber = Number(todoId);

        for(let i = 0; i < todos.length; i++){
            if(todos[i].id === todoIdNumber){
                todos[i].completed = !todos[i].completed;
            }
        }
    }
    renderTodos();
}

// Event listeners
newTodoInput.addEventListener( "keydown", handleNewTodoKeyDown);
todoNav.addEventListener("click", handleClickOnNavBar);
todoList.addEventListener("click", handleClickOnTodolist);
document.addEventListener("DOMContentLoaded", renderTodos);