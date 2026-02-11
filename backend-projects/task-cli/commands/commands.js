const add = require("./add.js");
const list = require("./list.js");
const remove = require("./remove.js");
const update = require("./update.js");
const mark = require("./mark.js");


// Objeto com todos os comandos disponíveis
const COMMANDS = {
    add,
    remove,
    update,
    mark,
    list
}


module.exports = COMMANDS;