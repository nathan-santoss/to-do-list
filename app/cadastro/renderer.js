const cadastrar_usuario = (event) => {
    try{
        const novo_usuario = {
            nome: document.getElementById('nome').value,
            email: document.getElementById('email').value,
            cpf: document.getElementById('cpf').value,
            senha: conflit_pass(document.getElementById('senha-1').value, document.getElementById('senha-2').value)
        }
        window.api.cadastro(novo_usuario).then((result) => {
            if(result === false){
                throw new Error('Erro ao tentar criar usuário')
            }
            window.location.href = '../Login-inicio/login.html'
        })
    }catch(err){
        console.error(err)
        return
    }
}

const conflit_pass = (p1, p2) => {
    if(p1 !== p2){
        throw new Error('Erro: As senhas não coincidem')
    }
    return p1
}

document.addEventListener('DOMContentLoaded', (event) => {
    const botao_finish = document.getElementById('botao-save')
    if(botao_finish){
        botao_finish.addEventListener('click', cadastrar_usuario)
    }
})