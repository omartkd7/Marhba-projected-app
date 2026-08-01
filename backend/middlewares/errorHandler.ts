import { Request, Response, NextFunction } from "express";

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction  // 👈 khass ykoun hna 7ta ila ma-kansta3mloch
) => {
  console.error("❌", err.message);

  // Erreurs dyal Sequelize
  if (err.name === "SequelizeUniqueConstraintError") {
    return res.status(409).json({ error: "Cette valeur est déjà utilisée" });
  }

  if (err.name === "SequelizeValidationError") {
    return res.status(400).json({ error: err.errors[0].message });
  }

  // Erreurs dyal JWT
  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({ error: "Token invalide" });
  }

  if (err.name === "TokenExpiredError") {
    return res.status(401).json({ error: "Session expirée, reconnectez-vous" });
  }

  // Le reste
  const status = err.status || 500;
  return res.status(status).json({
    error: status === 500 ? "Erreur serveur" : err.message,
  });
};

export default errorHandler;