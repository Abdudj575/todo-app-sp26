import "./style.css";


const createTodoApp = () => {
    // State of the app
    let todos = [];
    let nextTodoId = 1;
    let filter = "all"; //can be "all", "completed", or "active"

    const filterTodo = () => {
        if(filter === "active"){
            return todos.filter((todo) => !todo.completed);
        } else if(filter === "completed"){
            return todos.filter((todo) => todo.completed);
        } else{
            return [...todos];
        }
    }

    return {
        addTodo: (todoText) => {
            todos = [...todos, {
            id: nextTodoId++,
            text: todoText,
            completed: false
            }]
        },
        toggleTodo: (todoId) => {
            todos = todos.map(todo => todo.id === todoId ? 
                {
                    ...todo,
                    completed: !todo.completed
                } : todo)
        },
        getTodos: () => filterTodo(),
        setFilter: (newFilter) => {
            filter = newFilter;
        },
    }
}

// Get HTML elements
const newTodoInput = document.getElementById("new-todo");
const todoNav = document.getElementById("todo-nav");
const todoList = document.getElementById("todo-list");

const todoApp = createTodoApp();


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
        ...todoApp.getTodos().map(createTodoItem)
    );
}

const updateClassList = (element, isActive) => {
  const classes = [
    "underline",
    "underline-offset-4",
    "decoration-rose-800",
    "decoration-2",
  ];
  if (isActive) {
    element.classList.add(...classes);
  } else {
    element.classList.remove(...classes);
  }
};

const renderTodoNavBar = (href) => {
  Array.from(todoNav.children).forEach((element) => {
    updateClassList(element, element.href === href);
  });
};

const handleNewTodoKeyDown = (event) => {
    const newTodoInput = event.target;
    const todoText = newTodoInput.value.trim();
    if(event.key === "Enter" && todoText !== ""){
        todoApp.addTodo(todoText);
        newTodoInput.value = "";
        renderTodos();
    }
}
 
const handleClickOnNavbar = (event) => {
  if (event.target.tagName === "A") {
    const href = event.target.href;
    todoApp.setFilter(href.split("/").pop() || "all");
    renderTodos();
    renderTodoNavBar(href);
  }
}; 

const handleClickOnTodolist = (event) => {
    if(event.target.id.includes("todo-text")){
        const todoId = event.target.id.split("-").pop();
        todoApp.toggleTodo(Number(todoId));
        renderTodos();
    }
}

// Event listeners
newTodoInput.addEventListener( "keydown", handleNewTodoKeyDown);
todoNav.addEventListener("click", handleClickOnNavbar);
todoList.addEventListener("click", handleClickOnTodolist);
document.addEventListener("DOMContentLoaded", renderTodos);