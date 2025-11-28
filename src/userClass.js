export class Pessoa {
    #nome;
    #email;
    #cpf;
    #senha;
    constructor(cadastro) {
        this.nome = cadastro.nome.toUpperCase();
        this.email = cadastro.email.toLowerCase()
        this.cpf = Number(cadastro.cpf)
        this.senha = validar_pass(cadastro.pass1, cadastro.pass2)
    }
}

const validar_pass = (senha1, senha2) => {
    if(senha1 !== senha2){
        //criar alerta para informar senha divergente
        throw
    }
    return senha1
}