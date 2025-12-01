import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld('api', {
    cadastro: (novo_usuario) => ipcRenderer.invoke('solicitacao-cadastro', novo_usuario),
    login: (user) => ipcRenderer.invoke('solicitacao-login', user),
    abrirTask: () => ipcRenderer.send('abrir-task')
})