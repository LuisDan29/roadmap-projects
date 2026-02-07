const COMMAND = {
    "description": "Removes a task",  
    "usage": "remove <id> [--index]",
    "run": removeCommand
}


function removeCommand(data, args) {
    // Erro por falta de argumento
    if (!args.length) {
        console.error("  Error: missing id argument.  ");
        return false;
    }
    
    const id = Number(args[0]); 
    
    // Erro por tipo errado
    if (isNaN(id) || id <= 0) {
        console.error("  Error: id must be positive number greater than zero.  ");
        return false;
    }
    
    // Erro por muitos argumentos
    if (args.length > 2) {
        console.error("  Error: too many arguments.  ");
        return false;
    }
    
    // Se tiver flag
    if (args[1]) {
        // Erro por flag invalida
        if (args[1] !== "--index") {
            console.error("  Error: invalid flag.  ");
            return false;    
        }
        
        return removeByIndex(data, id);
    }
    
    return removeById(data, id);
}


function removeByIndex(data, index) {
    data.splice(index - 1, 1);
    console.log("  Task removed successfully.  ");
    return true;
}


function removeById(data, id) {
    let taskExists = false;
    let taskObj;
    
    data.forEach(task => {
        if (task["id"] === id) {
            taskExists = true;
            taskObj = task;
        }
    })
    
    if (!taskExists) {
        console.error("  Error: task not found.  ");
        return false;
    }
    
    data.pop(taskObj);
    console.log("  Task removed successfully.  ");
    return true;
}


module.exports = COMMAND;