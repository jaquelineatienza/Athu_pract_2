import { Router } from "express";
import {
  getAllTodosCtrl,
  createTodos,
  editTodos,
  deleteTodo,
} from "../controllers/todos.controllers.js";
import validarJwt from "../middlewares/validar-jwt.js";

const todosRouter = Router();

todosRouter.get("/", validarJwt, getAllTodosCtrl);
todosRouter.post("/create", createTodos);
todosRouter.post("/update/:todosID", editTodos);
todosRouter.delete("/delete/:id", deleteTodo);
export { todosRouter };
