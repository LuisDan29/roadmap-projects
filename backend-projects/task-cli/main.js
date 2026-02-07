const process = require("process");
const path = require("path");
const fs = require("fs");


const DB_PATH = path.join(__dirname, "database", "tasks.json"); 
const ARGUMENTS = process.argv.slice(2);
const COMMANDS = require("./commands/commands.js");


function main() {
    // Carrega as tarefas
    let data = loadData();
    
    // Roda o comando & recebe o status
    let ok = runCommand(data);
    
    // Salva as tarefas se nao houver Erro
    if (ok) {
        saveData(data);  
    } else {
        process.exit(1);
    }
}


function runCommand(data) {
    const [command, ...args] = ARGUMENTS;
    
    // Mensagem de Ajuda
    if (!command || command === "help") {
        return help(args);
    }
    // Erro se comando nao existir
    if (!COMMANDS[command]) { 
        console.error(`  Error: '${command}' command does not exist.  `);
        return false;
    }
    
    // Roda comando
    return COMMANDS[command]["run"](data, args);
}


function help(args) {
    // Ajuda de todos os comandos
    if (!args || !args.length) {
        helpAll();
        return true;
    }
    
    // Erro por muitos argumentos
    if (args.length > 1) {
        console.error("  Error: too many arguments.  ");
        return false;
    }
    
    // Erro se comando nao existir
    if (!COMMANDS[args[0]]) {
        console.error(`  Error: '${args[0]}' command does not exist.  `);
        return false;
    }
    
    // Ajuda de comando específico
    helpCommand(args[0]); 
    return true;
}


function helpAll() {
    let message = "\n\x1b[1;34m  Commands: \x1b[0m\n";
    
    Object.keys(COMMANDS).forEach(command => {
        let label = `    ${command}`.padEnd(13, " ");
        let description = COMMANDS[command]["description"];
        message += label + description + "\n";
    })
    
    console.log(message);
}


function helpCommand(command) {
    let description = COMMANDS[command]["description"];
    let usage = COMMANDS[command]["usage"];
    let message;
    
    message = "\n\x1b[1;34m  Description: \x1b[0m";
    message += description;
    message += "\n\x1b[1;34m  Usage: \x1b[0m";
    message += usage + "\n";
    
    console.log(message);
}


function loadData() {
    // Retorna lista vazia se não tiver arquivo.
    if (!fs.existsSync(DB_PATH)) {
        return [];
    }
    
    // Retorna conteúdo do arquivo JSON.
    return JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
}


function saveData(data) {
    // Escreve arquivo com conteúdo de tasks.
    fs.writeFileSync(DB_PATH, JSON.stringify(data));
}


main();