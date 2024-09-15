export const todosPage = () => {
  let todosID = null;
  //contenedor
  const contenedor = document.createElement("div");
  // Crear un contenedor principal
  const container = document.createElement("div");
  //contenedor del formulario Create
  const formContainer = document.createElement("div");

  //elementos para crear un todo
  const $formCreate = document.createElement("form");
  const titleCreate = document.createElement("h2");
  const btnCreate = document.createElement("button");
  //btn create
  btnCreate.classList.add(
    "bg-blue-500",
    "text-white",
    "p-3",
    "rounded",
    "hover:bg-blue-600",
    "mt-6"
  );
  btnCreate.type = "submit";
  btnCreate.innerText = "Crear";
  // Input de título
  const creaTitle = document.createElement("input");
  creaTitle.type = "text";
  creaTitle.id = "creaTitle";
  creaTitle.required = true;
  creaTitle.name = "creaTitle";
  creaTitle.placeholder = "Title";
  creaTitle.classList.add(
    "w-full",
    "p-2",
    "border",
    "border-gray-300",
    "rounded"
  );

  // Checkbox de "is complete"
  const formComplete = document.createElement("input");
  formComplete.type = "checkbox";
  formComplete.id = "formComplete";
  formComplete.classList.add("w-5");
  //titulo del form create
  titleCreate.innerText = "Create Todos";
  titleCreate.classList.add(
    "text-3xl",
    "font-bold",
    "mb-2",
    "text-center",
    "justify-center",
    "text-white"
  );
  // Crear una etiqueta para el checkbox
  const formCompleteLabel = document.createElement("label");
  formCompleteLabel.htmlFor = "formComplete";
  formCompleteLabel.innerText = "Is Complete";
  formCompleteLabel.classList.add("ml-2", "text-white");
  // Crear una etiqueta para el checkbox
  const formCompletetittle = document.createElement("label");
  formCompletetittle.htmlFor = "formComplete";
  formCompletetittle.innerText = "titulo";
  formCompletetittle.classList.add("ml-3", "text-white", "text-xl");

  //estilo del formCreate
  $formCreate.classList.add("flex-col", "w-59", "gap-2", "p-8");
  //introduccion de los elementos al contenedor de form
  formContainer.appendChild(titleCreate);
  $formCreate.appendChild(formCompletetittle);
  $formCreate.appendChild(creaTitle);
  $formCreate.appendChild(formComplete);
  $formCreate.appendChild(formCompleteLabel);
  formContainer.appendChild($formCreate);
  $formCreate.appendChild(btnCreate);
  //estilo al contenedor
  contenedor.classList.add("flex", "flex-row", "gap-12");

  //estilos del formulario create
  formContainer.classList.add(
    "bg-blue-900",
    "bg-opacity-50",
    "z-50",
    "mt-50",
    "w-96",
    "h-60",
    "rounded-xl"
  );

  // Añadir clases de estilo al contenedor principal
  container.classList.add(
    "flex",
    "flex-col",
    "items-center",
    "h-screen",
    "bg-gray-200"
  );

  //peticion para crear un todo
  $formCreate.addEventListener("submit", async (e) => {
    e.preventDefault();
    const title = creaTitle.value;
    const isComplete = formComplete.checked;
    console.log(title, isComplete);
    if (!title) {
      alert("ingrese un titulo");
      return;
    }
    try {
      const response = await fetch("http://localhost:4000/todos/create", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: title, completed: isComplete }),
      });
      if (response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      updateTable();
    } catch (error) {
      console.log(error);
    }
  });

  // Crear el botón "Home"
  const btnHome = document.createElement("button");

  // Añadir clases de estilo al botón "Home"
  btnHome.classList.add(
    "bg-blue-500",
    "text-white",
    "p-2",
    "rounded",
    "hover:bg-blue-600",
    "mb-4"
  );

  // Definir el texto del botón "Home"
  btnHome.textContent = "Home";

  // Crear un título para la página
  const title = document.createElement("h1");

  // Añadir clases de estilo al título
  title.classList.add("text-3xl", "font-bold", "mb-4");
  title.textContent = "List of Todos";

  // Crear una tabla para mostrar los "todos"
  const table = document.createElement("table");

  // Añadir clases de estilo a la tabla
  table.classList.add(
    "w-1/2",
    "bg-white",
    "shadow-md",
    "h-[700px]",
    "overflow-y-scroll"
  );

  // Crear la cabecera de la tabla
  const thead = document.createElement("thead");
  const tr = document.createElement("tr");

  // Crear y configurar las celdas de la cabecera
  const th1 = document.createElement("th");
  th1.classList.add("border", "px-4", "py-2");
  th1.textContent = "ID";

  const th2 = document.createElement("th");
  th2.classList.add("border", "px-4", "py-2");
  th2.textContent = "Title";

  const th3 = document.createElement("th");
  th3.classList.add("border", "px-4", "py-2");
  th3.textContent = "Completed";

  const th4 = document.createElement("th");
  th4.classList.add("border", "px-4", "py-2");
  th4.textContent = "Owner Id";

  const th5 = document.createElement("th");
  th5.classList.add("border", "px-4", "py-2");
  th5.textContent = "Actions";

  // Añadir las celdas al tr (fila) de la cabecera
  tr.appendChild(th1);
  tr.appendChild(th2);
  tr.appendChild(th3);
  tr.appendChild(th4);
  tr.appendChild(th5);

  // Añadir la fila al thead (cabecera)
  thead.appendChild(tr);

  // Crear el tbody (cuerpo) de la tabla
  const tbody = document.createElement("tbody");

  // Añadir clases de estilo al tbody
  tbody.classList.add("text-center");

  // Añadir el thead (cabecera) y el tbody (cuerpo) a la tabla
  table.appendChild(thead);
  table.appendChild(tbody);

  // Crear el modal y el fondo del modal
  const modalBackground = document.createElement("div");
  const modalContent = document.createElement("div");
  const modalCloseButton = document.createElement("button");

  // Añadir clases de estilo al fondo del modal
  modalBackground.classList.add(
    "fixed",
    "bg-gray-900",
    "hidden",
    "z-50",
    "mt-50",
    "w-96"
  );

  // Añadir clases de estilo al contenido del modal
  modalContent.classList.add(
    "flex",
    "flex-col",
    "items-center",
    "justify-center",
    "bg-white",
    "p-4",
    "rounded-md"
  );

  // Elementos del modal
  const mdTitle = document.createElement("h2");
  const mdForm = document.createElement("form");
  const btnUpdate = document.createElement("button");

  // Añadir estilo al título del modal
  mdTitle.classList.add("text-2xl", "font-bold", "mb-4");
  mdTitle.textContent = "Actualizar";

  // Estilo del botón "Actualizar"
  btnUpdate.type = "submit";
  btnUpdate.classList.add(
    "bg-blue-500",
    "hover:bg-blue-700",
    "text-white",
    "font-bold",
    "py-2",
    "px-4",
    "rounded",
    "mt-2"
  );
  btnUpdate.textContent = "confirmar";

  // Estilo del formulario
  mdForm.classList.add("flex", "flex-col", "gap-3");

  // Input de title
  const titleInput = document.createElement("input");
  titleInput.type = "text";
  titleInput.id = "title";
  titleInput.name = "title";
  titleInput.required = true;
  titleInput.classList.add("p-2", "border", "border-gray-300", "rounded");
  titleInput.placeholder = "Title";

  // Input de checkbox
  const isComplete = document.createElement("input");
  isComplete.type = "checkbox";
  isComplete.id = "isComplete";
  isComplete.name = "isComplete";
  isComplete.classList.add("ml-2");

  // Añadir elementos al formulario
  mdForm.appendChild(titleInput);
  mdForm.appendChild(isComplete);
  mdForm.appendChild(btnUpdate);

  // Añadir elementos al contenido del modal
  modalContent.appendChild(mdTitle);
  modalContent.appendChild(mdForm);
  modalContent.appendChild(modalCloseButton);

  // Añadir el contenido del modal al fondo del modal
  modalBackground.appendChild(modalContent);

  // Añadir el fondo del modal al contenedor principal
  contenedor.appendChild(modalBackground);
  //agrega el apeendchiled al container
  contenedor.appendChild(formContainer);
  // Añadir el título y la tabla al contenedor
  container.appendChild(title);
  container.appendChild(btnHome);

  container.appendChild(contenedor);
  contenedor.appendChild(table);

  // Función para abrir el modal y rellenar los datos
  const openModal = (todo) => {
    titleInput.value = todo.title;
    isComplete.checked = todo.completed;
    todosID = todo.id; // Asignar el ID a la variable todosID
    modalBackground.classList.remove("hidden");
    modalContent.classList.remove("hidden");
    formContainer.style.display = "none";
  };

  // Función para cerrar el modal
  const closeModal = () => {
    modalBackground.classList.add("hidden");
    modalContent.classList.add("hidden");
    formContainer.style.display = "flex";
  };

  // Añadir evento para cerrar el modal al botón de cerrar
  modalCloseButton.textContent = "Close";
  modalCloseButton.classList.add(
    "bg-red-500",
    "hover:bg-red-700",
    "text-white",
    "font-bold",
    "py-2",
    "px-4",
    "rounded",
    "mt-2"
  );
  modalCloseButton.addEventListener("click", closeModal);

  // Añadir el evento al botón de actualizar en el formulario
  mdForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const titulo = titleInput.value;
    const isCompleted = isComplete.checked;

    if (!titulo) {
      alert("todos los campos son requeridos");
      return;
    }
    console.log(titulo, isCompleted);

    try {
      const update = await fetch(
        `http://localhost:4000/todos/update/${todosID}`, // Corregir la URL de la solicitud
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: titulo,
            completed: isCompleted,
          }),
        }
      );
      if (update.ok) {
        alert("El todo ha sido actualizado correctamente");
        updateTable();
        closeModal();
      }
    } catch (error) {
      console.error("Error al actualizar el todo:", error);
    }
  });

  const updateTable = () => {
    // Limpiar el cuerpo de la tabla
    tbody.innerHTML = "";

    // Obtener los todos actualizados
    fetch("http://localhost:4000/todos", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        // Recorrer la lista de "todos" y crear filas en la tabla
        data.todos.forEach((todo) => {
          // if (todo.id > 10) return; // Solo mostrar los "todos" con ID menor o igual a 10

          const tr = document.createElement("tr");

          // Crear las celdas de la fila
          const td1 = document.createElement("td");
          td1.classList.add("border", "px-4", "py-2");
          td1.textContent = todo.id;

          const td2 = document.createElement("td");
          td2.classList.add("border", "px-4", "py-2");
          td2.textContent = todo.title;

          const td3 = document.createElement("td");
          td3.classList.add("border", "px-4", "py-2");
          td3.textContent = todo.completed ? "Sí" : "No";

          const td4 = document.createElement("td");
          td4.classList.add("border", "px-4", "py-2");
          td4.textContent = todo.owner;

          const td5 = document.createElement("td");
          td5.classList.add("border", "px-4", "py-2");
          const btnEliminar = document.createElement("button");
          btnEliminar.classList.add(
            "bg-red-500",
            "text-white",
            "p-2",
            "px-4",
            "mt-2",
            "rounded",
            "hover:bg-red-600"
          );
          // Crear un botón "Actualizar" por cada fila
          const btnActualizar = document.createElement("button");
          btnActualizar.classList.add(
            "bg-green-500",
            "text-white",
            "p-2",
            "rounded",
            "hover:bg-green-600"
          );
          btnActualizar.textContent = "Actualizar";
          btnEliminar.textContent = "Eliminar";

          // Añadir evento al botón para abrir el modal con los datos del "todo"
          btnActualizar.addEventListener("click", () => {
            openModal(todo);
          });

          // Añadir el botón a la celda de acciones
          td5.appendChild(btnActualizar);
          td5.appendChild(btnEliminar);

          // Añadir las celdas a la fila
          tr.appendChild(td1);
          tr.appendChild(td2);
          tr.appendChild(td3);
          tr.appendChild(td4);
          tr.appendChild(td5);

          // Añadir la fila al cuerpo de la tabla
          tbody.appendChild(tr);
        });
      });
  };

  // Devolver el contenedor completo
  updateTable();

  return container;
};
