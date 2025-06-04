import express from "express";
import tasksRouter from "./tasks/tasks.routes";
import authRouter from "./auth/auth.routes";
import { setupSwagger } from "./docs//swagger";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); 
app.use("/auth", authRouter);
app.use("/tasks", tasksRouter);

setupSwagger(app);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  console.log(`Documentação: http://localhost:${PORT}/api-docs`);
});
