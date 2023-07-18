# API - Fullstack-Challenger

## Description

Desafio proposto pela empresa Uhuu!, desenvolver um API para gerenciar tarefas de usuários, onde o usuário poderá efetuar o seu cadastro e realizar a gestão das tarefas, criando novas tarefas, listando, atualizando e deletar.

## Detalhes para montar o ambiente
* Instalar o Node JS caso não tenha, [Node JS link](https://nodejs.org/en/download/package-manager/)
* Versão do Node JS utilizada: 18.16.1
* Pode ser usado o NPM ou YARN para gerenciar o node_modules
* NestJS: 10.1.9 [Site](https://docs.nestjs.com/)
* Instalar o Docker [Docker link](https://docs.docker.com/desktop/install/windows-install/)
* Instalar o Docker composer [Docker Compose Link](https://docs.docker.com/compose/install/)
* Efetue a instalação do **pacotes** usando **npm install** ou **yarn**
* Tenha um banco MongoDB disponível para poder testar o projeto, caso não tenha pode ser instalado via Docker container ou usuar a versão Atlas Mongo, basca criar um conta [MongoDB Atlas](https://www.mongodb.com/atlas/database)
* Caso não queria usar nenhuma versão do banco o projeto despõem de uma versão em memória, basta alterar a injeção das classes repository do mongo pelas em memória.
* Comandos para subir um container *Docker*
  * Executar o comando **docker-compose up -d** para criar o container com o Docker
* Execute o commando **npx run test** ou **yarn test** para verificar se está tudo funcionando

## Documentação como usar a APi

A API disponibiliza de uma documentação de rotas usando o Swagger, para visualizar basta acessar a rota http://locahost:3000/api.
Necessário efetuar o cadastro de um usuário para poder acessar as rotas das tarefas.
Ao efetuar o cadastro será retornado um token para usar no Authorization Header, como Bearer token.
A API está configurada com uma rate limi de 15 requisições dentro de 60s.

## Estrutura base do projeto

 A **main** dentro da **src** inicia o servidor
* A pasta **infra** contém o acesso para base de dados
* A pasta **core** contém as regras de negócio
* A pasta **app** contém as regras da aplicação e a gestão do fluxo de entrada para a aplicação
* A pasta **shared** contém os arquivos que são acessado por várias pastas
* as pastas **infra** e **app** contem pastas **__test__ e __mocks__** para validar os recursos de cada pasta

## Informações sobre o projeto

* Arquitetura base - [Port and Adapter](https://alistair.cockburn.us/hexagonal-architecture/)
* Tratativas de erros - [Either Error](https://blog.logrocket.com/javascript-either-monad-error-handling/)
* DIP - [Dependency inversion principle](https://medium.com/@tbaragao/solid-d-i-p-dependency-inversion-principle-e87527f8d0be)
* SRP - [Single Responsability Principle](https://www.digitalocean.com/community/conceptual-articles/s-o-l-i-d-the-first-five-principles-of-object-oriented-design#single-responsibility-principle)
* OpenTelemetry para trace e metrics - [OpenTelemetry](https://opentelemetry.io/)
* Winston para logs - [Winston](https://www.npmjs.com/package/winston)
