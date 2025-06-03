import { Router } from "express";
import { createTask } from "./tasks.controller";
import { createTaskSchema } from "./tasks.dto";
import { validate } from "../common/middlewares/validate"; 

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Tarefas
 *   description: Endpoints de gerenciamento de tarefas
 */

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Cria uma nova tarefa
 *     tags: [Tarefas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *                 example: "Comprar pão"
 *               descricao:
 *                 type: string
 *                 example: "Ir à padaria antes das 10h"
 *             required:
 *               - titulo
 *     responses:
 *       201:
 *         description: Tarefa criada com sucesso
 *       400:
 *         description: Requisição inválida
 */
router.post("/", validate(createTaskSchema), createTask);

export default router;

