<p align="center">
  <img src="public/Fiap-logo.jpg" width="400" /></a>
</p>

# ✨ Implementação do Front-End do Blog Post

Este documento descreve o processo de criação da interface gráfica após o desenvolvimento do refatoramento da parte Back-End do blog post. A aplicação foi inicialmente desenvolvida utilizando a plataforma OutSystems. Para esta nova etapa, o front-end da aplicação foi desenvolvida utilizando React.js, utilizando o framkework NextJS, Axios, GitHub, tailwindcss e styled-components para estilização.

Será apresentada a maneira de execução de cada step do projeto contendo informações cruciais sobre como configurar, usar e contribuir com o projeto.

## 🎯 Objetivos do Projeto

- Desenvolver uma interface gráfica para aplicação de blogging, utilizando React.js.
- Aplicação deve ser responsiva, acessível e fácil de usar.
- Implementação do uso dos endpoints REST, já implementados no back-end, para permitir docentes e alunos a interagir.

## 🛠️ Ferramentas Utilizadas

A equipe utilizou as seguintes ferramentas durante o desenvolvimento do projeto:

- **Visual Studio Code**: Ferramenta utilizada para escrita e execução de código, com extensões específicas para JavaScript e Node.js. Sua integração com o terminal permite rodar o servidor diretamente dentro do editor, facilitando o desenvolvimento, testes e depuração de endpoints.

- **GitHub**: O GitHub ofereceu controle de versão, permitindo que cada membro da equipe trabalhasse em diferentes funcionalidades sem afetar o código principal. A utilização de pull requests facilitou a revisão de código e a integração das mudanças, garantindo qualidade e consistência. O GitHub também integrou ferramentas de CI/CD, automatizando testes e o deploy do código.

- **Axios**: É uma biblioteca JavaScript para fazer requisições HTTP. Ele foi escolhido por ser fácil de usar e configurar, além de fornecer recursos como interceptadores e a capacidade de lidar com requisições e respostas de maneira eficiente.

- **tailwindcss**: Um framework CSS utilitário que facilita a construção de interfaces responsivas e personalizáveis. Permitiu ajeitar a estilizaão diretamente em `JSX` o que acelerou a construção da interface do usuário

- **styled-components**: O Styled-components é uma biblioteca que permite escrever CSS dentro de componentes React, criando componentes de estilo com escopo isolado, tornando o CSS mais modular e reutilizável. Foi útil em evitar conflitos ed estilos entre diferentes partes da aplicação.


## 🏗️ Arquitetura da Aplicação

A arquitetura do projeto segue o padrão da **NextJS**, que utiliza uma arquitetura JAMStack, que se caracteriza por um desenvolvimento de front-end independente de back-end, com foco em APIs e serviços de terceiros, e que permite a entrega de aplicações web rápidas e eficientes. Seguindo uma estrutura **App Routes** e **Page Router** permitindo que o projeto seja organizadod e forma modular e escalável, promevendo uma navegação intuitiva e otimizada, com rotas dinâmicas, layouts reutilizáveis e carregamento assíncrono de dados. Essa abordagem melhora tanto a experiência de desenvolvimento quanto a experiência do usuário, tornando o código mais limpo e fácil de manter.

A arquitetura segue o padrão **NextJS**, organizada em **App e Pages**, com:

- **App**: Define o layout global da aplicação e a página principal (root) do aplicativo. Além de conter os componentes que serão layout comum para várias páginas.
- **Pages**: Contém subdiretório, que são tratatos como componentes de rotas.

  

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

#### Rodando Localmente:

No terminal do projeto, rode:

```bash
 npm run dev
```

#### Abra no seu navegador

Com o link que aparecerá no seu terminal, copie e cole no seu navegador.

## 🎥 Vídeo do Projeto
👉 **[Link para o vídeo](https://youtu.be/ILa9iL7bAOs)**  

## 📜 Conclusão

Este projeto proporcionou a oportunidade de aprimorar habilidades no desenvolvimento front-end, utilizando tecnologias modernas e poderosas como React.js, NextJS, Axios, TailwindCSS e Styled-components. Ao longo do desenvolvimento, foi possível criar uma interface gráfica dinâmica, responsiva e intuitiva para a aplicação de blog, que se conecta de forma eficiente com a API do back-end.

A arquitetura adotada, baseada no padrão NextJS e no conceito de JAMstack, permitiu um desenvolvimento ágil, com foco em modularidade, escalabilidade e otimização de performance. A integração do Axios facilitou as requisições HTTP, enquanto o uso do TailwindCSS e Styled-components proporcionou uma experiência de design fluída e flexível, permitindo um controle preciso dos estilos.

O projeto também reforçou a importância de boas práticas de desenvolvimento, como controle de versão via GitHub, e integração de ferramentas de CI/CD para garantir a qualidade do código. A aplicação está pronta para ser utilizada por docentes e alunos, permitindo uma interação eficaz com os posts do blog, proporcionando um ambiente de leitura agradável e funcional.

Com essa implementação, o projeto evolui para um sistema mais robusto, modular e de fácil manutenção, alinhado com as melhores práticas de desenvolvimento web modernas. Estamos confiantes de que essa solução trará uma excelente experiência para os usuários finais.

> [!CAUTION]
> AJEITAR A CONCLUSÃO

