const ir_cadastro = () => {
    window.location.href = '../cadastro/cadastro.html'
}

const botao_entrar = document.getElementById('botao-entrar')
document.addEventListener('click', (event) => {
    event.preventDefault()
    login_user()
})



const login_user = () => {
    const login_try = {
        email: document.getElementById('email').value,
        senha: document.getElementById('pass').value
    }
    window.api.login(login_try)
}