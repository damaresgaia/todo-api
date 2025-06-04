import { Request, Response } from "express";
import { authService } from "./auth.service";

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await authService.register(req.body);
    res.status(201).json({
      message: "Usuário criado com sucesso",
      user,
    });
  } catch (error) {
    console.error("Erro no registro:", error);
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await authService.login(req.body);
    res.json(result);
  } catch (error) {
    console.error("Erro no login:", error);
    if (error instanceof Error) {
      res.status(401).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  }
};
