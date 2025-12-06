document.addEventListener('DOMContentLoaded', () => {

    const mainImage = document.getElementById('productImage');
    const thumbnails = document.querySelectorAll('.thumbnail');
    const colorSwatches = document.querySelectorAll('.color-swatch');
    const sizeButtons = document.querySelectorAll('.size-btn');
    const qtyInput = document.querySelector('.qty-input');
    const qtyDecrement = document.querySelector('.qty-btn.decrement');
    const qtyIncrement = document.querySelector('.qty-btn.increment');

    // =========================================
    // 1. Funcionalidad de la Galería (Miniaturas)
    // =========================================
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', () => {
            // Aplicar transición de opacidad antes de cambiar el src
            mainImage.style.opacity = 0;

            // Crear una nueva imagen temporal para precargar
            const tempImg = new Image();
            tempImg.src = thumbnail.src;

            // Cuando la imagen temporal haya cargado (evita la imagen rota/desaparición)
            tempImg.onload = () => {
                mainImage.src = tempImg.src;
                // Suavizar la aparición
                mainImage.style.opacity = 1; 
            };
            
            // Actualizar el estado activo de las miniaturas
            thumbnails.forEach(t => t.classList.remove('active'));
            thumbnail.classList.add('active');
        });
    });

    // =========================================
    // 2. Funcionalidad de Selección de Opciones (Colores)
    // =========================================
    colorSwatches.forEach(swatch => {
        swatch.addEventListener('click', () => {
            colorSwatches.forEach(s => s.classList.remove('active'));
            swatch.classList.add('active');
            
            const selectedColor = swatch.getAttribute('data-color');
            console.log(`Color seleccionado: ${selectedColor}`);
        });
    });
    
    // =========================================
    // 3. Funcionalidad de Selección de Opciones (Tallas)
    // =========================================
    sizeButtons.forEach(button => {
        button.addEventListener('click', () => {
            sizeButtons.forEach(b => b.classList.remove('active'));
            button.classList.add('active');
            
            const selectedSize = button.textContent;
            console.log(`Talla seleccionada: ${selectedSize}`);
        });
    });

    // =========================================
    // 4. Control de Cantidad
    // =========================================
    if (qtyInput) {
        qtyDecrement.addEventListener('click', () => {
            if (qtyInput.value > 1) {
                qtyInput.value = parseInt(qtyInput.value) - 1;
            }
        });
        
        qtyIncrement.addEventListener('click', () => {
            qtyInput.value = parseInt(qtyInput.value) + 1;
        });
        
        // Asegurar que solo se ingresen números y validar límites
        qtyInput.addEventListener('change', () => {
            let value = parseInt(qtyInput.value);
            const min = parseInt(qtyInput.min);
            const max = parseInt(qtyInput.max);
            
            if (isNaN(value) || value < min) {
                value = min;
            } else if (value > max) {
                value = max;
            }
            qtyInput.value = value;
        });
    }

    // =========================================
    // 5. Carga Dinámica (Simulación)
    // =========================================
    const urlParams = new URLSearchParams(window.location.search);
    const productName = urlParams.get('product');

    // Simulación: Si viene un nombre de producto, actualiza el título.
    if (productName) {
        const decodedName = decodeURIComponent(productName);
        document.getElementById('productTitle').textContent = decodedName;
        document.getElementById('productTitleBreadcrumb').textContent = decodedName;
        document.title = `Detalles de Producto | ${decodedName} | Tienda Urbano`;
    }
});