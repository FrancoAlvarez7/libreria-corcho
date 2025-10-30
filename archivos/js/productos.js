document.addEventListener('DOMContentLoaded', function() {

    const catalogoProductosEl = document.getElementById('lista-productos');

    if (!catalogoProductosEl) return;

    if (typeof productos === 'undefined') {
        console.error("La lista de productos no está disponible.");
        return;
    }
    
    productos.forEach(producto => {
        const productoHTML = `
            <div class="col">
                <article class="card h-100 shadow-sm">
                    <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                    <div class="card-body">
                        <h2 class="h5 card-title mb-1">${producto.nombre}</h2>
                        <p class="card-text text-muted mb-2">${producto.descripcion}</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <span class="fw-semibold">$${producto.precio.toLocaleString('es-AR')}</span>
                        </div>
                    </div>
                </article>
            </div>
        `;
        catalogoProductosEl.innerHTML += productoHTML;
    });
});