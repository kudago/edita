const Block = require('../block');
const domify = require('domify');

class Text extends Block {
    createSpeciticElement() {
        return domify(`
            <textarea>${this.value}</textarea>
        `);
    }

    bindEvents() {
        super.bindEvents();
        this.events.bind({
            'input textarea': e => this.value = e.target.value,
        });
    }
}

module.exports = Text;
