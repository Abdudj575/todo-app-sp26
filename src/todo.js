class Todo {
    #id;
    #text;
    #completed;
    static #nextTodoId = 1;

    constructor(text, completed = false){
        this.#id = Todo.#nextTodoId++;
        this.#text = text;
        this.#completed = completed;
    }

    toggle(){
        this.#completed = !this.#completed;
    }

    get id(){
        return this.#id;
    }

    get text(){
        return this.#text;
    }

    get completed(){
        return this.#completed;
    }
}

export default Todo;