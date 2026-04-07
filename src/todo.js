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

    set text(value){
        this.#text = value;
    }

    get completed(){
        return this.#completed;
    }

    set completed(value){
        this.#completed = value;
    }
}

export default Todo;