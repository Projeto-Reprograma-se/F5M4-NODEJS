const axios = require('./api.js');
const fs = require('fs').promises;
const prompt = require('prompt-sync')();
const { exit } = require('process');

async function start() {
  console.log('Bem-vindo ao sistema de gerenciamento de tarefas');
  console.log('O que você quer fazer?');
  console.log();
  
  while (true) {
    console.log('1 - Cadastrar nova tarefa');
    console.log('2 - Alterar uma tarefa');
    console.log('3 - Marcar tarefa como concluída');
    console.log('4 - Excluir uma tarefa');
    console.log('5 - Listar tarefas pendentes')
    console.log('6 - Listar tarefas concluídas')
    console.log('0 - Sair do sistema')
    console.log();
    
    const option = Number(prompt('Digite a opção desejada: '));
    
    switch (option) {
      case 1:
        await cadastroTarefa();
        break;
      case 2:
        await alterarTarefa();
        break;
      case 3: 
        await marcaConcluida();
        break;
      case 4:
        await excluirTarefa();
        break;
      case 5:
        await listarPendentes();
        break;
      case 6:
        await listarConcluidas();
        break;
      case 0:
        console.log('Saindo do sistema...');
        return process.exit();
      default:
        console.log('Opção inválida, tente novamente!');
    }
  }
}

async function cadastroTarefa(){
  const id = Number(prompt('Digite o ID: '));
  const disc = prompt('Digite a tarefa: ');

  try{
    var response = await axios.api.post('/tarefas',{
      id: id,
      descricao: disc,
      status: "Pendente"
    })
    console.log('Concluido com sucesso!');
  }catch(error){
    console.log();
    console.log("Ocorreu um erro no cadastro", error.message);
    console.log();
  }
}
async function alterarTarefa(){
  const id = Number(prompt("Digite o ID da tarefa que será alterada: "));
  const disc = prompt("Digite a nova descrição para a tarefa: ");
  
  try{
    var response = await axios.api.put(`/tarefas/${id}`,{
      id: id,
      descricao: disc,
      status: "Pendente"
    })
    console.log();
    console.log('Concluido com sucesso!');
    console.log();
  }catch(error){
    console.log();
    console.log("Ocorreu um erro ao alterar a tarefa", error.message);
    console.log();
  }
}
async function marcaConcluida(){
    const id = Number(prompt("Digite o ID para conclusão: "));
  
    try{
      const response = await axios.api.patch(`/tarefas/${id}`, {
        status: 'Concluída'
      });
      console.log('Concluido com sucesso!', response.data);
    }catch(error){
      console.log("Ocorreu um erro no cadastro", error.message);
    }
  }
async function excluirTarefa(){
    const id = Number(prompt("Digite o ID para deletar: "));
  
  try{
    var response = await axios.api.delete(`/tarefas/${id}`);
    console.log('Concluido com sucesso!');
  }catch(error){
    console.log();
    console.log("Ocorreu um erro para deletar", error.message);
    console.log();
  }
}
  async function listarPendentes() {
  
    try{
      var response = await axios.api.get('/tarefas')
      var tarefas = response.data.filter(tarefa => tarefa.status === 'Pendente' )
      console.table(tarefas);
    }catch(error){
      console.log("Ocorreu um erro no cadastro", error.message);
    }
  }
async function listarConcluidas() {

  try{
    var response = await axios.api.get('/tarefas')
    var tarefas = response.data.filter(tarefa => tarefa.status === 'Concluída' )
    console.table(tarefas);
  }catch(error){
    console.log("Ocorreu um erro no cadastro", error.message);
  }
}
start();



