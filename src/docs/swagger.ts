import { Express } from "express";
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "API de Tarefas",
    version: "1.0.0",
    description: "Documentação da API de gerenciamento de tarefas",
  },
  servers: [
    {
      url: "http://localhost:3000",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    schemas: {
      RegisterUser: {
        type: "object",
        required: ["name", "email", "password"],
        properties: {
          name: {
            type: "string",
            description: "Nome do usuário",
            example: "João Silva",
          },
          email: {
            type: "string",
            format: "email",
            description: "Email do usuário",
            example: "joao@email.com",
          },
          password: {
            type: "string",
            description: "Senha do usuário (mínimo 6 caracteres, deve conter maiúscula, minúscula e número)",
            example: "Senha123",
          },
        },
      },
      LoginUser: {
        type: "object",
        required: ["email", "password"],
        properties: {
          email: {
            type: "string",
            format: "email",
            description: "Email do usuário",
            example: "joao@email.com",
          },
          password: {
            type: "string",
            description: "Senha do usuário",
            example: "Senha123",
          },
        },
      },
    },
  },
};

const options = {
  swaggerDefinition,
  apis: ["./src/**/*.ts"], // Inclui todos os arquivos .ts dentro de src
};

const swaggerSpec = swaggerJSDoc(options);

export function setupSwagger(app: Express): void {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
