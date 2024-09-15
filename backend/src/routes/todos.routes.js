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
todosRouter.post("/create", validarJwt, createTodos);
todosRouter.post("/update/:todosID", validarJwt, editTodos);
todosRouter.delete("/delete/:id", validarJwt, deleteTodo);
export { todosRouter };
