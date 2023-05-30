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
    ],
    filter: Filters.All,
};

const initStore = () => {
    console.log(state);
    console.log('InitStore');
};

const loadStore = () => {
    throw new Error('Not Implemented');
};

/**
 * Create a todo
 * @param {String} description Task description
 */
const addTodo = (description) => {
    throw new Error('Not Implemented');
};

/**
 * Change Todo state
 * @param {String} todoId Todo Identifier
 */
const toggleTodo = (todoId) => {
    throw new Error('Not Implemented');
};

/**
 * Delete Todo
 * @param {String} todoId Todo Identifier
 */
const deleteTodo = (todoId) => {
    throw new Error('Not Implemented');
};

const deleteCompleted = () => {
    throw new Error('Not Implemented');
};

/**
 * Change Todo filter
 * @param {String} newFilter 
 */
const setFilter = (newFilter = Filters.All) => {
    throw new Error('Not Implemented');
};

const getCurrentFilter = () => {
    throw new Error('Not Implemented');
};

export default {
    addTodo,
    deleteCompleted,
    deleteTodo,
    getCurrentFilter,
    initStore,
    loadStore,
    setFilter,
    toggleTodo,
}