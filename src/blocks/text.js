const Block = require('../block');
const domify = require('domify');

class Text extends Block {
    createSpeciticElement() {
        this.element = domify(`
            <textarea>${this.value}</textarea>
        `);

        this.element.addEventListener('input', () => {
            this.value = this.element.value;
        });

        return this.element;
    }
}

module.exports = Text;
