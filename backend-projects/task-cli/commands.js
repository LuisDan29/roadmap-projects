const process = require("process");


const COMMANDS = {
    "add": { 
        "description": "Add a new task.", 
        "usage": "add <description>",
        "run": addCommand
    },
    "list": { 
        "description": "Lists all tasks.",  
        "usage": "list [status]",
        "run": listCommand
    },
    "help": { 
        "description": "Show a help message.", 
        "usage": "help [command]",
        "run": help
    }
}


// ADD COMMAND
function addCommand(tasks, args) {
    // Exibe Mensagens de Error
    if (args.length < 1) {
        console.log("\n\x1b[33m missing task description. \x1b[0m");
        console.log(` Usage: ${COMMANDS["add"]["usage"]} \n`);
        process.exit(1);
    } 
    if (args.length > 1) {
        console.log("\n\x1b[33m too many arguments. \x1b[0m");
        console.log(` Usage: ${COMMANDS["add"]["usage"]} \n`);
        process.exit(1);
    }
    
    // Cria ID da tarefa, 8 digitos
    let id = Date.now().toString();
    id = Number(id.slice(-8));
    
    // Modelo do objeto tarefa
    const task = {
        "id": id,
        "description": args[0],
        "status": "todo",
        "createdAt": getToday(),
        "updatedAt": getToday()
    }
    
    // Adiciona tarefa na lista
    tasks.push(task);
    console.log(" Task added successfully. ");
}


function getToday() {
    const date = new Date()
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString();  
    const day = date.getDate().toString();
    
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
}


// LIST COMMAND
function listCommand(tasks, args) {
    // Lista todas as tarefas
    if (!args.length) {
        listAll(tasks);
        process.exit(0);
    }
    
    const statusOptions = ["todo", "in-progress", "done"];
    
    // Exibe Mensagem se o status for invalido
    if (!statusOptions.includes(args[0])) {
        console.log(`\n\x1b[33m invalid status "${args[0]}". \x1b[0m`);
        console.log(` Usage: ${COMMANDS["list"]["usage"]} `);
        console.log(`\x1b[90m Statuses: todo | in-progress | done \x1b[0m\n`);
        process.exit(1);
    }
    
    // Exibe Erro se tiver mais de um argumento
    if (args.length > 2) {
        console.log("\n\x1b[33m too many arguments. \x1b[0m");
        console.log(` Usage: ${COMMANDS["list"]["usage"]} \n`);
        process.exit(1);
    }
    
    // Lista tarefas por status especifico
    listByStatus(tasks, args[0]);
}


function listByStatus(tasks, status) {
    tasks.forEach(task => {
        if (task["status"] === status) {
            drawTask(tasks, task)
        }
    })
}


function listAll(tasks) {
    tasks.forEach(task => {
        drawTask(tasks, task);
    })
}


function drawTask(tasks, task) {
    // Exibe numeração da tarefa
    const index = tasks.indexOf(task) + 1;
    console.log(`\n\x1b[1;34m Task ${index}\x1b[0m`);
    
    // Exibe os atributos e conteudos da tarefa
    drawAttributte(task, "description", "Description", 37);
    drawAttributte(task, "status", "Status", 37);  
    drawAttributte(task, "id", "ID", 90);  
    drawAttributte(task, "createdAt", "Created At", 90);
    drawAttributte(task, "updatedAt", "Updated At", 90);   
}


function drawAttributte(obj, attribute, label, color) {
    let content = obj[attribute];
    label = " " + label.padEnd(12, " ");
    let line = `\x1b[${color}m${label} : ${content}\x1b[0m`;
    
    console.log(line);
}


// HELP COMMAND
function help(tasks, args) {
    // Mostra ajuda geral
    if (!args || !args.length) {
        helpAll();
        process.exit(0);
    }
    
    // Erro se tiver mais de 1 argumento
    if (args.length > 1) {
        console.log("\n\x1b[33m too many arguments. \x1b[0m");
        console.log(` Usage: ${COMMANDS["help"]["usage"]} \n`);
        process.exit(1);
    }

    // Erro se comando passado nao existir    
    if (!COMMANDS[args[0]]) {
        console.log(`\n\x1b[33m '${args[0]}' command does not exist. \x1b[0m`);
        console.log(` Usage: ${COMMANDS["help"]["usage"]} \n`);
        process.exit(1);
    }
    
    // Mostra ajuda de comando específico
    helpCommand(args[0]);
}


function helpAll() {
    let message = "\n\x1b[1;34m Commands: \x1b[0m\n";
    
    Object.keys(COMMANDS).forEach(command => {
        let label = `   ${command}`.padEnd(12, " ");
        let description = COMMANDS[command]["description"];
        message += label + description + "\n";
    })
    
    console.log(message);
}


function helpCommand(command) {
    let description = COMMANDS[command]["description"];
    let usage = COMMANDS[command]["usage"];
    let message;
    
    message = "\n\x1b[1;34m Description: \x1b[0m";
    message += description;
    message += "\n\x1b[1;34m Usage: \x1b[0m";
    message += usage + "\n";
    
    console.log(message);
}


module.exports = COMMANDS;