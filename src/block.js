const domify = require('domify');
const events = require('events-mixin');
const EventsEmitter = require('events');

class Block extends EventsEmitter {
    constructor() {
        super();

        this.value = '';
        this.container = this.createContainer();
        this.bindEvents();
    }

    createContainer() {
        const container = domify(`
            <div class="edita-block">
                <button class="edita-blockDelete">
                    Delete
                </button>
            </div>
        `);

        container.appendChild(this.createSpeciticElement());

        return container;
    }

    createSpeciticElement() {
        // create element, specific for the block type
        // should be implemented in subtypes
    }

    bindEvents() {
        this.events = events(this.container, this);

        this.events.bind({
            'click .edita-blockDelete': 'delete',
        });
        const textarea = this.container.children[0];
        textarea.addEventListener('input', () => {
            this.value = textarea.value;
        });
    }

    delete() {
        this.emit('delete');
    }

    getInterface() {
        return this.container;
    }
}

module.exports = Block;
