const Block = require('../block');
const domify = require('domify');
const SimpleMDE = require('simplemde');

class Markdown extends Block {
    createSpeciticElement() {
        this.on('ready', () => {
            this.simpleMDE = new SimpleMDE({
                element: textarea,
            });

            this.simpleMDE.codemirror.on("change", () => {
                this.value = this.simpleMDE.value();
            });
        });

        const textarea = domify(`
            <textarea>${this.value}</textarea>
        `);

        return textarea;
    }
}

module.exports = Markdown;
