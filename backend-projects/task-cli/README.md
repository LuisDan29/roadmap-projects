# Task Tracker CLI

Projeto baseado no desafio **Task Tracker** do roadmap.sh.

Este projeto consiste em um **gerenciador de tarefas via linha de comando**, onde é possível criar, editar, listar e remover tarefas diretamente pelo terminal.
As tarefas são armazenadas em um **arquivo JSON**, permitindo persistência dos dados entre execuções.

## Tecnologias
- Node.js
- JavaScript

## Como rodar
1. Clone o repositório
2. Acesse a pasta do projeto pelo terminal
3. Execute os comandos usando `node`

## Como usar / Funcionalidades

```bash
# Exibe comandos possíveis
node main.js 
node main.js help

# Exibe ajuda para comando específico
node main.js help add
node main.js help mark

# Adicionar nova tarefa
node main.js add "Comprar mantimentos"

# Atualizar descrição da tarefa 1
node main.js update 1 "Comprar e preparar compra"

# Marcar tarefa 1
node main.js mark in-progress 1
node main.js mark done 1
node main.js mark todo 1

# Deletar tarefa 1
node main.js remove 1

# Listar todas
node main.js list

# Listar por status
node main.js list done
node main.js list todo
node main.js list in-progress
```

---

🔗 Link do Desafio: https://roadmap.sh/projects/task-tracker