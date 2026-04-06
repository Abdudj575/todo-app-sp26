class Todo {
    #id;
    #text;
    #completed;

    constructor(id, text, completed = false){
        this.#id = id;
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

const todo = new Todo(1, "Buy milk", false);
console.log(todo.id);
console.log(todo.text);
console.log(todo.completed);
todo.toggle();
console.log(todo.completed);