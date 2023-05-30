import { Todo } from "../models/todo.model";

/**
 * 
 * @param {Todo} todo
 */
export const createTodoHTML = (todo) => {
    if(!todo) throw new Error('todo Object is required');

    const {done, id, description} = todo;

    const liElement = document.createElement('LI');
    if(done) {
        liElement.classList.add('completed');
    };
    liElement.dataset.id = `${id}`;
    
    const liElementDiv = document.createElement('DIV');

    const divInput = document.createElement('INPUT');
    divInput.classList.add('toggle');
    divInput.type = 'checkbox';
    if(done) {
        divInput.checked = true;
    } else {
        divInput.checked = false;
    };
    liElementDiv.appendChild(divInput);

    const divLabel = document.createElement('LABEL');
    divLabel.textContent = `${description}`;
    liElementDiv.appendChild(divLabel);

    const divButton = document.createElement('BUTTON');
    divButton.classList.add('destroy');
    liElementDiv.appendChild(divButton);


    const liElementInput = document.createElement('INPUT');
    liElementInput.classList.add('edit');
    liElementInput.value = 'Create a TodoMVC template';

    liElement.appendChild(liElementDiv);
    liElement.appendChild(liElementInput);

    return liElement;
};