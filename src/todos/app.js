import html from './app.html?raw';

/**
 * Initializes the project at the specified HTML element
 * @param {String} elementId Id element. Ej. #app
 */
export const App = (elementId) => {

    // App() function is called
    (() => {
        const app = document.createElement('MAIN');
        app.innerHTML = html;
        document.querySelector(elementId).appendChild(app);
    })();
};