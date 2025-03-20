<<<<<<< HEAD
<<<<<<< HEAD
<p align="center">
  <img src="public/Fiap-logo.jpg" width="400" /></a>
</p>

# ✨ Implementação do Front-End do Blog Post

Este é um projeto de aplicativo de blog onde os usuários podem criar, editar e visualizar posts. A aplicação foi construída utilizando o framework Next.js, TypeScript, Styled-components, React Context API, Fetch API para chamadas a APIs externas, e autenticação com JWT armazenado em cookies. O design do projeto segue uma arquitetura moderna e modular, com foco na escalabilidade e na experiência do usuário.

Será apresentada a maneira de execução de cada step do projeto contendo informações cruciais sobre como configurar, usar e contribuir com o projeto.

## 🎯 Objetivos do Projeto

- Desenvolver uma interface gráfica para aplicação de blogging, utilizando React.js.
- Aplicação deve ser responsiva, acessível e fácil de usar.
- Implementar o uso de endpoints REST para permitir a interação entre os usuários e o conteúdo do blog.

## 🛠️ Ferramentas Utilizadas

A equipe utilizou as seguintes ferramentas durante o desenvolvimento do projeto:

- **Visual Studio Code**: Ferramenta utilizada para escrita e execução de código, com extensões específicas para JavaScript e Node.js. Sua integração com o terminal permite rodar o servidor diretamente dentro do editor, facilitando o desenvolvimento, testes e depuração de endpoints.

- **GitHub**: O GitHub ofereceu controle de versão, permitindo que cada membro da equipe trabalhasse em diferentes funcionalidades sem afetar o código principal. A utilização de pull requests facilitou a revisão de código e a integração das mudanças, garantindo qualidade e consistência. O GitHub também integrou ferramentas de CI/CD, automatizando testes e o deploy do código.

- **Next.js**: Framework para React que permite renderização do lado do servidor (SSR) e geração de sites estáticos (SSG). Foi utilizado para criar uma estrutura escalável e otimizada para o aplicativo, aproveitando seus recursos como roteamento automático, APIs e renderização híbrida.

- **React**: Biblioteca JavaScript para construção de interfaces de usuário. O React foi utilizado para criar a interação dinâmica da aplicação, permitindo atualizações eficientes do DOM e gerenciamento de estado de forma reativa.

- **Styled-components**: Biblioteca que permite escrever CSS dentro de componentes React, criando componentes de estilo com escopo isolado. Utilizamos o Styled-components para garantir uma estilização modular, reutilizável e de fácil manutenção, além de evitar conflitos de estilo entre diferentes partes da aplicação.

-**JWT (JSON Web Token)**: Utilizado para autenticação e autorização de usuários. O JWT é um token seguro transmitido entre o cliente e o servidor, permitindo que o usuário acesse áreas protegidas com base na autenticação bem-sucedida.

- **js-cookie**: Biblioteca utilizada para manipulação de cookies no lado do cliente. Foi utilizada para armazenar e recuperar o token JWT de maneira eficiente, garantindo que o estado de autenticação fosse mantido durante a navegação.

- **Fetch API**: Usada para fazer requisições HTTP e buscar dados de uma API externa. A Fetch API foi utilizada para buscar os posts do servidor e enviar as informações do usuário, permitindo uma integração fluida com a API do backend.


## 🏗️ Arquitetura da Aplicação

A arquitetura do projeto segue o padrão da **NextJS**, que utiliza uma arquitetura JAMStack, que se caracteriza por um desenvolvimento de front-end independente de back-end, com foco em APIs e serviços de terceiros, e que permite a entrega de aplicações web rápidas e eficientes. Seguindo uma estrutura **App Routes** e **Page Router** permitindo que o projeto seja organizadod e forma modular e escalável, promevendo uma navegação intuitiva e otimizada, com rotas dinâmicas, layouts reutilizáveis e carregamento assíncrono de dados. Essa abordagem melhora tanto a experiência de desenvolvimento quanto a experiência do usuário, tornando o código mais limpo e fácil de manter.

A arquitetura segue o padrão **NextJS**, organizada em **App e Pages**, com:

- **App**: O diretório App define o layout global da aplicação e a página principal (root). Ele também contém os componentes comuns, como o cabeçalho, rodapé e outras estruturas reutilizáveis que são compartilhadas entre as várias páginas da aplicação.
- **Pages**: O diretório Pages contém os subdiretórios e arquivos de página específicos. Cada arquivo em Pages é tratado como uma rota e é automaticamente associada a uma URL específica. Isso inclui páginas como login, criação de posts, edição de posts e detalhes de posts, onde cada uma delas é responsável por exibir um conteúdo específico ao usuário.

