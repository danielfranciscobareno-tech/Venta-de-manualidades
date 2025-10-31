document.addEventListener("DOMContentLoaded", () => {
    const botones = document.querySelectorAll(".btn-primary");

    botones.forEach(boton => {
        boton.addEventListener("click", (e) => {
            const card = e.target.closest(".card");
            const titulo = card.querySelector(".card-text").textContent.trim();
            const precio = card.querySelector(".card-title").textContent.trim();
            const imagen = card.querySelector("img").getAttribute("src");

            const producto = {
                nombre: titulo,
                precio: precio,
                imagen: imagen,
                cantidad: 1
            };

            agregarAlCarrito(producto);
        });
    });
});

/**
 * Guarda el producto en localStorage (carrito)
 */
function agregarAlCarrito(producto) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    // Verificar si ya está en el carrito
    const indice = carrito.findIndex(p => p.nombre === producto.nombre);
    if (indice >= 0) {
        carrito[indice].cantidad += 1;
    } else {
        carrito.push(producto);
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    alert("✅ Producto añadido al carrito");
}
