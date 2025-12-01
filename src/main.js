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
            devTools: false,
            sandbox: false,
            preload: preload
        }
    })
    win.loadFile(paginaHtml)
    win.removeMenu()
}

app.whenReady().then(() => {
    updade_logs()
    criarJanela()
})

let taskWindow = null
const startTask = () => {
    taskWindow = new BrowserWindow({
        width: 800, height: 900,
        webPreferences:{
            nodeIntegration: false,
            contextIsolation: true,
            devTools: false,
            sandbox: false,
            preload: preload
        }
    })
    taskWindow.loadFile(path.join(__dirname, '../app/home/taskWindow/task.html'))
    taskWindow.removeMenu()
}

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
let users_list = []
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

ipcMain.handle('solicitacao-login', (event, login) => {
    let existe = users_list.find(user => user.email === login.email && user.senha === login.senha)
    try{
        if(!existe){throw new Error('Error: Usuario não existe')}
        else{
            return existe
        }
    }catch(err){
        console.error(err)
    }
})

ipcMain.on('abrir-task', () => {
    startTask()
})

