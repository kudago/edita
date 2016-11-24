const Markdown = require('./blocks/markdown');
const domify = require('domify');
const events = require('events-mixin');
const EventsEmitter = require('events');

class Edita extends EventsEmitter {
    constructor(element, options) {
        super();

        this.blocks = [];
        this.element = element;

        this.element.appendChild(domify(`
            <div class="edita">
                <button class="edita-add">+</button>
                <div class="edita-content"></div>
            </div>
        `));
        this.bindEvents();

        this.content = document.querySelector('.edita-content', this.element);
        this.renderBlocks();
    }

    bindEvents() {
        this.events = events(this.element, this);
        this.events.bind({
            'click .edita-add': 'addBlock',
        });
    }

    renderBlocks() {
        // virtualdom could be used here
        this.content.innerHTML = '';

        this.blocks.forEach(b => {
            this.content.appendChild(b.getContainer());
        });
    }

    addBlock() {
        const block = new Markdown;
        block.on('delete', () => this.deleteBlock(block));
        block.on('change', value => this.handleChange(block, value));
        this.blocks.push(block);
        this.renderBlocks();
    }

    deleteBlock(block) {
        this.blocks = this.blocks.filter(b => b != block);
        this.handleChange(block);
        this.emit('delete');
        this.renderBlocks();
    }

    handleChange(block, value) {
        this.emit('change', this.getValues());
    }

    getValues() {
        return this.blocks.map(b => b.getValue());
    }
}

// TODO: maybe remove this export
window.Edita = Edita;
module.exports = Edita;
