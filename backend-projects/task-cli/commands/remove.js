const COMMAND = {
    "description": "Remove a task from the list.",  
    "usage": "remove <id>",
    "run": removeCommand
}


function removeCommand(data, args) {
    // Erro por falta de argumento
    if (!args.length) {
        console.error("  Error: missing id argument.  ");
        return false;
    }
    
    const id = Number(args[0]); 
    
    // Erro se id não for um número válido
    if (isNaN(id) || id < 0) {
        console.error("  Error: id must be positive number.  ");
        return false;
    }
    
    // Erro por muitos argumentos
    if (args.length > 1) {
        console.error("  Error: too many arguments.  ");
        return false;
    }
    
    return removeById(data, id);
}


function removeById(data, id) {
    // Procura por tarefa com o id digitado 
    const index = data["tasks"].findIndex(task => task.id === id);

    // Erro se tarefa com tal id não existir
    if (index === -1) {
        console.error("  Error: task not found.  ");
        return false;
    }

    // Remove tarefa dos dados
    data["tasks"].splice(index, 1);
    
    console.log("  Task removed successfully.  ");
    return true;
}


module.exports = COMMAND;