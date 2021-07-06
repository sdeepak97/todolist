import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { TodoList } from "../entities/todo.entity";

export class TodoRepository {
  //CREATE
  static async createTodos(req: Request, res: Response) {
    let { title, description } = req.body;

    let todoData = {
      title: title,
      description: description,
    };

    let todoRepo = getRepository(TodoList);

    await todoRepo
      .save(todoData)
      .then((data: any) => {
        return res.send({
          data: data,
          message: "Todo data submitted",
          submitted: true,
        });
      })
      .catch((error: any) => {
        if (error) {
          return res.send({
            data: error,
            message: "Todo data not submitted",
            submitted: false,
          });
        }
      });
  }

  //READ
  static async readTodos(req: Request, res: Response) {
    let todoRepo = getRepository(TodoList);
    let todoData = await todoRepo.find();

    if (todoData != null) {
      if (todoData.length > 0) {
        return res.send({
          filled: true,
          data: todoData,
          received: true,
        });
      } else {
        return res.send({
          filled: false,
          data: "Table is empty",
          received: true,
        });
      }
    } else {
      return res.send({
        data: "Something went wrong",
        received: false,
      });
    }
  }

  //UPDATE
  static async updateTodo(req: Request, res: Response) {
    let { id } = req.params;
    let { title, description } = req.body;

    let todorepo = getRepository(TodoList);

    await todorepo
      .createQueryBuilder("todolist")
      .update(TodoList)
      .set({
        title: title,
        description: description,
      })
      .where("id = :id", { id: id })
      .execute()
      .then((data: any) => {
        return res.send({
          data: data,
          updated: true,
          message: "Data is updated",
        });
      });
  }

  //DELETE
  static async deleteTodo(req: Request, res: Response) {
    let { id } = req.params;
    let todorepo = getRepository(TodoList);

    await todorepo
      .createQueryBuilder("todolist")
      .delete()
      .from(TodoList)
      .where("id = :id", { id: id })
      .execute()
      .then((data: any) => {
        return res.send({
          data: data,
          deleted: true,
          message: "Data is deleted",
        });
      });
  }
}
