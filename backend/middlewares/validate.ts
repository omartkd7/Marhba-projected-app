import { Request, Response, NextFunction } from "express";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateRegister = (req: Request, res: Response, next: NextFunction) => {
  const { fullName, email, password } = req.body;

  if (!fullName || typeof fullName !== "string" || !fullName.trim()) {
    return res.status(400).json({ error: "Le nom complet est requis" });
  }
  if (!email || !EMAIL_REGEX.test(email)) {
    return res.status(400).json({ error: "Email invalide" });
  }
  if (!password || password.length < 6) {
    return res.status(400).json({ error: "Le mot de passe doit contenir au moins 6 caractères" });
  }

  next();
};

export const validateLogin = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if (!email || !EMAIL_REGEX.test(email)) {
    return res.status(400).json({ error: "Email invalide" });
  }
  if (!password) {
    return res.status(400).json({ error: "Le mot de passe est requis" });
  }

  next();
};
