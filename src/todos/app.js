import html from './app.html?raw';
import todoStore from '../store/todo.store';
import { renderTodos } from './use-cases';

const ElementIds = {
    TodoList: '.todo-list',
    NewTodoInput: '#new-todo-input',
};

/**
 * Initializes the project at the specified HTML element
 * @param {String} elementId Id element. Ej. #app
 */
export const App = (elementId) => {

    const displayTodos = () => {
        const todos = todoStore.getTodos(todoStore.getCurrentFilter());
        renderTodos(ElementIds.TodoList, todos);
    };

    // App() function is called
    (() => {
        const app = document.createElement('MAIN');
        app.innerHTML = html;
        document.querySelector(elementId).appendChild(app);
        displayTodos();
    })();

    // HTML Reference
    const newDescriptionInput = document.querySelector(ElementIds.NewTodoInput);
    const todoListUL = document.querySelector(ElementIds.TodoList);

    // Listeners
    newDescriptionInput.addEventListener('keyup', (e) => {
        const description = e.target.value;
        // Validations
        if(e.key !== 'Enter') return;
        if(description.trim().length === 0) return;

        todoStore.addTodo(description);
        displayTodos();
        newDescriptionInput.value = '';
    });

    todoListUL.addEventListener('click', (e) => {
        const element = e.target.closest('[data-id]');
        const todoId = element.getAttribute('data-id');
        
        todoStore.toggleTodo(todoId);
        displayTodos();
    });
    todoListUL.addEventListener('click', (e) => {
        const isDestroyElement = e.target.className === 'destroy';
        if(!isDestroyElement) return;
        const todoId = e.target.closest('[data-id]').getAttribute('data-id');
        
        todoStore.deleteTodo(todoId);
        displayTodos();
    });
};