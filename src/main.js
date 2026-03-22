import "./style.css";

// State of the app
let todos = [
    {id: 1, text: "Buy milk", completed: false},
    {id: 2, text: "Buy bread", completed: false},
    {id: 3, text: "Buy jam", completed: true},
];
const snapshot = todos;
let nextTodoId = 4;
let filter = "all"; //can be "all", "completed", or "active"

// Get HTML elements
const newTodoInput = document.getElementById("new-todo");
const todoNav = document.getElementById("todo-nav");
const todoList = document.getElementById("todo-list");

const addTodo = (todos, todoText) => [...todos, {
    id: nextTodoId++,
    text: todoText,
    completed: false
}];

const toggleTodo = (todos, todoId) => {
    todos.map(todos => todos[i].id === todoId ? 
        {
            ...todo,
            completed: !todo.completed
        }
        : todo)
}


const filterTodo = (todos, filter) => {
    if(filter === "active"){
        return todos.filter((todo) => !todo.completed);
    } else if(filter === "completed"){
        return todos.filter((todo) => todo.completed);
    } else{
        return [...todos];
    }
}

const createTodoText = (todo) =>{
    const todoText = document.createElement("div");
    todoText.classList.add("todo-text");
    todoText.setAttribute("id", `todo-text-${todo.id}`);
    if(todo.completed){
        todoText.classList.add("line-through")
    }
    todoText.textContent = todo.text;
    return todoText;
}

const createTodoInput = (todo) =>{
    const todoEdit = document.createElement("div");
    todoEdit.classList.add("hidden", "todo-edit");
    todoEdit.value = todo.text;
    return todoEdit;
}

const createTodoItem = (todo) => {
    const todoItem = document.createElement("div");
    todoItem.classList.add("p-4", "todo-item");
    todoItem.append(createTodoText(todo), createTodoInput(todo));
    return todoItem;

}

const renderTodos = () => {
    todoList.replaceChildren(
        ...filterTodo(todos, filter).map(createTodoItem)
    );
}
 
function renderTodoNavBar(hrefValue){
    const classes = [
        "underline",
        "underline-offset-4",
        "decoration-rose-800",
        "decoration-2",
    ];
    Array.from(todoNav.children)
        .forEach(element => {
            const element = elements[i];
            if(element.href === hrefValue){
                element.classList.add(...classes);
            } else{
                element.classList.remove(...classes);
            }
    })
}

const handleNewTodoKeyDown = (event) => {
    const newTodoInput = event.target;
    const todoText = newTodoInput.value.trim();
    if(event.key === "Enter" && todoText !== ""){
        todos = addTodo(todos, todoText);
        newTodoInput.value = "";
        renderTodos();
    }
}
 
const handleClickOnNavBar = (event) => {
    if(event.target.tagName === "A"){
        const hrefValue = event.target.href;
        filter = hrefValue.split("/").pop() || "all";
        renderTodos();
        renderTodoNavBar(hrefValue);
    }
}   

const handleClickOnTodolist = (event) => {
    if(event.target.id.includes("todo-text")){
        const todoId = event.target.id.split("-").pop();
        todos = toggleTodo(todos, Number(todoId));
        renderTodos();
    }
}

// Event listeners
newTodoInput.addEventListener( "keydown", handleNewTodoKeyDown);
todoNav.addEventListener("click", handleClickOnNavBar);
todoList.addEventListener("click", handleClickOnTodolist);
document.addEventListener("DOMContentLoaded", renderTodos);