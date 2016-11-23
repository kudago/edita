const domify = require('domify');
const events = require('events-mixin');
const EventsEmitter = require('events');

/**
 * Generic text editor container
 */
class Block extends EventsEmitter {
    constructor() {
        super();

        this.value = '';
        this.container = this.createContainer();
        this.container.appendChild(
            this.createSpeciticElement()
        );
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

        return container;
    }

    bindEvents() {
        this.events = events(this.container, this);
        this.events.bind({
            'click .edita-blockDelete': 'delete',
        });
    }

    delete() {
        this.emit('delete');
    }

    getContainer() {
        return this.container;
    }

    createSpeciticElement() {
        // create element specific for the block type
        // should be implemented in subtypes
    }
}

module.exports = Block;
