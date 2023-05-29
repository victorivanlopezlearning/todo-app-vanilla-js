import { Todo } from '../todos/models/todo.model';

const Filters = {
    All: 'all',
    Completed: 'completed',
    Pending: 'pending'
};

// Definiendo el estado global de la aplicación
const state = {
    todos: [
        new Todo('Gema del alma'),
        new Todo('Gema del tiempo'),
        new Todo('Gema del poder'),
    ],
    filter: Filters.All, // Recomendado centralizar las opciones del filter en un objeto
};

const initStore = () => {
    console.log(state);
    console.log('InitStore');
};

export default {
    initStore,
}