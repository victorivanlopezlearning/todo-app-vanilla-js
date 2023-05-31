import html from './app.html?raw';
import todoStore, { Filters } from '../store/todo.store';
import { renderTodos } from './use-cases';

const ElementIds = {
    ClearCompleted: '.clear-completed',
    NewTodoInput: '#new-todo-input',
    TodoList: '.todo-list',
    TodoFilters: '.filters',
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
    const clearCompletedButton = document.querySelector(ElementIds.ClearCompleted);
    const filterUL = document.querySelector(ElementIds.TodoFilters);

    // Listeners
    newDescriptionInput.addEventListener('keyup', (e) => {
        const description = e.target.value;

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

    clearCompletedButton.addEventListener('click', () => {
        todoStore.deleteCompleted();
        displayTodos();
    });

    filterUL.addEventListener('click', (e) => {
        e.preventDefault();
        const isFilterElement = e.target.className === 'filter';
        if(!isFilterElement) return;

        const filtersLI = document.querySelectorAll('.filter');
        filtersLI.forEach( (filter) => filter.classList.remove('selected'));

        const elementSelected = e.target;
        elementSelected.classList.add('selected');
        
        switch(elementSelected.textContent) {
            case 'Todos':
                todoStore.setFilter(Filters.All);
            break;
            case 'Pendientes':
                todoStore.setFilter(Filters.Pending);
            break;
            case 'Completados':
                todoStore.setFilter(Filters.Completed);
            break;
        };
        displayTodos();
    });
};