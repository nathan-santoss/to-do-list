const ir_cadastro = () => {
    window.location.href = '../cadastro/cadastro.html'
}

const login_user = () => {
    const login_try = {
        email: document.getElementById('email').value,
        senha: document.getElementById('pass').value
    }
    window.api.login(login_try).then((result) => {
        if(!result){
            alert('Dados inválidos!')
            return
        }
        window.location.href = '../home/home.html'
    })
}