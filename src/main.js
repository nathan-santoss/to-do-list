import { app, BrowserWindow, ipcMain, Menu, dialog } from "electron";
import path, { dirname } from 'path'
import { fileURLToPath } from "url";
import fs from 'fs'



const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const preload = path.join(__dirname, 'preload.js')

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
    const paginaHtml = path.join(__dirname, '../app/Login-inicio/login.html')
    win.loadFile(paginaHtml)
    win.removeMenu()
}

app.whenReady().then(() => {
    updade_logs()
    criarJanela()
})

// atualização de usuarios na inicialização >>>>
const updade_logs = () => {
    let lista_antiga = fs.readFileSync(savesLogins, 'utf-8')
    if(users_list.length === 0){
        users_list = JSON.parse(lista_antiga)
        return
    }
}
// CONFIGURAÇÃO DO PRELOAD
let users_list = []
const savesLogins = path.join(__dirname, './usuarios/users.json')
// SOLICITAR CADASTRO
ipcMain.on('solicitacao-cadastro', (event, novo_usuario) => {
    users_list.push(novo_usuario)
    console.log('Usuario criado')
    fs.writeFileSync(savesLogins, JSON.stringify(users_list, null, 2), 'utf-8')
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