### 📖 Estrutura dos diretórios:

A estrutura utilizada segue as convenções do Next.js para separação de componentes, páginas e contextos, mantendo o código modular e escalável.

```
src/
  app/
    components/
      Hero.tsx       Componente Hero utilizado para criar uma espécie de introdução ao portal
      Navbar.tsx     Componente Navbar cria os componentes na barra de navegação do portal
      PostCard.tsx   Componente PostCard exibe um cartão de post na Home e o acesso ao seu conteúdo
      Separator.tsx  Componente Separator utilizado para separar visualmente as seções de conteúdo
    context/
      authContext.tsx Contexto de autenticação centralizado
    styles/
      global.css     Estilos globais do projeto
    layout.tsx       Layout principal da aplicação
    page.css         Estilos específicos da página
    page.tsx         Página principal (Home)
    _app.tsx         Componente principal da aplicação
  pages/
    admin/
      index.tsx      Página administrativa
    create/
      index.tsx      Página de criação de post
    edit/
      [id].tsx       Página de edição de post (roteamento dinâmico)
    login/
      index.tsx      Página de login
    post/
      [id].tsx       Página de detalhes do post (roteamento dinâmico)
package.json
```

### 🖌️ Funcionalidades
1. Página de Login:

  - O usuário pode inserir um email e senha para se autenticar.
  - O sistema redireciona o usuário para a página correta após a autenticação (/admin ou /create).

2. Página de Criação de Post:

  - Os usuários autenticados podem criar novos posts. O título, conteúdo, autor, introdução, imagem e link de vídeo podem ser definidos.

3. Página de Edição de Post:

  - Os usuários podem editar posts existentes acessando a URL /edit/[id], onde [id] é o identificador do post.
  - A edição é feita por meio de um formulário onde o usuário pode atualizar os campos.

4. Página de Detalhes do Post:

  - A página exibe os detalhes de um post específico, acessado pela URL /post/[id]

## 🚀 Como rodar o projeto

### Pré-requisitos

- Node.js instalado (versão recomendada: 20.x ou superior).
- npm instalado.

### Passos:

#### Clone este repositório:

```bash
git clone https://github.com/Fiap-FSD/tech-3.git
cd tech-3
```

#### Instale as bibliotecas:

No terminal do projeto, rode:

```bash
 npm install
```

#### Configuração do ambiente:

Crie um arquivo .env.local na raiz do projeto e adicione as variáveis de ambiente necessárias, como a URL da API backend:

```bash
  NEXT_PUBLIC_API_URL=https://blog-posts-hori.onrender.com
```

#### Rodando Localmente:

No terminal do projeto, rode:

```bash
 npm run dev
```

### Fluxo de Navegação
- A página inicial será carregada automaticamente.
- Para fazer login, acesse a página /login.
- Após o login, o usuário será redirecionado para a página home.
- Para editar um post, acesse /edit/[id], onde [id] é o identificador do post.
- Para visualizar os detalhes de um post, acesse /post/[id].

### Fluxo de Autenticação

A autenticação é feita usando JWT. Quando o usuário faz login, o token JWT é armazenado em um cookie e enviado com cada requisição subsequente. Caso o token não seja encontrado ou seja inválido, o usuário será redirecionado para a página de login.

#### Abra no seu navegador

Com o link que aparecerá no seu terminal, copie e cole no seu navegador.

