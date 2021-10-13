import { TodoItemModel } from "./model/TodoItemModel.js";
import { TodoListModel } from "./model/TodoListModel.js";
import { element, render } from "./view/html-util.js";

export class App {
    constructor() {
        this.todoListModel = new TodoListModel();
    }
    mount() {
        const formElement = document.querySelector("#js-form");
        const inputElement = document.querySelector("#js-form-input");
        const containerElement = document.querySelector("#js-todo-list");
        const todoItemCountElement = document.querySelector("#js-todo-count");

        this.todoListModel.onChange(() => {
            const todoListElement = element`<ul />`;
            const todoItems = this.todoListModel.getTodoItems();

            todoItems.forEach(item => {
                const todoItemElement = item.completed
                    ? element`<li><input type="checkbox" class="checkbox" checked><s>${item.title}</s></li>`
                    : element`<li><input type="checkbox" class="checkbox">${item.title}</li>`;
                todoListElement.appendChild(todoItemElement);
            });
            render(todoListElement, containerElement);
            todoItemCountElement.textContent = `Todoアイテム数: ${this.todoListModel.getTotalCount()}`;
        });
        formElement.addEventListener("submit", (event) => {
            event.preventDefault();

            this.todoListModel.addTodo(new TodoItemModel({
                title: inputElement.value,
                completed: false
            }));
            inputElement.value = "";
        });
    }
}