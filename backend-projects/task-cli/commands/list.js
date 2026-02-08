const COMMAND = {
    "description": "List all tasks or filter them by status.",  
    "usage": "list [status]",
    "run": listCommand
}

    
function listCommand(data, args) {
    if (!data["tasks"].length) {
        console.error("  Error: no task found.  ");
        return false;
    }
    
    // Lista todas as tarefas
    if (!args.length) {
        listAll(data["tasks"]);
        return true;
    }
    
    // Erro por muitos argumentos
    if (args.length > 1) {
        console.error("  Error: too many arguments.  ");
        return false;
    }   
    
    const statusOptions = ["todo", "in-progress", "done"];
    
    // Erro por status invalido
    if (!statusOptions.includes(args[0])) {
        console.error(`  Error: invalid status "${args[0]}".  `);
        console.error(`\x1b[90m  Statuses: todo | in-progress | done  \x1b[0m`);
        return false;
    }
    
    // Lista tarefas por status especifico
    listByStatus(data["tasks"], args[0]);
    return true;
}


function listByStatus(tasks, status) {
    tasks.forEach(task => {
        if (task["status"] === status) {
            console.log("");
            drawTask(task);
        }
    })
    console.log("");
}


function listAll(tasks) {
    tasks.forEach(task => {
        console.log("");
        drawTask(task);
    })
    console.log("");
}


function drawTask(task) {
    // Exibe os atributos e conteudos da tarefa
    drawAttributte(task, "id", "1;34");
    drawAttributte(task, "description", 37);
    drawAttributte(task, "status", 37);
    drawAttributte(task, "createdAt", 90);
    drawAttributte(task, "updatedAt", 90);   
}


function drawAttributte(obj, attribute, color) {
    let content = obj[attribute];
    label = "  " + attribute.padEnd(13, " ");
    let line = `\x1b[${color}m${label} : ${content}\x1b[0m`;
    
    console.log(line);
}


module.exports = COMMAND;