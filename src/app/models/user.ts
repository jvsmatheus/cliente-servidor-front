export class User {
    nome: string;
    email: string;
    senha: string;
    is_admin: boolean;
  
    constructor(nome: string, email: string, senha: string, is_admin: boolean) {
      this.nome = nome;
      this.email = email;
      this.senha = senha;
      this.is_admin = is_admin;
    }
  
    // Método para exibir informações do usuário
    exibirInfo() {
      console.log(`Nome: ${this.nome}`);
      console.log(`Email: ${this.email}`);
      console.log(`Admin: ${this.is_admin ? 'Sim' : 'Não'}`);
    }
  }