const carrito = [];

function agregarAlCarrito(boton) {
  // Obtener los datos del producto desde los atributos del botón
  const id = boton.getAttribute("data-id");
  const nombre = boton.getAttribute("data-nombre");
  const precio = parseFloat(boton.getAttribute("data-precio"));

  // Crear un objeto que representa el producto
  const producto = {
    id,
    nombre,
    precio,
  };

  // Agregar el producto al carrito
  carrito.push(producto);

  // Actualizar el carrito en la página
  actualizarCarritoEnPagina();
}

function actualizarCarritoEnPagina() {
  const tbody = document.querySelector("#carrito tbody");
  tbody.innerHTML = ""; // Borra el contenido actual del carrito

  let total = 0;

  carrito.forEach((producto) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${producto.nombre}</td>
      <td>$${producto.precio.toFixed(2)}</td>
      <td>1</td>
      <td>$${producto.precio.toFixed(2)}</td>
    `;
    total += producto.precio;
    tbody.appendChild(fila);
  });

  // Mostrar el total
  const totalElement = document.createElement("tr");
  totalElement.innerHTML = `
    <td><strong>Total</strong></td>
    <td></td>
    <td></td>
    <td><strong>$${total.toFixed(2)}</strong></td>
  `;
  tbody.appendChild(totalElement);

  document.querySelector("#vaciar-carrito").addEventListener("click", () => {
    carrito.length = 0; // Vacía el carrito
    actualizarCarritoEnPagina();
  });
}

// Escucha los clics en los botones "Agregar al Carrito"
const botonesAgregar = document.querySelectorAll("button[data-id]");
botonesAgregar.forEach((boton) => {
  boton.addEventListener("click", () => {
    agregarAlCarrito(boton);
  });
});
