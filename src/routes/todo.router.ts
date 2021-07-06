import Router from "express";
import { TodoRepository } from "../database/repository/todo.repo";

const todorouter = Router();

//@GET
todorouter.get("/", (req, res) => {
  res.send({
    data: "Bootcamp 2.0",
  });
});
todorouter.get("/todos/", TodoRepository.readTodos);

//@POST
todorouter.post("/todos/add", TodoRepository.createTodos);

//@UPDATE
todorouter.put("/todos/update/:id", TodoRepository.updateTodo);

//@DELETE
todorouter.delete("/todos/delete/:id", TodoRepository.deleteTodo);

export { todorouter };
