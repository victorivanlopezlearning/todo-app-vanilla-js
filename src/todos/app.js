import html from './app.html?raw';

/**
 * Inicializa el proyecto en el elemento del HTML indicado
 * @param {String} elementId Id del elemento. Ej. #app
 */
export const App = (elementId) => {

    // Cuando la función App() se llama
    (() => {
        const app = document.createElement('MAIN');
        app.innerHTML = html;
        document.querySelector(elementId).appendChild(app);
    })();
};