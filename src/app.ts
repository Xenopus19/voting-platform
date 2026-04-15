import express from "express";
import usersRouter from "./controllers/users";
import loginRouter from "./controllers/login";
const app = express();

app.use(express.json())

app.get("/", (req, res) => {
  res.send("App");
});

app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

export default app;
