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
        this.emit('ready');
    }

    createContainer() {
        const container = domify(`
            <div class="edita-block">
                <div class="edita-blockActions">
                    <button class="edita-blockDelete">
                        Delete
                    </button>
                </div>
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

    getValue() {
        return this.value;
    }

    createSpeciticElement() {
        // create element specific for the block type
        // should be implemented in subtypes
    }
}

module.exports = Block;
