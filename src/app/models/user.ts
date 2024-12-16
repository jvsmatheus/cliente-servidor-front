export class User {
    nome: string;
    email: string;
    senha: string;
    admin: boolean;

    // Construtor vazio
    constructor(
        nome: string = '',
        email: string = '',
        senha: string = '',
        admin: boolean = false
    ) {
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.admin = admin;
    }

    // Método para exibir informações do usuário
    exibirInfo() {
        console.log(`Nome: ${this.nome}`);
        console.log(`Email: ${this.email}`);
        console.log(`Admin: ${this.admin ? 'Sim' : 'Não'}`);
    }
}
