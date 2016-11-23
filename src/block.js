const domify = require('domify');

class Block {
    constructor() {
        this.value = '';
        this.element = this.createElement();
        this.bindEvents();
    }

    createElement() {
        return domify(`
            <div>
                <textarea>${this.value}</textarea>
            </div>
        `);
    }

    bindEvents() {
        const textarea = this.element.children[0];
        textarea.addEventListener('input', () => {
            this.value = textarea.value;
        });
    }

    getInterface() {
        return this.element;
    }
}

module.exports = Block;
