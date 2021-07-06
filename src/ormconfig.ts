import { ConnectionOptions } from "typeorm";
import path from "path";
import dotenv from "dotenv";
import { TodoList } from "./database/entities/todo.entity";
const isCompiled = path.extname(__filename).includes("js");

dotenv.config();

export default {
  url:process.env.DATABASE_URL,
  ssl:{rejectUnauthorized:false},
  type: "postgres",
  host:  process.env.Host || "localhost",
  port:  process.env.DB_Port || 5432,
  username:  process.env.User || "postgres",
  password:  process.env.DB_Password ||"9848755758",
  database:  process.env.Database ||"postgres",
  synchronize: !process.env.DB_NO_SYNC,
  logging: !process.env.DB_NO_LOGS,
  autoReconnect: true,
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 2000,
  entities: [TodoList],
  migrations: [`src/migration/**/*.${isCompiled ? "js" : "ts"}`],
} as ConnectionOptions;