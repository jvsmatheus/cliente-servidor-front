# Angular Application Setup

Este guia explica como baixar, instalar e executar um projeto Angular com as seguintes especificações:

- **Angular CLI**: 19.0.2
- **Node.js**: 22.11.0
- **Gerenciador de pacotes (npm)**: 10.9.0

## Pré-requisitos

Antes de começar, certifique-se de que você tem o seguinte instalado em sua máquina:

1. **Node.js 22.11.0**:
   - Baixe e instale a versão 22.11.0 do [site oficial do Node.js](https://nodejs.org/).
   - Após a instalação, verifique a versão do Node.js executando no terminal:
     ```bash
     node -v
     ```

2. **npm 10.9.0** (já incluído com o Node.js):
   - Verifique a versão do npm executando:
     ```bash
     npm -v
     ```

3. **Angular CLI 19.0.2**:
   - Instale globalmente usando o seguinte comando:
     ```bash
     npm install -g @angular/cli@19.0.2
     ```
   - Verifique a versão do Angular CLI:
     ```bash
     ng version
     ```

## Clonar o Repositório

Baixe o código-fonte do projeto usando Git:

```bash
git clone <URL_DO_REPOSITORIO>
```
Substitua `<URL_DO_REPOSITORIO>` pelo link do repositório do projeto.

## Instalação de Dependências

Navegue até o diretório do projeto clonado:

```bash
cd <NOME_DO_DIRETORIO>
```
Substitua `<NOME_DO_DIRETORIO>` pelo nome do diretório onde o projeto foi clonado.

Em seguida, instale as dependências do projeto com o npm:

```bash
npm install
```

Em seguida adicione o IP e porta da api no seguinte arquivo `enviroment.development.ts` no campo `api_url` no seguinte modelo

```bash
http://localhost:22222/
```

## Executar o Projeto

Para iniciar o servidor de desenvolvimento, execute:

```bash
ng serve
```

O comando iniciará o projeto e fornecerá um link para acessá-lo no navegador, geralmente em [http://localhost:4200](http://localhost:4200).