👉 **[Link para o vídeo](https://youtu.be/ILa9iL7bAOs)**  

## 📜 Conclusão

Este projeto proporcionou a oportunidade de aprimorar habilidades no desenvolvimento front-end, utilizando tecnologias modernas e poderosas como React.js, NextJS, Axios, TailwindCSS e Styled-components. Ao longo do desenvolvimento, foi possível criar uma interface gráfica dinâmica, responsiva e intuitiva para a aplicação de blog, que se conecta de forma eficiente com a API do back-end.

A arquitetura adotada, baseada no padrão NextJS e no conceito de JAMstack, permitiu um desenvolvimento ágil, com foco em modularidade, escalabilidade e otimização de performance. A integração do Axios facilitou as requisições HTTP, enquanto o uso do TailwindCSS e Styled-components proporcionou uma experiência de design fluída e flexível, permitindo um controle preciso dos estilos.

O projeto também reforçou a importância de boas práticas de desenvolvimento, como controle de versão via GitHub, e integração de ferramentas de CI/CD para garantir a qualidade do código. A aplicação está pronta para ser utilizada por docentes e alunos, permitindo uma interação eficaz com os posts do blog, proporcionando um ambiente de leitura agradável e funcional.

Com essa implementação, o projeto evolui para um sistema mais robusto, modular e de fácil manutenção, alinhado com as melhores práticas de desenvolvimento web modernas. Estamos confiantes de que essa solução trará uma excelente experiência para os usuários finais.

> [!CAUTION]
> AJEITAR A CONCLUSÃO

<<<<<<< HEAD
=======
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.
=======
# Getting Started with Create React App
=======
<p align="center">
  <img src="public/Fiap-logo.jpg" width="400" /></a>
</p>
>>>>>>> master

# ✨ Refatoração do Back-End do Blog Post

Este documento descreve o processo de desenvolvimento do refatoramento da parte Back-End do blog post. A aplicação foi inicialmente desenvolvida utilizando a plataforma OutSystems. Para esta nova etapa, o back-end da aplicação foi refatorado utilizando Node.js, utilizando o framkework NestJS, REST APIs, GitHub, Docker e MongoDB para persistência de dados.

Será apresentada a maneira de execução de cada step do projeto contendo informações cruciais sobre como configurar, usar e contribuir com o projeto.

## 🎯 Objetivos do Projeto

- Refatorar o back-end da aplicação de blogging para professores, e alunos, utilizando Node.js.
- Implementação de uma API RESTful com endpoints definidos para a criação, leitura, edição, exclusão e busca de postagens.
- Utilizar MongoDB como banco de dados para persistência dos dados.
- Utilizar Docker para garantir consistência, escalabilidade e facilitar o deploy do projeto.

## 🛠️ Ferramentas Utilizadas

A equipe utilizou as seguintes ferramentas durante o desenvolvimento do projeto:

- **Visual Studio Code**: Ferramenta utilizada para escrita e execução de código, com extensões específicas para JavaScript e Node.js. Sua integração com o terminal permite rodar o servidor diretamente dentro do editor, facilitando o desenvolvimento, testes e depuração de endpoints.

- **GitHub**: O GitHub ofereceu controle de versão, permitindo que cada membro da equipe trabalhasse em diferentes funcionalidades sem afetar o código principal. A utilização de pull requests facilitou a revisão de código e a integração das mudanças, garantindo qualidade e consistência. O GitHub também integrou ferramentas de CI/CD, automatizando testes e o deploy do código.

- **MongoDB**: O banco de dados NoSQL foi escolhido por sua flexibilidade e integração com Node.js através de bibliotecas como o Mongoose, permitindo uma maneira dinâmica de armazenar dados.

- **Docker**: O Docker permitiu o empacotamento da aplicação e suas dependências em contêineres, garantindo consistência entre os ambientes de desenvolvimento e produção. O Docker Hub foi utilizado para armazenar e compartilhar as imagens dos contêineres.

- **Render**: Foi utilizado o Render como plataforma de hospedagem, o que simplificou o processo de deploy e gerenciamento da aplicação. O Render forneceu uma infraestrutura que permitiu que a equipe se concentrasse no desenvolvimento, sem se preocupar com a administração de servidores. O uso do Render foi fundamental para otimizar o fluxo de trabalho, garantindo agilidade no deploy e confiabilidade na execução da aplicação.


## 🏗️ Arquitetura da Aplicação

A arquitetura do projeto segue o padrão de **API RESTful**, que permite interações simples e claras entre o cliente e o servidor. A principal divisão da aplicação é composta por:

- **NestJS**: Framework para o desenvolvimento do back-end, que organiza o código em módulos e controladores, facilitando a manutenção, escalabilidade e reutilização de componentes.
- **MongoDB**: Banco de dados NoSQL utilizado para persistir as postagens e informações de usuários de forma flexível.
- **Docker**: Utilizado para empacotar a aplicação e suas dependências, garantindo consistência entre os ambientes de desenvolvimento e produção.
- **Render**: Plataforma de hospedagem utilizada para o deploy da aplicação, permitindo o gerenciamento simplificado de servidores e escalabilidade.

A arquitetura segue o padrão **NestJS**, organizada em **Controller, Providers, Modules**, com:

- **Controller**: Responsável pelo processamento das requisições HTTP e retorno de uma resposta para o client.
- **Providers**: São classes que executam a lógica central da aplicação. Podem ser de vários tipos de classes, como services, repositories e helpers.
- **Modules**: Organizam a aplicação de maneira modular e registram os componentes que ela utiliza. E cada módulo gerencia um conjunto específico de responsabilidades e pode importar ou exportar outros módulos para compartilhar funcionalidades.
  

## 🚀 Como rodar o projeto

<<<<<<< HEAD
To learn React, check out the [React documentation](https://reactjs.org/).
>>>>>>> 9da4ea3fc36642c8215fc5488ea616ce958dd24f
=======
### Pré-requisitos

- Node.js instalado (versão recomendada: 16.x ou superior).
- Docker instalado.
- MongoDB rodando localmente ou utilizando uma instância em nuvem.

### Passos:

#### Clone este repositório:

```bash
git clone https://github.com/Fiap-FSD/tech-2.git
cd blog-posts
```

#### Configure o ambiente:

Crie um arquivo `.env` na raiz do projeto e insira nele:

```bash
PORT=3000
API_SECRET=batman
MONGO_URI=mongodb+srv://fiapfsd:SDHdwwa1MNK4GObi@blogposts.faa90.mongodb.net/?retryWrites=true&w=majority&appName=BlogPosts
```

#### Rodando no Docker:

Para construir e rodar a aplicação com Docker, utilize os seguintes comandos:

- Verifique o docker e docker compose

```bash
docker --version
docker-compose --version
```
- Construa e inicie os conteiners

```bash
docker-compose build
docker-compose up
```

## 🌐 APIs

Utilizar APIs para criar o backend de um sistema de blog post oferece uma série de vantagens que tornam a aplicação mais escalável, flexível e fácil de manter. Abaixo são apresentadas as requisições utilizadas pelo grupo: 

#### URL

A URL base para todas as requisições da API é a seguinte:

```http
  https://blog-post-hori.onrender.com/
```

#### Manual da API

As URLs do manual da API são as seguintes:

```http
  https://blog-post-hori.onrender.com/api
```

```http
  https://blog-post-hori.onrender.com/docs
```

- ##### AuthController_login - Utilizado para autenticar usuário

Este endpoint é utilizado para realizar o login de um usuário já cadastrado e obter o token necessário para realizar operações protegidas (como **POST**, **PUT** e **DELETE**) na API.  

```http
  POST URL/auth/login
```

- ##### AuthController_register - Utilizado para criar usuário

Este endpoint é utilizado para criar um novo usuário no sistema. Ele recebe o email e senha (criptografada) do usuário e cria um registro no banco de dados.

```http
  POST URL/auth/register
```

- ##### PostController_getAllPost - Obter todas as postagens

Este endpoint é utilizado para obter todas as postagens do blog. Ele retorna uma lista completa de posts armazenados no banco de dados.

```http
  GET URL/post/
```

- #####  PostController_searchPosts - Buscar postagens

Este endpoint é utilizado para realizar uma pesquisa por posts com base em um critério específico (título ou conteúdo).

```http
  GET URL/post/search/id
```

- ##### PostController_getPostById - Obter postagem específica

Este endpoint é utilizado para recuperar uma postagem específica com base no ID fornecido.

```http
  GET URL/post/id
```

- ##### PostController_createPost - Criar nova postagem

Este endpoint é utilizado para criar uma nova postagem no blog.

```http
  POST URL/post
```

- ##### PostController_updatePost - Editar postagem existente

Este endpoint é utilizado para editar uma postagem existente, fornecendo o ID da postagem a ser atualizada.

```http
  PUT URL/post/id
```

- ##### PostController_deletePost - Excluir postagem

Este endpoint é utilizado para excluir uma postagem do blog.

```http
  DELETE URL/post/id
```
## 🎥 Vídeo do Projeto
👉 **[Link para o vídeo](https://youtu.be/ILa9iL7bAOs)**  

## 📜 Conclusão

A refatoração do back-end do Blog Post trouxe melhorias significativas, tornando o sistema mais moderno, escalável e fácil de manter. A migração da plataforma OutSystems para uma arquitetura baseada em NestJS, REST APIs e MongoDB foi um grande avanço, proporcionando mais flexibilidade e controle no desenvolvimento.

O uso de Docker e GitHub facilitou o gerenciamento do código e a colaboração entre os desenvolvedores, além de garantir consistência nos diferentes ambientes. As APIs RESTful ajudaram a separar o front-end do back-end, o que trouxe agilidade e facilitou a integração com outras plataformas.

No entanto, o desenvolvimento não foi isento de desafios. A vinculação de várias tecnologias como Docker, MongoDB e Node.js exigiu um cuidado especial para garantir que todos os componentes funcionassem de forma integrada. A configuração do MongoDB e a criação de um ambiente Docker compatível com o sistema foram algumas das dificuldades encontradas, exigindo ajustes contínuos. Apesar desses desafios, a refatoração resultou em uma aplicação mais robusta e bem estruturada.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.
>>>>>>> master
>>>>>>> master
