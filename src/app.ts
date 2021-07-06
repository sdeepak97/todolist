import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { TryDBConnect } from "./database/connection/connection";
import { todorouter } from "./routes/todo.router";

dotenv.config();
const app = express();
const port =  process.env.PORT || 8000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

TryDBConnect(()=>{
  console.log("postgres error");
});

app.set("port", port);
app.use("/", todorouter);

app.listen(app.get("port"), () => {
  console.log(`🚀 is rocking over ${app.get("port")}`);
});
