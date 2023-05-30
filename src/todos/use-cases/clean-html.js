
/**
 * Function to clean HTML
 * @param {HTMLElement} element
 * @returns {Void}
 */ 
export const cleanHTML = (element) => {

    if(!element) throw new Error('element is required');

    while(element.firstChild) {
        element.removeChild(element.firstChild);
    };
};