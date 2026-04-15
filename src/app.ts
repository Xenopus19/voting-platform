import express from "express";
import router from "./controllers/users";

const app = express();

app.use(express.json())

app.get("/", (req, res) => {
  res.send("App");
});

app.use("/api/users", router);

export default app;
