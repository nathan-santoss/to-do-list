import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld('api', {
    cadastro: (novo_usuario) => ipcRenderer.invoke('solicitacao-cadastro', novo_usuario),
    login: (user) => ipcRenderer.send('solicitacao-login', user),
    criarTask:(task) => ipcRenderer.send('guardar-task', task),
    getInitTask: () => ipcRenderer.invoke('solicitacao-inicializar'),
    checkBox: (id) => ipcRenderer.send('solicitacao-checked_Box', id),
    update_task: (callback) => ipcRenderer.on('Atualizar-task', (event, dados) => {
        callback(dados)
    })
})
// montando função para atualizar checkbox - olhar chatgpt

