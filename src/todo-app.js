import TodoList from "./todolist";

const FILTERS = {
    ALL: "all",
    ACTIVE: "active",
    COMPLETED: "completed"
}

class TodoApp{
    #todoList;
    #filter;
    #newTodoInput;
    #todoNav;
    #markAllCompleted;
    #clearCompleted;
    #activeTodoCount;
    #todoListElement;

    constructor(){
        this.#todoList = new TodoList();
        this.#filter = FILTERS.ALL; //can be "all", "completed", or "active"

        // Get HTML elements
        this.#newTodoInput = document.getElementById("new-todo");
        this.#todoNav = document.getElementById("todo-nav");
        this.#todoListElement = document.getElementById("todo-list");
        this.#markAllCompleted = document.getElementById("mark-all-completed");
        this.#clearCompleted = document.getElementById("clear-completed");
        this.#activeTodoCount = document.getElementById("todo-count")

        // Event listeners
        this.#newTodoInput.addEventListener( "keydown", this.#handleNewTodoKeyDown);
        this.#todoNav.addEventListener("click", this.#handleClickOnNavbar);
        this.#todoListElement.addEventListener("click", this.#handleClickOnTodolist);
        this.#markAllCompleted.addEventListener("click", this.#handleClickOnMarkAllCompleted);
        this.#clearCompleted.addEventListener("click", this.#handleClickOnClearCompleted);
    }

    #createTodoText = (todo) => {
        const todoText = document.createElement("div");
        todoText.classList.add("todo-text");
        todoText.setAttribute("id", `todo-text-${todo.id}`);
        if(todo.completed){
            todoText.classList.add("line-through")
        }
        todoText.textContent = todo.text;
        return todoText;
    }

    #createTodoInput = (todo) =>{
        const todoEdit = document.createElement("div");
        todoEdit.classList.add("hidden", "todo-edit");
        todoEdit.value = todo.text;
        return todoEdit;
    }

    #createTodoItem = (todo) => {
        const todoItem = document.createElement("div");
        todoItem.classList.add("p-4", "todo-item");
        todoItem.append(
            this.#createTodoText(todo), 
            this.#createTodoInput(todo));
        return todoItem;

    }

    renderTodos = () => {
        const todoItems = this.#todoList
            .getTodos(this.#filter)
            .map((todo) => this.#createTodoItem(todo));
        this.#todoListElement.replaceChildren(...todoItems);
        this.#activeTodoCount.textContent = 
            `${this.#todoList.getNumberOfActiveTodos()} items left`;
    }

    #updateClassList = (element, isActive) => {
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

    #renderTodoNavBar = (href) => {
        Array.from(this.#todoNav.children).forEach((element) => {
            this.#updateClassList(element, element.href === href);
        });
    };

    #handleNewTodoKeyDown = (event) => {
        const newTodoInput = event.target;
        const todoText = newTodoInput.value.trim();
        if(event.key === "Enter" && todoText !== ""){
            this.#todoList.addTodo(todoText);
            newTodoInput.value = "";
            this.renderTodos();
        }
    }
    
    #handleClickOnNavbar = (event) => {
        if (event.target.tagName === "A") {
            const href = event.target.href;
            this.#filter = href.split("/").pop() || "all";
            this.renderTodos();
            this.#renderTodoNavBar(href);
        }
    }; 

    #handleClickOnTodolist = (event) => {
        if(event.target.id.includes("todo-text")){
            const todoId = event.target.id.split("-").pop();
            this.#todoList.toggleTodo(Number(todoId));
            this.renderTodos();
        }
    }

    #handleClickOnMarkAllCompleted = () => {
        this.#todoList.markAllCompleted();
        this.renderTodos();
    }

    #handleClickOnClearCompleted = () => {
        this.#todoList.clearCompleted();
        this.renderTodos();
    }
}

export default TodoApp;