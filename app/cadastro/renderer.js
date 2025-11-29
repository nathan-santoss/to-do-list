const cadastrar_usuario = () => {
    try{
        const novo_usuario = {
            nome: document.getElementById('nome').value,
            email: document.getElementById('email').value,
            cpf: document.getElementById('cpf').value,
            senha: conflit_pass(document.getElementById('senha-1').value, document.getElementById('senha-2').value)
        }
        window.api.cadastro(novo_usuario)
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