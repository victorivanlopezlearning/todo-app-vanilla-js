import { Todo } from "../models/todo.model";
import { createTodoHTML } from "./create-todo-html";
import { cleanHTML } from "./clean-html";

let element;

/**
 * Render Todos in HTML
 * @param {String} elementId Identifier HTML element
 * @param {Todo} todos Todo(s) to render
 * @returns {HTMLElement}
 */
export const renderTodos = (elementId, todos) => {

    if(!element) {
        element = document.querySelector(elementId);
    };  
    if(!elementId) throw new Error('elementId is required');
    if(!todos) throw new Error('todos is required');

    cleanHTML(elementId);

    todos.forEach(todo => {
        element.append(createTodoHTML(todo));
    });
};