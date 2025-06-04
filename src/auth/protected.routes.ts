import express from "express";
import { authenticateToken } from "../common/middlewares/authMiddleware";

const router = express.Router();

router.get("/profile", authenticateToken, (req, res) => {
  const user = req.user; 
  res.json({ message: "Rota protegida acessada com sucesso!", user });
});

export default router;
