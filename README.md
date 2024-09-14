# Projeto Full Stack com Node.js e ReactJS

Este projeto envolve o desenvolvimento de uma aplicação back-end em Node.js e uma aplicação front-end em ReactJS.

Este projeto é um controlador de metas semanais, onde você pode adicionar metas desejadas, definir quantos dias da semana quer trabalhar nelas, e marcar as metas conforme forem concluídas. Ele permite que você visualize e acompanhe seu progresso, ajudando a manter a consciência sobre o cumprimento de suas metas semanais.


![image](https://github.com/user-attachments/assets/611bc676-119a-4459-ba1a-068a6ca0c03f)

## Conteúdos

### Back-end:
- **Node.js** com **TypeScript**
- **Fastify** como framework
- Integração com **DrizzleORM** e **PostgreSQL**
- Contêinerização com **Docker** para rodar o Banco de Dados Postgres
- Validação de dados com **Zod**

### Front-end:
- **ReactJS** com tipagem em **TypeScript**
- Ferramentas de construção com **Vite**
- Interface responsiva com **TailwindCSS**
- Gerenciamento de dados assíncronos com **TanStack Query**
- Consumo da API em **Node.js**

## Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 16+)
- [Docker](https://www.docker.com/) (para rodar o PostgreSQL)

## Instruções de Instalação

1. Clone o repositório:

    ```bash
    git clone https://github.com/ArthurFeu/InOrbit
    ```

2. Acesse a pasta raiz do projeto:

    ```bash
    cd InOrbit
    ```

3. Instale as dependências:

Instale-as na raiz, entre na pasta .\server e .\web e também execute o comando para garantir que todas as dependências estejam instaladas.

    ```bash
    npm install
    ```

4. (Opcional) Se você estiver usando o PostgreSQL com Docker, inicie o banco de dados:

    ```bash
    docker-compose up -d
    ```

    > Certifique-se de configurar corretamente o arquivo `.env` com as variáveis de ambiente, incluindo as credenciais do banco de dados.

5. Execute a aplicação:

    ```bash
    npm run dev
    ```

Isso iniciará tanto o back-end quanto o front-end.


![image](https://github.com/user-attachments/assets/134edb1c-1df6-4c96-acf3-3728a8dee874)

---



