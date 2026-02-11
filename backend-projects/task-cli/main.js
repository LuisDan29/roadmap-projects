const process = require("process");
const path = require("path");
const fs = require("fs");


const DB_PATH = path.join(__dirname, "database", "tasks.json"); 
const ARGUMENTS = process.argv.slice(2);
const COMMANDS = require("./commands/commands.js");


function main() {
    let data = loadData();
    
    // Executa comando e recebe status
    let ok = runCommand(data);
    
    if (ok) {
        // Salva o arquivo se tudo estiver ok
        saveData(data);  
    } else {
        // Encerra o processo se houver erro
        process.exit(1);
    }
}


function loadData() {
    // Retorna estrutura inicial de dados se arquivo não existir
    if (!fs.existsSync(DB_PATH)) {
        return {
            "nextId": 1,
            "tasks": []
        };
    }
    
    // Retorna dados do arquivo
    return JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
}


function runCommand(data) {
    const [command, ...args] = ARGUMENTS;
    
    // Mensagem de Ajuda se usuário não passar comando
    if (!command || command === "help") {
        return help(args);
    }
    // Erro se comando não existir
    if (!COMMANDS[command]) { 
        console.error(`  Error: '${command}' command does not exist.  `);
        return false;
    }
    
    // Executa o comando
    return COMMANDS[command]["run"](data, args);
}


function saveData(data) {
    // Salva o arquivo
    fs.writeFileSync(DB_PATH, JSON.stringify(data));
}


function help(args) {
    // Mensagem de Ajuda geral
    if (!args || !args.length) {
        helpAll();
        return true;
    }
    
    // Erro por muitos argumentos
    if (args.length > 1) {
        console.error("  Error: too many arguments.  ");
        return false;
    }
    
    // Erro se comando não existir
    if (!COMMANDS[args[0]]) {
        console.error(`  Error: '${args[0]}' command does not exist.  `);
        return false;
    }
    
    // Executa Mensagem de Ajuda específica pro comando
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


main();