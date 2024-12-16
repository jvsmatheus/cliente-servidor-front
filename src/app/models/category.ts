export class Category {
    id: number;
    nome: string;

    // Construtor vazio
    constructor(
        id: number = 0,
        nome: string = ''
    ) {
        this.id = id;
        this.nome = nome;
    }

    // Método para exibir informações do usuário
    exibirInfo() {
        console.log(`Nome: ${this.nome}`);
    }
}
