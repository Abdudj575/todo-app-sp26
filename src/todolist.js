import Todo from "./todo.js";

class TodoList{
    #todos = [];

    addTodo(todoText){
        this.#todos.push(new Todo(todoText));
    }

    toggleTodo(todoId){
        const todo = this.#todos.find(todo => todo.id === todoId)
        if(todo){
            todo.toggle();
        }
    }

    markAllCompleted(){
        this.#todos.forEach(todo => {todo.completed = true});
    }

    clearCompleted(){
        this.#todos = this.#todos.filter(todo => !todo.completed)
    }

    getTodos(filter){
        if(filter === "active"){
            return this.#todos.filter((todo) => !todo.completed);
        } else if(filter === "completed"){
            return this.#todos.filter((todo) => todo.completed);
        } else{
            return [...this.#todos];
        }
    }
    
    getNumberOfActiveTodos(){
        return this.#todos.reduce(
            (count, todo) => count + (todo.completed ? 0 : 1), 0
        )
    }
}

export default TodoList