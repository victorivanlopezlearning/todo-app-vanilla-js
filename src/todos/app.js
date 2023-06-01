import html from './app.html?raw';
import todoStore, { Filters } from '../store/todo.store';
import { renderPending, renderTodos } from './use-cases';

const ElementIds = {
    ClearCompleted: '.clear-completed',
    NewTodoInput: '#new-todo-input',
    TodoList: '.todo-list',
    TodoFilters: '.filters',
    PendingCountLabel: '#pending-count',
};

/**
 * Initializes the project at the specified HTML element
 * @param {String} elementId Id element. Ej. #app
 */
export const App = (elementId) => {

    const displayTodos = () => {
        const todos = todoStore.getTodos(todoStore.getCurrentFilter());
        renderTodos(ElementIds.TodoList, todos);
        updatePendingCount();
    };

    const updatePendingCount = () => {
        renderPending(ElementIds.PendingCountLabel);
    };

    const currentFilter = () => {
        const currentFilter = todoStore.getCurrentFilter();
        document.querySelector(`#${currentFilter}`).classList.add('selected');
    };

    // App() function is called
    (() => {
        const app = document.createElement('MAIN');
        app.innerHTML = html;
        document.querySelector(elementId).appendChild(app);
        displayTodos();
        currentFilter();
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

        const elementSelected = e.target;
        const isFilterElement = e.target.className === 'filter';
        if(!isFilterElement) return;

        const currentSelected = filterUL.querySelector('.selected');
        if(currentSelected) {
            currentSelected.classList.remove('selected');
        };

        elementSelected.classList.add('selected');
        
        switch(elementSelected.id) {
            case 'all':
                todoStore.setFilter(Filters.All);
            break;
            case 'pending':
                todoStore.setFilter(Filters.Pending);
            break;
            case 'completed':
                todoStore.setFilter(Filters.Completed);
            break;
        };
        displayTodos();
    });
};