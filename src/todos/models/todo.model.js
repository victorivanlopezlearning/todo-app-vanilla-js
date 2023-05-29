
export class Todo {

    /**
     * 
     * @param {String} description Task description 
     */
    constructor(description) {
        this.id = Date.now();
        this.description = description;
        this.done = false;
        this.createdAt = new Date();
    }
}