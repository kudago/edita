const Block = require('./block');

class Edita {
    constructor(element, options) {
        this.blocks = [];
        this.element = element;

        this.actionsPanel = document.createElement('div');
        this.element.appendChild(this.actionsPanel);
        this.initActionsPanel();

        this.content = document.createElement('div');
        this.element.appendChild(this.content);
        this.renderBlocks();
    }

    renderBlocks() {
        this.content.innerHTML = '';

        this.blocks.forEach(b => {
            this.content.appendChild(b.getInterface());
        });
    }

    initActionsPanel() {
        var self = this;

        var addButton = document.createElement('button');
        addButton.textContent = '+';
        addButton.addEventListener('click', () => {
            var block = new Block;
            self.addBlock(block);
        });

        this.actionsPanel.appendChild(addButton);
    }

    addBlock(block) {
        this.blocks.push(block);
        this.renderBlocks();
    }
}

window.Edita = Edita;
module.exports = Edita;
