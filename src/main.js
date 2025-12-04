import { app, BrowserWindow, ipcMain, Menu, dialog } from "electron";
import path, { dirname } from 'path'
import { fileURLToPath } from "url";
import fs from 'fs'



const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const preload = path.join(__dirname, 'preload.js')
const paginaHtml = path.join(__dirname, '../app/Login-inicio/login.html')

let win = null
const criarJanela = () => {
    win = new BrowserWindow({
        width:800, height:900,
        webPreferences:{
            nodeIntegration: false,
            contextIsolation: true,
            devTools: true,
            sandbox: false,
            preload: preload
        }
    })
    win.loadFile(paginaHtml)
    win.removeMenu()
    // win.webContents.openDevTools()
}
const caminho_tasks = path.join(__dirname, "./tasks/tarefas.json")
let list_tasks = null
let users_list = []

app.whenReady().then(() => {
    updade_logs()
    uptade_tasks(caminho_tasks)
    criarJanela()
    
})

// atualização de usuarios na inicialização >>>>
const updade_logs = () => {
    try{
        let endereco = fs.readFileSync(savesLogins, 'utf-8')
        let listaCriada = JSON.parse(endereco)
        if(listaCriada.length === 0){
            return
        }
        users_list = listaCriada
    }catch(err){
        console.log('Erro na busca do endereco de logs');
        return
    }
}
// CONFIGURAÇÃO DO PRELOAD

const savesLogins = path.join(__dirname, './usuarios/users.json')
// SOLICITAR CADASTRO
ipcMain.handle('solicitacao-cadastro', (event, novo_usuario) => {
    users_list.push(novo_usuario)
    console.log('Usuario criado')
    try {
        fs.writeFileSync(savesLogins, JSON.stringify(users_list, null, 2), 'utf-8')
        return true
    } catch (err) {
        console.error(`Erro ao criar usuário: ${err}`)
    }
})

// solicitação de login
ipcMain.on('solicitacao-login', (event, login) => {
    if(users_list.length === 0){
        // inserir aqui um DIALOG para informar que não existem usuários criados
        return
    }
    let existe = users_list.find(user => user.email === login.email && user.senha === login.senha)
    
    if(!existe){
        return null
    }
    win.loadFile(path.join(__dirname, '../app/home/home.html'))
})


// guardar task no json


ipcMain.on('guardar-task', (event, task) => {
    list_tasks.push(task)
    try{
        const task_json = JSON.stringify(list_tasks, null, 2)
        fs.writeFileSync(caminho_tasks, task_json, 'utf-8')
        console.log('tarefa criada com sucesso!');
        uptade_tasks(caminho_tasks)
        win.webContents.send('task-to-home', list_tasks)
    }catch(err){
        console.error(`Erro ao tentar criar tarefa: ${err}`)
    }finally{
        win.loadFile(path.join(__dirname, '../app/home/home.html'))
    }
})
ipcMain.handle('solicitacao-inicializar', () => {
    return list_tasks
})


function uptade_tasks (caminho) {
    try{
        let local = fs.readFileSync(caminho, 'utf-8')
        const fileTask = JSON.parse(local)
        list_tasks = fileTask
        console.log(fileTask);
    }catch(err){
        console.error(`Erro de leitura de tarefas - ${err}`)
        list_tasks = []
    }
}
