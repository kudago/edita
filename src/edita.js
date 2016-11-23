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
            </div>
        `));
        this.bindEvents();

        this.content = domify(`
            <div class="edita-content"></div>
        `);
        this.element.appendChild(this.content);
        this.renderBlocks();
    }

    bindEvents() {
        this.events = events(this.element, this);
        this.events.bind({
            'click .edita-add': 'addBlock',
        });
    }

    renderBlocks() {
        this.content.innerHTML = '';

        this.blocks.forEach(b => {
            this.content.appendChild(b.getInterface());
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

window.Edita = Edita;
module.exports = Edita;
