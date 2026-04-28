import express from "express";
import usersRouter from "./controllers/users";
import loginRouter from "./controllers/login";
import votesRouter from "./controllers/votes";
import cors from 'cors';
import path from 'path';
const app = express();

app.use(express.json())
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))

const distPath = path.join(process.cwd(), 'client', 'dist');
app.use(express.static(distPath));
console.log("Serving static from:", distPath)

app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);
app.use("/api/votes", votesRouter);
app.get(/.*/, (_req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

export default app;
