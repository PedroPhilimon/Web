document.addEventListener('DOMContentLoaded', () => {

    // Nota: Esta base de datos DEBE coincidir con la de script.js para la sincronización del carrito
    const PRODUCTS_DB = {
        "Mini falda globo": { id: "SK001", price: 6990, image: "https://www.tricot.cl/dw/image/v2/BGHZ_PRD/on/demandware.static/-/Sites-master-catalog-tricot/default/dwa367d6d8/images/large/MD685382.jpg?sw=2000&sh=2000&sm=fit&q=80&strip=false", details: "Color negro, Talla XS - L", file: "detail_product_mini_falda.html" },
        "Enterito mujer tencel": { id: "ENT002", price: 9990, image: "https://www.tricot.cl/dw/image/v2/BGHZ_PRD/on/demandware.static/-/Sites-master-catalog-tricot/default/dw173ff2ec/images/large/MD685781.jpg?sw=2000&sh=2000&sm=fit&q=80&strip=false", details: "Color celeste, Talla S - XL", file: "detail_product_enterito_tencel.html" },
        "Blusa mujer wrinkled": { id: "BLU003", price: 4990, image: "https://www.tricot.cl/dw/image/v2/BGHZ_PRD/on/demandware.static/-/Sites-master-catalog-tricot/default/dw5de53964/images/large/MD648286-5.jpg?sw=2000&sh=2000&sm=fit&q=80&strip=false", details: "Color blanco, Talla XS - L", file: "detail_product_blusa_wrinkled.html" },
        "Vest mujer líneas": { id: "VEST04", price: 7990, image: "https://www.tricot.cl/dw/image/v2/BGHZ_PRD/on/demandware.static/-/Sites-master-catalog-tricot/default/dw0250e345/images/large/MD685054.jpg?sw=400&sh=400&sm=fit&q=80&strip=false", details: "Color blanco, Talla XS - XL", file: "detail_product_vest_lineas.html" },
        "Pareo mujer mix Colores": { id: "PAR005", price: 5990, image: "https://www.tricot.cl/dw/image/v2/BGHZ_PRD/on/demandware.static/-/Sites-master-catalog-tricot/default/dw615c80da/images/large/MD643756.jpg?sw=2000&sh=2000&sm=fit&q=80&strip=false", details: "Talla XL", file: "detail_product.html" },
        "Blusa mujer diseño rayas": { id: "BLU006", price: 6390, price_old: 6990, image: "https://www.tricot.cl/dw/image/v2/BGHZ_PRD/on/demandware.static/-/Sites-master-catalog-tricot/default/dwfac1dca8/images/large/MD686200.jpg?sw=2000&sh=2000&sm=fit&q=80&strip=false", details: "Color blanco, Talla S - L", file: "detail_product.html" },
        "Enterito mujer cinturón": { id: "ENT007", price: 12990, image: "https://www.tricot.cl/dw/image/v2/BGHZ_PRD/on/demandware.static/-/Sites-master-catalog-tricot/default/dw8cb6f9b7/images/large/MD686147.jpg?sw=2000&sh=2000&sm=fit&q=80&strip=false", details: "Color café, Talla S - L", file: "detail_product.html" },
        "Vestido mujer puntos": { id: "VST008", price: 11990, image: "https://www.tricot.cl/dw/image/v2/BGHZ_PRD/on/demandware.static/-/Sites-master-catalog-tricot/default/dw82563826/images/large/MD686197.jpg?sw=2000&sh=2000&sm=fit&q=80&strip=false", details: "Color blanco, Talla S - XL", file: "detail_product.html" },
        "Pantalón mujer palazzo": { id: "PAL009", price: 23990, image: "https://www.tricot.cl/dw/image/v2/BGHZ_PRD/on/demandware.static/-/Sites-master-catalog-tricot/default/dwc6e1fb81/images/large/MD561471.jpg?sw=2000&sh=2000&sm=fit&q=80&strip=false", details: "Color rosado, Talla S - L", file: "detail_product.html" },
        "Chaqueta mujer lino cargo": { id: "CHQ10", price: 28990, image: "https://www.tricot.cl/dw/image/v2/BGHZ_PRD/on/demandware.static/-/Sites-master-catalog-tricot/default/dw40db59a0/images/large/MD648159.jpg?sw=2000&sh=2000&sm=fit&q=80&strip=false", details: "Color beige, Talla S - XL", file: "detail_product.html" }
    };
    
    const productGrid = document.getElementById('productGrid');
    const productCountDisplay = document.getElementById('productCount');
    
    // Función de formato de moneda (utilizada en cart-script.js)
    const formatCurrency = (number) => {
        return `$${new Intl.NumberFormat('es-CL').format(number)}`;
    };

    // Función para obtener la lógica de añadir al carrito desde script.js
    const addToCartFromDB = (productName, quantity = 1) => {
        // En un entorno real, haríamos window.addToCart(productName, quantity)
        // Aquí simulamos la lógica simple de guardado:
        let cart = JSON.parse(localStorage.getItem('shoppingCart') || '[]');
        const product = PRODUCTS_DB[productName];

        if (!product) return;

        const existingItem = cart.find(item => item.name === productName);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({ id: product.id, name: productName, quantity: quantity });
        }
        localStorage.setItem('shoppingCart', JSON.stringify(cart));
        alert(`¡${productName} añadido al carrito!`);
        // Nota: El ícono del carrito se actualizará al volver a la página principal
    };

    // Función principal para dibujar las tarjetas
    const renderProducts = (products) => {
        productGrid.innerHTML = ''; // Limpiar cuadrícula
        productCountDisplay.textContent = products.length;

        Object.keys(products).forEach(productName => {
            const data = products[productName];
            const isSale = data.price_old;
            const detailFile = data.file || 'detail_product.html'; // Fallback a detail_product.html

            const priceHTML = isSale 
                ? `<div class="price-group"><span class="product-price-old">${formatCurrency(data.price_old)}</span><span class="product-price sale-price">${formatCurrency(data.price)}</span></div><span class="sale-tag">-10%</span>`
                : `<p class="product-price">${formatCurrency(data.price)}</p>`;

            const cardHTML = `
                <div class="product-card">
                    <a href="${detailFile}?product=${encodeURIComponent(productName)}" aria-label="Ver detalles de ${productName}">
                        <img src="${data.image}" alt="${productName}">
                    </a>
                    <div class="product-info">
                        <p class="product-title"><a href="${detailFile}?product=${encodeURIComponent(productName)}">${productName}</a></p>
                        <p class="product-details">${data.details}</p>
                        ${priceHTML}
                        <button class="add-to-cart-btn" data-product-name="${productName}" aria-label="Añadir ${productName} al carrito"><i class="fas fa-shopping-cart"></i></button>
                    </div>
                </div>
            `;
            productGrid.insertAdjacentHTML('beforeend', cardHTML);
        });

        // Reasignar listeners de añadir al carrito
        document.querySelectorAll('.product-catalog .add-to-cart-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const productName = e.currentTarget.getAttribute('data-product-name');
                addToCartFromDB(productName, 1);
            });
        });
    };
    
    // Iniciar el renderizado con todos los productos
    renderProducts(PRODUCTS_DB);

    // Nota: Aquí se añadiría la lógica para los filtros y el ordenamiento si fuera necesario.
});