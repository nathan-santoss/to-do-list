import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld('api', {
    cadastro: (novo_usuario) => ipcRenderer.invoke('solicitacao-cadastro', novo_usuario),
    login: (user) => ipcRenderer.send('solicitacao-login', user),
    criarTask:(task) => ipcRenderer.send('guardar-task', task),
    makeTask: (tarefas) => ipcRenderer.on('task-to-home', tarefas, usuario),
    getInitTask: () => ipcRenderer.invoke('solicitacao-inicializar')
})