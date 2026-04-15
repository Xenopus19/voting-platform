import express from "express";
import usersRouter from "./controllers/users";
import loginRouter from "./controllers/login";
import cors from 'cors';
const app = express();

app.use(express.json())
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))


app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

export default app;
