(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
class Block {
    constructor() {
        this.value = '';
    }

    renderInterface() {
        return '<textarea>' + this.value + '</textarea>';
    }
}

module.exports = Block;

},{}],2:[function(require,module,exports){
var Block = require('./block');

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
        var markup = this.blocks.map(function (b) {
            return b.renderInterface();
        }).join('');

        this.content.innerHTML = markup;
    }

    initActionsPanel() {
        var self = this;

        var addButton = document.createElement('button');
        addButton.textContent = '+';
        addButton.addEventListener('click', function () {
            var block = new Block();
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

},{"./block":1}]},{},[2]);
