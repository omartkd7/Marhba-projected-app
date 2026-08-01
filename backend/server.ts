import express from "express";
import cors from "cors";
import sequelize from "./config/database";
import "./models/User";
import logger from "./middlewares/logger";
import authRoutes from "./routes/authRoutes";
import errorHandler from "./middlewares/errorHandler";


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(logger);  



app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/auth", authRoutes);   // les routes mn b3d

app.use(errorHandler);

const start = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ DB connectée");

    await sequelize.sync();
    console.log("✅ Tables synchronisées");

    app.listen(PORT, () => console.log(`🚀 http://localhost:${PORT}`));
  } catch (error) {
    console.error("❌ Impossible de démarrer :", error);
    process.exit(1);
  }
};

start();
