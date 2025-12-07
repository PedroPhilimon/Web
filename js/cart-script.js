document.addEventListener('DOMContentLoaded', () => {

    // =========================================
    // BASE DE DATOS DE PRODUCTOS (Verificado y requerido)
    // =========================================
    const PRODUCTS_DB = {
        "Mini falda globo": { id: "SK001", price: 6990, image: "https://www.tricot.cl/dw/image/v2/BGHZ_PRD/on/demandware.static/-/Sites-master-catalog-tricot/default/dwa367d6d8/images/large/MD685382.jpg?sw=2000&sh=2000&sm=fit&q=80&strip=false", details: "Color negro, Talla XS - L" },
        "Enterito mujer tencel": { id: "ENT002", price: 9990, image: "https://www.tricot.cl/dw/image/v2/BGHZ_PRD/on/demandware.static/-/Sites-master-catalog-tricot/default/dw173ff2ec/images/large/MD685781.jpg?sw=2000&sh=2000&sm=fit&q=80&strip=false", details: "Color celeste, Talla S - XL" },
        "Blusa mujer wrinkled": { id: "BLU003", price: 4990, image: "https://www.tricot.cl/dw/image/v2/BGHZ_PRD/on/demandware.static/-/Sites-master-catalog-tricot/default/dw5de53964/images/large/MD648286-5.jpg?sw=2000&sh=2000&sm=fit&q=80&strip=false", details: "Color blanco, Talla XS - L" },
        "Vest mujer líneas": { id: "VEST04", price: 7990, image: "https://www.tricot.cl/dw/image/v2/BGHZ_PRD/on/demandware.static/-/Sites-master-catalog-tricot/default/dw0250e345/images/large/MD685054.jpg?sw=400&sh=400&sm=fit&q=80&strip=false", details: "Color blanco, Talla XS - XL" },
        "Pareo mujer mix Colores": { id: "PAR005", price: 5990, image: "https://www.tricot.cl/dw/image/v2/BGHZ_PRD/on/demandware.static/-/Sites-master-catalog-tricot/default/dw615c80da/images/large/MD643756.jpg?sw=2000&sh=2000&sm=fit&q=80&strip=false", details: "Talla XL" },
        "Blusa mujer diseño rayas": { id: "BLU006", price: 6390, price_old: 6990, image: "https://www.tricot.cl/dw/image/v2/BGHZ_PRD/on/demandware.static/-/Sites-master-catalog-tricot/default/dwfac1dca8/images/large/MD686200.jpg?sw=2000&sh=2000&sm=fit&q=80&strip=false", details: "Color blanco, Talla S - L" },
        "Enterito mujer cinturón": { id: "ENT007", price: 12990, image: "https://www.tricot.cl/dw/image/v2/BGHZ_PRD/on/demandware.static/-/Sites-master-catalog-tricot/default/dw8cb6f9b7/images/large/MD686147.jpg?sw=2000&sh=2000&sm=fit&q=80&strip=false", details: "Color café, Talla S - L" },
        "Vestido mujer puntos": { id: "VST008", price: 11990, image: "https://www.tricot.cl/dw/image/v2/BGHZ_PRD/on/demandware.static/-/Sites-master-catalog-tricot/default/dw82563826/images/large/MD686197.jpg?sw=2000&sh=2000&sm=fit&q=80&strip=false", details: "Color blanco, Talla S - XL" },
        "Pantalón mujer palazzo": { id: "PAL009", price: 23990, image: "https://www.tricot.cl/dw/image/v2/BGHZ_PRD/on/demandware.static/-/Sites-master-catalog-tricot/default/dwc6e1fb81/images/large/MD561471.jpg?sw=2000&sh=2000&sm=fit&q=80&strip=false", details: "Color rosado, Talla S - L" },
        "Chaqueta mujer lino cargo": { id: "CHQ10", price: 28990, image: "https://www.tricot.cl/dw/image/v2/BGHZ_PRD/on/demandware.static/-/Sites-master-catalog-tricot/default/dw40db59a0/images/large/MD648159.jpg?sw=2000&sh=2000&sm=fit&q=80&strip=false", details: "Color beige, Talla S - XL" }
    };

    const cartItemList = document.getElementById('cartItemList');
    const summarySubtotal = document.getElementById('summarySubtotal');
    const summaryTotal = document.getElementById('summaryTotal');

    const formatCurrency = (number) => {
        return `$${new Intl.NumberFormat('es-CL').format(number)}`;
    };

    // --- MANEJO DE LOCALSTORAGE ---

    const getCart = () => {
        const cartJSON = localStorage.getItem('shoppingCart');
        return cartJSON ? JSON.parse(cartJSON) : [];
    };

    const saveCart = (cartArray) => {
        localStorage.setItem('shoppingCart', JSON.stringify(cartArray));
    };
    
    const clearCart = () => {
        if (confirm("¿Estás seguro de que quieres vaciar completamente el carrito?")) {
            saveCart([]); 
            renderCartItems([]); 
        }
    };

    // --- RENDERING Y CÁLCULO ---

    const renderCartItems = (cart) => {
        cartItemList.innerHTML = ''; 
        let currentSubtotal = 0;

        if (cart.length === 0) {
            cartItemList.innerHTML = '<p class="empty-cart-message">Tu carrito está vacío. ¡Añade algunos productos!</p>';
            summarySubtotal.textContent = formatCurrency(0);
            summaryTotal.textContent = formatCurrency(0);
            return;
        }

        cart.forEach(item => {
            // Buscamos el producto por el nombre guardado en localStorage
            const productData = PRODUCTS_DB[item.name]; 
            
            // Si el producto no existe en nuestra DB local, saltamos (esto evita el error)
            if (!productData) return; 

            const itemPrice = productData.price;
            const itemSubtotal = itemPrice * item.quantity;
            currentSubtotal += itemSubtotal;

            const itemHTML = `
                <div class="cart-item" data-id="${item.id}">
                    <div class="item-product-info col-product">
                        <img src="${productData.image}" alt="${item.name}">
                        <div>
                            <h3 class="item-title">${item.name}</h3>
                            <p class="item-details">${productData.details}</p>
                            <button class="item-remove-btn" data-id="${item.id}">
                                <i class="fas fa-trash-alt"></i> Eliminar
                            </button>
                        </div>
                    </div>
                    <span class="item-price col-price" data-price="${itemPrice}">${formatCurrency(itemPrice)}</span>
                    <div class="item-quantity col-quantity">
                        <button class="qty-btn decrement" data-id="${item.id}">-</button>
                        <input type="number" value="${item.quantity}" min="1" class="qty-input" data-id="${item.id}">
                        <button class="qty-btn increment" data-id="${item.id}">+</button>
                    </div>
                    <span class="item-subtotal col-subtotal">${formatCurrency(itemSubtotal)}</span>
                </div>
            `;
            cartItemList.insertAdjacentHTML('beforeend', itemHTML);
        });

        summarySubtotal.textContent = formatCurrency(currentSubtotal);
        summaryTotal.textContent = formatCurrency(currentSubtotal);

        setupEventListeners();
    };

    // --- MANEJO DE EVENTOS Y LÓGICA DE ACTUALIZACIÓN ---

    const handleQuantityChange = (id, change) => {
        let cart = getCart();
        const itemIndex = cart.findIndex(item => item.id === id);

        if (itemIndex > -1) {
            let newQuantity = cart[itemIndex].quantity + change;
            if (newQuantity < 1) newQuantity = 1; 

            cart[itemIndex].quantity = newQuantity;
            saveCart(cart);
            renderCartItems(cart);
        }
    };

    const handleRemoveItem = (id) => {
        if (confirm("¿Estás seguro de que quieres eliminar este producto?")) {
            let cart = getCart();
            const newCart = cart.filter(item => item.id !== id);
            saveCart(newCart);
            renderCartItems(newCart);
        }
    };

    const setupEventListeners = () => {
        // Eventos para botones de cantidad (+/-)
        cartItemList.querySelectorAll('.qty-btn').forEach(button => {
            button.onclick = (e) => {
                const id = e.target.getAttribute('data-id');
                const change = e.target.classList.contains('increment') ? 1 : -1;
                handleQuantityChange(id, change);
            };
        });

        // Eventos para botón Eliminar individual
        cartItemList.querySelectorAll('.item-remove-btn').forEach(button => {
            button.onclick = (e) => {
                const id = e.target.getAttribute('data-id');
                handleRemoveItem(id);
            };
        });

        // Evento para el botón VACÍAR CARRITO (Agregaremos un botón en el HTML de cart.html si no existe)
        const clearCartButton = document.getElementById('clearCartBtn');
        if (clearCartButton) {
            clearCartButton.onclick = clearCart;
        }

        // Manejo de input de cantidad manual
        cartItemList.querySelectorAll('.qty-input').forEach(input => {
            input.onchange = (e) => {
                const id = e.target.getAttribute('data-id');
                const newQty = parseInt(e.target.value);
                
                let cart = getCart();
                const item = cart.find(item => item.id === id);

                if (item && newQty >= 1) {
                    item.quantity = newQty;
                    saveCart(cart);
                    renderCartItems(cart);
                } else if (item && newQty < 1) {
                    e.target.value = 1;
                    item.quantity = 1;
                    saveCart(cart);
                    renderCartItems(cart);
                }
            };
        });
    };

    // Cargar el carrito al iniciar la página
    renderCartItems(getCart());
});