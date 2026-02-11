const COMMAND = {
    "description": "Update the description of an existing task.",  
    "usage": "update <id> <description>",
    "run": updateCommand
}


function updateCommand(data, args) {
    // Erro por falta de argumento
    if (!args.length) {
        console.error("  Error: missing id and description argument.  ");
        return false;
    }
    
    // Erro por muitos argumentos
    if (args.length > 2) {
        console.error("  Error: too many arguments.  ");
        return false;
    }
    
    const id = Number(args[0]); 
    
    // Erro se id não for um número válido
    if (isNaN(id) || id < 0) {
        console.error("  Error: id must be positive number.  ");
        return false;
    }
    
    // Erro por falta de uma nova descrição pra tarefa
    if (!args[1]) {
        console.error("  Error: missing description argument.  ");
        return false;
    }
    
    const index = data["tasks"].findIndex(task => task.id === id);
    
    // Erro se tarefa com tal id não existir
    if (index === -1) {
        console.error("  Error: task not found.  ");
        return false;
    }
    
    data["tasks"][index]["description"] = args[1];
    data["tasks"][index]["updatedAt"] = getToday();
    
    console.log("  Task updated.  ");
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