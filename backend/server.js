import express from "express";
import * as dotenv from "dotenv";
import path from "path";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import errorHandler from "./middleware/errorHandler.js";
import userRoutes from "./routes/userRoute.js";

dotenv.config();
const app = express();
connectDB();

app.use(express.json());
app.use(cookieParser());

app.use("/api/users", userRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "../", "frontend", "dist", "index.html")
    )
  );
} else {
  app.get("/", (req, res) => res.send("Welcome"));
}

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server runnning on port ${PORT}`));
