const COMMAND = {
    "description": "Lists all tasks.",  
    "usage": "list [status]",
    "run": listCommand
}

    
function listCommand(data, args) {
    // Lista todas as tarefas
    if (!args.length) {
        listAll(data);
        return true;
    }
    
    const statusOptions = ["todo", "in-progress", "done"];
    
    // Erro por muitos argumentos
    if (args.length > 1) {
        console.error("  Error: too many arguments.  ");
        return false;
    }   
    
    // Erro por status invalido
    if (!statusOptions.includes(args[0])) {
        console.error(`  Error: invalid status "${args[0]}".  `);
        console.error(`\x1b[90m  Statuses: todo | in-progress | done  \x1b[0m`);
        return false;
    }
    
    // Lista tarefas por status especifico
    listByStatus(data, args[0]);
    return true;
}


function listByStatus(data, status) {
    data.forEach(task => {
        if (task["status"] === status) {
            drawTask(data, task);
        }
    })
    console.log("");
}


function listAll(data) {
    data.forEach(task => {
        drawTask(data, task);
    })
    console.log("");
}


function drawTask(data, task) {
    // Exibe numeração da tarefa
    const index = data.indexOf(task) + 1;
    console.log(`\n\x1b[1;34m  Task ${index}  \x1b[0m`);
    
    // Exibe os atributos e conteudos da tarefa
    drawAttributte(task, "description", "Description", 37);
    drawAttributte(task, "status", "Status", 37);  
    drawAttributte(task, "id", "ID", 90);  
    drawAttributte(task, "createdAt", "Created At", 90);
    drawAttributte(task, "updatedAt", "Updated At", 90);   
}


function drawAttributte(obj, attribute, label, color) {
    let content = obj[attribute];
    label = "  " + label.padEnd(13, " ");
    let line = `\x1b[${color}m${label} : ${content}\x1b[0m`;
    
    console.log(line);
}


module.exports = COMMAND;