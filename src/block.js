class Block {
    constructor() {
        this.value = '';
    }

    renderInterface() {
        return '<textarea>' + this.value + '</textarea>';
    }
}

module.exports = Block;
