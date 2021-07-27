# Ignite - Desafio 06 - Testes

Nesse desafio, você deverá criar testes unitários para a aplicação FinAPI, já utilizada em outros módulos da trilha Node.js

Para realização dos testes utilizamos as bibliotecas abaixo:
- [Jest](https://jestjs.io/pt-BR/docs/getting-started)

- [ts-jest](https://www.npmjs.com/package/ts-jest)

- [supertest](https://github.com/visionmedia/supertest)



## Testes Unitários

- [x] should be able to create a new user

- [x] should not be able to create a user with an email already registered

- [x] should be able to authenticate user

- [x] should not be able no authenticate a nonexistent user

- [x] should not be able to authenticate user with incorrect password

- [x] should be able to show user profile

- [x] should be able to create a new deposit

- [x] should be able to create a new withdraw

- [x] should not be able to create a new withdraw with insufficient funds

- [x] should be able to get user balance

- [x] should be able to show user profile


## Testes de Integração

- [x] should be able to create a new user

- [x] should not be able to create a new user when email has already been registered

- [x] should be able to authenticate user

- [x] should be able to show user profile


## Executando a aplicação

- Após clonar o repositório, navegue até o diretório pelo terminal e execute o comando `yarn` para instalar todas as dependências.

- Execute o comando `yarn dev` para rodar a aplicação em modo de desenvolvimento.

- Execute o comando `yarn test` para rodar os testes.


## Rotas da aplicação

Para te ajudar a entender melhor o funcionamento da aplicação como um todo, abaixo você verá uma descrição de cada rota e quais parâmetros recebe.

### POST `/api/v1/users`

A rota recebe `name`, `email` e `password` dentro do corpo da requisição, salva o usuário criado no banco e retorna uma resposta vazia com status `201`.

### POST `/api/v1/sessions`

A rota recebe `email` e `password` no corpo da requisição e retorna os dados do usuário autenticado junto à um token JWT.

Essa aplicação não possui refresh token, ou seja, o token criado dura apenas 1 dia e deve ser recriado após o período mencionado.

### GET `/api/v1/profile`

A rota recebe um token JWT pelo header da requisição e retorna as informações do usuário autenticado.

### GET `/api/v1/statements/balance`

A rota recebe um token JWT pelo header da requisição e retorna uma lista com todas as operações de depósito e saque do usuário autenticado e também o saldo total numa propriedade `balance`.

### POST `/api/v1/statements/deposit`

A rota recebe um token JWT pelo header e `amount` e `description` no corpo da requisição, registra a operação de depósito do valor e retorna as informações do depósito criado com status `201`.

### POST `/api/v1/statements/withdraw`

A rota recebe um token JWT pelo header e `amount` e `description` no corpo da requisição, registra a operação de saque do valor (caso o usuário possua saldo válido) e retorna as informações do saque criado com status `201`.

### GET `/api/v1/statements/:statement_id`

A rota recebe um token JWT pelo header e o id de uma operação registrada (saque ou depósito) na URL da rota e retorna as informações da operação encontrada.
