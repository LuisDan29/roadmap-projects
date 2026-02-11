const COMMAND = {
    "description": "Change the status of a task.", 
    "usage": "mark <status> <id>",
    "run": markCommand
}


function markCommand(data, args) {
    // Erro por falta de argumentos
    if (!args.length) {
        console.error("  Error: missing status and id argument.  ");
        return false;
    }
    
    // Erro por muitos argumentos
    if (args.length > 2) {
        console.error("  Error: too many arguments.  ");
        return false;
    }
    
    const statusOptions = ["todo", "in-progress", "done"];
    
    // Erro se usuário digitar um status inválido
    if (!statusOptions.includes(args[0])) {
        console.error(`  Error: invalid status "${args[0]}".  `);
        console.error(`\x1b[90m  Statuses: todo | in-progress | done  \x1b[0m`);
        return false;
    }
    
    // Erro se usuário não digitar um id
    if (!args[1]) {
        console.error("  Error: missing id argument.  ");
        return false;
    }
    
    const id = Number(args[1]); 
    
    // Erro se id não for um número válido
    if (isNaN(id) || id < 0) {
        console.error("  Error: id must be positive number.  ");
        return false;
    }
    
    const index = data["tasks"].findIndex(task => task.id === id);
    
    // Erro se tarefa com tal id não existir
    if (index === -1) {
        console.error("  Error: task not found.  ");
        return false;
    }

    data["tasks"][index]["status"] = args[0];
    data["tasks"][index]["updatedAt"] = getToday();
    
    console.log("  Task status changed.  ");
    return true;
}


function getToday() {
    const date = new Date()
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString();  
    const day = date.getDate().toString();
    
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
}


module.exports = COMMAND;