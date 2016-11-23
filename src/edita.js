function Edita(element, options) {
    this.blocks = [];
    this.element = element;

    this.actionsPanel = document.createElement('div');
    this.element.appendChild(this.actionsPanel);
    this.initActionsPanel();

    this.content = document.createElement('div');
    this.element.appendChild(this.content);
    this.renderBlocks();
}

Edita.prototype.renderBlocks = function() {
    var markup = this.blocks.map(function(b) {
        return b.renderInterface();
    }).join('');

    this.content.innerHTML = markup;
};

Edita.prototype.initActionsPanel = function() {
    var self = this;

    var addButton = document.createElement('button');
    addButton.textContent = '+';
    addButton.addEventListener('click', function() {
        var block = new Block;
        self.addBlock(block);
    });

    this.actionsPanel.appendChild(addButton);
};

Edita.prototype.addBlock = function(block) {
    this.blocks.push(block);
    this.renderBlocks();
};



function Block() {
    this.value = '';
    this.bindEvents();
}

Block.prototype.renderInterface = function() {
    return '<textarea>' + this.value + '</textarea>';
};
