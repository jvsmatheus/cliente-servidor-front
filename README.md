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

## Executar o Projeto

Para iniciar o servidor de desenvolvimento, execute:

```bash
ng serve
```

O comando iniciará o projeto e fornecerá um link para acessá-lo no navegador, geralmente em [http://localhost:4200](http://localhost:4200).

## Testando o Projeto

Se o projeto incluir testes unitários, eles podem ser executados com o comando:

```bash
ng test
```

## Compilando para Produção

Para gerar os arquivos de produção otimizados, use:

```bash
ng build --prod
```
Os arquivos gerados serão salvos no diretório `dist/`.

## Problemas Comuns

1. **Erro de versão do Node.js ou npm**:
   - Certifique-se de que está usando as versões corretas mencionadas nos pré-requisitos.

2. **Problemas com dependências**:
   - Execute `npm install` novamente para garantir que todas as dependências sejam instaladas corretamente.

3. **Porta em uso**:
   - Se o erro indicar que a porta 4200 está em uso, você pode especificar uma porta diferente:
     ```bash
     ng serve --port 4300
     ```

Agora você está pronto para desenvolver e executar seu projeto Angular!

