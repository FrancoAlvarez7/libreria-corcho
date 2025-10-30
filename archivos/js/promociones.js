
$(document).ready(function() {

    const promociones = [
        { id: '50%off', nombre: '50% OFF 2da Unidad', descripcion: 'Llevando 2 productos iguales, tenés 50% de descuento en el segundo.' },
        { id: '3x2', nombre: 'Promo 3x2', descripcion: 'Llevás 3 productos seleccionados y pagás solo 2.' },
        { id: '10%off', nombre: '10% OFF Compra Total', descripcion: 'En compras superiores a $30.000, tenés un 10% de descuento adicional.' }
    ];
    const formatoPrecio = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' });

    const listaProductosEl = $('#lista-productos');
    const listaPromocionesEl = $('#lista-promociones');
    const subtotalEl = $('#subtotal');
    const totalDescuentosEl = $('#total-descuentos');
    const totalFinalEl = $('#total-final');
    const detalleDescuentosEl = $('#detalle-descuentos');

    function renderizarListaPromociones() {
        if (!listaPromocionesEl.length) return;
        let html = '<h2 class="h5 mt-4">Promociones disponibles:</h2><ul>';
        promociones.forEach(promo => {
            html += `<li>${promo.descripcion}</li>`;
        });
        html += '</ul>';
        listaPromocionesEl.html(html); 
    }

    function renderizarProductos() {
        if (!listaProductosEl.length) return;
        productos.forEach(producto => {
            const productoHTML = `
                <div class="card shadow-sm mb-3">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-center">
                            <div>
                                <h3 class="h6 card-title mb-1">${producto.nombre}</h3>
                                <p class="text-muted mb-0">${formatoPrecio.format(producto.precio)}</p>
                            </div>
                            <div class="d-flex align-items-center" style="width: 120px;">
                                <label for="prod-${producto.id}" class="visually-hidden">Cantidad</label>
                                <input type="number" class="form-control input-cantidad" value="0" min="0" data-id="${producto.id}">
                            </div>
                        </div>
                    </div>
                </div>`;
            listaProductosEl.append(productoHTML); 
        });
    }

    function calcularYMostrarTotal() {
        let subtotal = 0;
        let descuentoTotal = 0;
        let detallesHTML = '<p class="text-muted mb-1">Descuentos aplicados:</p><ul class="list-unstyled mb-0">';
        const productosConPromo3x2 = [1, 3, 5];

        $('.input-cantidad').each(function() {
            const cantidad = parseInt($(this).val()); 
            const productoId = parseInt($(this).data('id')); 
            const producto = productos.find(p => p.id === productoId);

            if (cantidad > 0) {
                subtotal += producto.precio * cantidad;
                if (productosConPromo3x2.includes(producto.id) && cantidad >= 3) {
                    const trios = Math.floor(cantidad / 3);
                    const descuento = trios * producto.precio;
                    descuentoTotal += descuento;
                    detallesHTML += `<li class="text-success small"><strong>${promociones[1].nombre}:</strong> -${formatoPrecio.format(descuento)} en "${producto.nombre}"</li>`;
                } else if (cantidad >= 2) {
                    const pares = Math.floor(cantidad / 2);
                    const descuento = pares * (producto.precio * 0.5);
                    descuentoTotal += descuento;
                    detallesHTML += `<li class="text-success small"><strong>${promociones[0].nombre}:</strong> -${formatoPrecio.format(descuento)} en "${producto.nombre}"</li>`;
                }
            }
        });
        
        if (subtotal > 30000) {
            const descuentoAdicional = subtotal * 0.10;
            descuentoTotal += descuentoAdicional;
            detallesHTML += `<li class="text-success small"><strong>${promociones[2].nombre}:</strong> -${formatoPrecio.format(descuentoAdicional)} sobre el total</li>`;
        }
        
        detallesHTML += '</ul>';
        const totalFinal = subtotal - descuentoTotal;

        subtotalEl.text(formatoPrecio.format(subtotal));
        totalDescuentosEl.text(`-${formatoPrecio.format(descuentoTotal)}`);
        totalFinalEl.text(formatoPrecio.format(totalFinal));

        if (descuentoTotal > 0) {
            detalleDescuentosEl.html(detallesHTML);
        } else {
            detalleDescuentosEl.html('<p class="text-muted small">Añadí más productos para ver descuentos.</p>');
        }
    }

    renderizarListaPromociones();
    renderizarProductos();

    listaProductosEl.on('input', '.input-cantidad', calcularYMostrarTotal);
    
    calcularYMostrarTotal();
});