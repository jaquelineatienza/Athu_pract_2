import { database } from "../db/database.js";

export const getAllTodosCtrl = (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "No autorizado" });
  }

  // Filtrar los todos del usuario autenticado
  const userTodos = database.todos.filter((todo) => todo.owner === req.user.id);

  res.json({ todos: userTodos });
};
export const createTodos = (req, res) => {
  // Verificar si el usuario está autenticado
  if (!req.user) {
    return res.status(401).json({ message: "No autorizado" });
  }

  // Extraer los datos del cuerpo de la solicitud
  const { title, completed } = req.body;

  // Verificar si los campos requeridos están presentes
  if (!title || typeof completed !== "boolean") {
    return res.status(400).json({ message: "Datos incompletos o incorrectos" });
  }

  // Crear un nuevo todo
  const newTodo = {
    id: database.todos.length + 1, // Asignar un nuevo ID
    title: title,
    completed: completed,
    owner: req.user.id, // Asignar el ID del usuario autenticado como owner
  };

  // Agregar el nuevo todo a la base de datos (simulada)
  database.todos.push(newTodo);

  // Responder con el nuevo todo creado
  res.status(201).json({ message: "Todo creado exitosamente", todo: newTodo });
};

export const editTodos = (req, res) => {
  const { todosID } = req.params; // El ID del todo que se va a editar
  const { title, completed } = req.body; // Los nuevos datos enviados por el cliente

  // Buscar el todo por su ID
  const todo = database.todos.find((todo) => todo.id === parseInt(todosID));

  if (!todo) {
    return res.status(404).json({ message: "Todo no encontrado" });
  }

  // Verificar que el usuario sea el dueño del todo
  const userTodos = database.todos.filter((todo) => todo.owner === req.user.id);
  if (!userTodos) {
    return res
      .status(403)
      .json({ message: "No tienes permisos para editar este todo" });
  }
  // Actualizar los campos
  if (title) {
    todo.title = title; // Actualizar el título si se proporciona
  }

  if (typeof completed === "boolean") {
    todo.completed = completed; // Actualizar el estado de completado
  }

  // Enviar la respuesta con el todo actualizado
  res.json({ message: "Todo actualizado correctamente", todo });
};

export const deleteTodo = (req, res) => {
  const { id } = req.params;

  const todoIndex = database.todos.findIndex(
    (todo) => todo.id === parseInt(id)
  );

  if (todoIndex === -1) {
    return res.status(404).json({ message: "Todo no encontrado" });
  }

  // Verificar que el usuario sea el dueño del todo
  if (database.todos[todoIndex].owner !== req.user.id) {
    return res
      .status(403)
      .json({ message: "No tienes permiso para eliminar este todo" });
  }

  const deletedTodo = database.todos.splice(todoIndex, 1);

  res.json({ message: "Todo eliminado correctamente", todo: deletedTodo });
};
