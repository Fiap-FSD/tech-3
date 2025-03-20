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
