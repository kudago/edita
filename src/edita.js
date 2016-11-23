const Text = require('./blocks/text');
const domify = require('domify');
const events = require('events-mixin');

class Edita {
    constructor(element, options) {
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
        const block = new Text;
        block.on('delete', () => this.deleteBlock(block));
        this.blocks.push(block);
        this.renderBlocks();
    }

    deleteBlock(block) {
        this.blocks = this.blocks.filter(b => b != block);
        this.renderBlocks();
    }
}

// TODO: maybe remove this export
window.Edita = Edita;
module.exports = Edita;
