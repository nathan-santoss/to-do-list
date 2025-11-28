import { app, BrowserWindow, ipcMain, Menu, dialog } from "electron";
import path, { dirname } from 'path'
import { fileURLToPath } from "url";
import fs from 'fs'
import { Pessoa } from "./userClass.js";


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
}

app.whenReady().then(() => {
    criarJanela()
})


// CONFIGURAÇÃO DO PRELOAD

// SOLICITAR CADASTRO
ipcMain.on('solicitacao-cadastro', (event, novo_usuario) => {
    const usuario = new Pessoa(novo_usuario)
})
