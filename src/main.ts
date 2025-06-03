import express from "express";
import tasksRouter from "./tasks/tasks.routes";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); 
app.use("/tasks", tasksRouter);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
