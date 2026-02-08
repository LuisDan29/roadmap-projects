const COMMAND = {
    "description": "Add a new task to the list.", 
    "usage": "add <description>",
    "run": addCommand
}

    
function addCommand(data, args) {
    // Exibe Mensagens de Erro
    if (args.length < 1) {
        console.error("  Error: missing task description.  ");
        return false;
    } 
    if (args.length > 1) {
        console.error("  Error: too many arguments.  ");
        return false;
    }
    
    // Atribui id e avança a contagem
    let id = data["nextId"]; 
    data["nextId"]++;
    
    // Modelo do objeto tarefa
    const task = {
        "id": id,
        "description": args[0],
        "status": "todo",
        "createdAt": getToday(),
        "updatedAt": getToday()
    }
    
    // Adiciona tarefa na lista
    data["tasks"].push(task);
    
    console.log("  Task added successfully.  ");
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