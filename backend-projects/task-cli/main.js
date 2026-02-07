const process = require("process");
const path = require("path");
const fs = require("fs");


const COMMANDS = require("./commands.js");
const ARGUMENTS = process.argv.slice(2);
const TASKS_PATH = path.join(__dirname, "/tasks.json"); 


function loadTasks() {
    // Retorna lista vazia se não tiver arquivo.
    if (!fs.existsSync(TASKS_PATH)) {
        return [];
    }
    // Retorna conteúdo do arquivo JSON.
    return JSON.parse(fs.readFileSync(TASKS_PATH, 'utf8'));
}


function saveTasks(tasks) {
    // Escreve arquivo com conteúdo de tasks.
    fs.writeFileSync(TASKS_PATH, JSON.stringify(tasks));
}


function runCommand(tasks) {
    const [command, ...args] = ARGUMENTS;
    
    // Exibe Mensagem se não tiver argumentos.
    if (!command) { return COMMANDS["help"]["run"]() }
    // Exibe Mensagem se comando for inválido.
    if (!COMMANDS[command]) { 
        console.log(`\n\x1b[33m '${command}' command does not exist. \x1b[0m`);
        console.log(` Try: help \n`);
        process.exit(1);
    }
    
    // Roda o comando.
    COMMANDS[command]["run"](tasks, args);
}


function main() {
    // Carrega as tarefas
    let tasks = loadTasks();
    // Modifica 
    runCommand(tasks);
    // Salva as tarefas
    saveTasks(tasks);
}


main();