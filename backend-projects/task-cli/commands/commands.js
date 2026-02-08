const add = require("./add.js");
const list = require("./list.js");
const remove = require("./remove.js");
const update = require("./update.js");


const COMMANDS = {
    add,
    remove,
    update,
    list
}


module.exports = COMMANDS;