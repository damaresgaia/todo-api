import { Router } from "express";
import { createTask } from "./tasks.controller";
import { createTaskSchema } from "./tasks.dto";
import { validate } from "../common/middlewares/validate"; 

const router = Router();

router.post("/", validate(createTaskSchema), createTask);

export default router;

