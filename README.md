# To-do API com Express e TypeScript

## Tecnologia Escolhida

Este projeto foi construído usando Express.js com TypeScript ao invés de NestJS. Essa escolha foi feita por algumas razões:

1. **Simplicidade e Flexibilidade**: Express é mais leve e oferece maior flexibilidade na estruturação do código
2. **Controle Total**: Implementação manual de patterns nos dá maior controle e entendimento da arquitetura
3. **Performance**: Menos overhead de decorators e metadados em comparação com NestJS
4. **Curva de Aprendizado**: Mais fácil para desenvolvedores familiarizados com Express puro

## Principais Dependências

### Produção
- `express`: ^4.18.2 - Framework web
- `@prisma/client`: ^5.10.2 - Cliente do ORM Prisma
- `jsonwebtoken`: ^9.0.2 - Autenticação JWT
- `bcrypt`: ^5.1.1 - Hash de senhas
- `cors`: ^2.8.5 - Middleware CORS
- `swagger-ui-express`: ^5.0.0 - Documentação da API

### Desenvolvimento
- `typescript`: ^5.3.3 - Suporte a TypeScript
- `prisma`: ^5.10.2 - CLI e tipos do Prisma
- `@types/node`: ^20.11.24 - Tipos do Node.js
- `@types/express`: ^4.17.21 - Tipos do Express
- `ts-node-dev`: ^2.0.0 - Servidor de desenvolvimento

## Setup do Projeto

### Pré-requisitos
- Node.js (v14 ou superior)
- npm (v6 ou superior)
- MySQL (v8 ou superior)

### Instalação

1. Clone o repositório:
```bash
git clone <repository-url>
cd todo-api
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações:
```
PORT=3000
JWT_SECRET=your-secret-key

# Configuração do banco de dados
DATABASE_URL="mysql://user:password@localhost:3306/todo_db"
```

4. Configure o banco de dados:
```bash
# Aplica as migrations do Prisma
npx prisma migrate dev

# Gera o Prisma Client
npx prisma generate
```

## Como Executar

### Desenvolvimento
```bash
npm run dev
```

### Produção
```bash
npm run build
npm start
```

O servidor estará rodando em `http://localhost:3000`

## Como Testar

### Collection Postman

[Link para download da collection](https://www.postman.com/science-cosmonaut-27614798/to-do-api/collection/7jayaok/todo-api?action=share&creator=38262550)

#### Endpoints Disponíveis:

##### Autenticação
- POST `/api/auth/register` - Registro de usuário
- POST `/api/auth/login` - Login de usuário

##### Tarefas
- GET `/api/tasks` - Lista todas as tarefas do usuário
- POST `/api/tasks` - Cria uma nova tarefa
- PUT `/api/tasks/:id` - Atualiza uma tarefa
- DELETE `/api/tasks/:id` - Remove uma tarefa

## Decisões Técnicas

### 1. Arquitetura Modular
- Separação clara de responsabilidades (docs, tasks, auth)
- Cada módulo contém seus próprios DTOs, services e routes
- Pasta `common` para código compartilhado

### 2. Sistema de Autenticação
- JWT para gerenciamento de sessão

### 3. Persistência
- MySQL como banco de dados relacional
- Prisma como ORM
  - Type safety com geração automática de tipos
  - Migrations automáticas
  - Query builder intuitivo
  - Validação de schema
- Relacionamentos bem definidos entre entidades

### 4. Tipagem
- TypeScript para type safety
- Interfaces bem definidas
- DTOs para validação de entrada
- Integração com tipos gerados pelo Prisma

## Melhorias Futuras

1. **Migração para NestJS**
   - Aproveitar a estrutura modular já existente
   - Utilizar decorators nativos do NestJS
   - Implementar injeção de dependência nativa
   - Melhor integração com Swagger
   - Guards 
   - Módulo de configuração centralizado

2. **Otimização de Banco de Dados**
   - Índices otimizados
   - Queries mais eficientes
     
3. **Features**
   - Paginação
   - Filtros avançados
   - Soft delete
   - Histórico de alterações
   - Exportação de dados

4. **Testes Unitários**
   - Configuração do ambiente de testes (Jest + TypeScript)


   
