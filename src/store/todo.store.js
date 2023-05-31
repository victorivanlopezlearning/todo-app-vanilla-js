import { Todo } from '../todos/models/todo.model';

// Recommended to centralize the filter options in one object
const Filters = {
    All: 'all',
    Completed: 'completed',
    Pending: 'pending'
};

// Defining global state of the application
const state = {
    todos: [
        new Todo('Gema del alma'),
        new Todo('Gema del tiempo'),
        new Todo('Gema del poder'),
        new Todo('Gema del realidad'),
        new Todo('Gema del mente'),
        new Todo('Gema del espacio'),
    ],
    filter: Filters.All,
};

const initStore = () => {
    loadStore();
    console.log('InitStore');
};

const loadStore = () => {
    if(localStorage.getItem('state')) {
        const { todos = [], filter = Filters.All } = JSON.parse(localStorage.getItem('state'));
        state.todos = todos;
        state.filter = filter;
    };
};

const saveStateToLocalStorage = () => {
    localStorage.setItem('state', JSON.stringify(state));
};

/**
 * Get Todos
 * @param {Filters} filter 
 */
const getTodos = (filter = Filters.All) => {
    switch(filter) {
        case Filters.All:
            return [...state.todos];
        case Filters.Completed:
            return state.todos.filter(todo => todo.done);
        case Filters.Pending:
            return state.todos.filter(todo => !todo.done);
        default: 
            throw new Error(`Option ${filter} is not valid`); 
    };
};

/**
 * Create a Todo
 * @param {String} description Task description
 */
const addTodo = (description) => {
    if(!description) throw new Error('Description is required');
    state.todos.push(new Todo(description));
    saveStateToLocalStorage();
};

/**
 * Change Todo state
 * @param {String} todoId Todo Identifier
 */
const toggleTodo = (todoId) => {
    if(!todoId) throw new Error('todoId is required');
    
    state.todos = state.todos.map(todo => {
        if(todo.id === todoId) {
            todo.done = !todo.done;
        };

        return todo;
    });
    saveStateToLocalStorage();
};

/**
 * Delete Todo
 * @param {String} todoId Todo Identifier
 */
const deleteTodo = (todoId) => {
    if(!todoId) throw new Error('todoId is required');
    state.todos = state.todos.filter(todo => todo.id !== todoId);
    saveStateToLocalStorage();
};

const deleteCompleted = () => {
    state.todos = state.todos.filter(todo => !todo.done);
    saveStateToLocalStorage();
};

/**
 * Change Todo filter
 * @param {Filters} newFilter
 */
const setFilter = (newFilter) => {
    if(!Object.values(Filters).includes(newFilter) || !newFilter) throw new Error('Filter not valid');
    state.filter = newFilter;
    saveStateToLocalStorage();
};

const getCurrentFilter = () => {
    return state.filter;
};

export default {
    addTodo,
    deleteCompleted,
    deleteTodo,
    getCurrentFilter,
    getTodos,
    initStore,
    loadStore,
    setFilter,
    toggleTodo,
}