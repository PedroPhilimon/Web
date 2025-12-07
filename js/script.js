document.addEventListener('DOMContentLoaded', () => {

    // =========================================
    // Base de Datos de Productos (Para sincronización)
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

    // =========================================
    // Funciones de Persistencia (LocalStorage)
    // =========================================
    const getCart = () => {
        const cartJSON = localStorage.getItem('shoppingCart');
        return cartJSON ? JSON.parse(cartJSON) : [];
    };

    const updateCartIconBadge = (cartLength) => {
        const badge = document.querySelector('.cart-icon .badge');
        if (badge) {
            badge.textContent = cartLength;
            badge.setAttribute('data-count', cartLength);
        }
    };

    const saveCart = (cartArray) => {
        localStorage.setItem('shoppingCart', JSON.stringify(cartArray));
        // Suma la cantidad total de ítems distintos en el carrito
        updateCartIconBadge(cartArray.reduce((total, item) => total + item.quantity, 0)); 
    };

    const addToCart = (productName, quantity = 1) => {
        const product = PRODUCTS_DB[productName];
        if (!product) {
            console.error(`Producto no encontrado: ${productName}`);
            return;
        }

        let cart = getCart();
        const existingItem = cart.find(item => item.name === productName);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({ id: product.id, name: productName, quantity: quantity });
        }

        saveCart(cart);
        // Podrías usar un toast o modal aquí en lugar de alert()
        console.log(`¡${productName} añadido al carrito!`);
    };

    // --- LISTENERS PARA BOTONES DE AÑADIR ---

    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            // e.preventDefault() eliminado, no es necesario aquí y evita potenciales bugs
            const productName = e.target.closest('.add-to-cart-btn').getAttribute('data-product-name');
            if (productName) {
                addToCart(productName, 1);
            }
        });
    });

    // Inicializar la insignia del carrito al cargar la página
    saveCart(getCart());


    // =========================================
    // 1. Funcionalidad del Modo Oscuro (Mantenido)
    // =========================================
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    
    const loadDarkMode = () => {
        const isDarkMode = localStorage.getItem('darkMode') === 'true';
        if (isDarkMode) {
            body.classList.add('dark-mode');
            body.classList.remove('light-mode');
        } else {
            body.classList.add('light-mode');
            body.classList.remove('dark-mode');
        }
    };
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            const isDarkMode = !body.classList.contains('dark-mode');
            body.classList.toggle('dark-mode', isDarkMode);
            body.classList.toggle('light-mode', !isDarkMode);
            localStorage.setItem('darkMode', isDarkMode);
            const icon = darkModeToggle.querySelector('i');
            icon.classList.toggle('fa-moon', !isDarkMode);
            icon.classList.toggle('fa-sun', isDarkMode);
        });
    }
    loadDarkMode(); 


    // =========================================
    // 2. Navegación Móvil (Mantenido)
    // =========================================
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });
    }

    // =========================================
    // 3. Funcionalidad de Carrusel y Animaciones (Mantenido)
    // =========================================
    const productSections = document.querySelectorAll('.product-showcase');
    productSections.forEach(section => {
        const carousel = section.querySelector('.product-carousel');
        const nextButton = section.querySelector('.carousel-nav.next');
        const prevButton = section.querySelector('.carousel-nav.prev');
        const scrollAmount = 305; 
        const checkScroll = () => {
             prevButton.style.opacity = carousel.scrollLeft > 0 ? '1' : '0';
             const isAtEnd = carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth - 1;
             nextButton.style.opacity = isAtEnd ? '0' : '1';
        };
        if (nextButton) {
            nextButton.addEventListener('click', () => {
                carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            });
        }
        if (prevButton) {
            prevButton.addEventListener('click', () => {
                carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            });
        }
        carousel.addEventListener('scroll', checkScroll);
        checkScroll();
    });

    const heroSection = document.querySelector('.hero-section');
    const dots = heroSection.querySelectorAll('.dot');
    const heroContent = heroSection.querySelector('.hero-content');
    let currentSlide = 0;
    const totalSlides = dots.length;
    const heroSlides = [
        { title: 'Define tu estilo con Tienda Urbano.', text: 'Diseños modernos y cómodos que se adaptan a tu ritmo. Encuentra las últimas tendencias en ropa, accesorios y calzado que tu estilo te define.', button1: 'Ver Ofertas', button2: 'Ver Productos' },
        { title: '¡Nuevas Colecciones de Invierno 2025!', text: 'Abrígate con estilo. Descubre lo último en chaquetas, sweaters y botas con materiales de primera calidad.', button1: 'VER INVIERNO', button2: 'NUEVOS ARRIBOS' },
        { title: 'Grandes Descuentos en Jeans', text: 'Hasta 50% de descuento en una selección de tus denim favoritos. ¡No te lo pierdas por tiempo limitado!', button1: 'VER JEANS', button2: 'TIENDA COMPLETA' }
    ];

    function updateHeroSlide(index) {
        heroContent.style.opacity = 0;
        setTimeout(() => {
            heroContent.querySelector('.hero-title').textContent = heroSlides[index].title;
            heroContent.querySelector('.hero-subtitle').textContent = heroSlides[index].text;
            const actions = heroContent.querySelectorAll('.hero-actions a');
            actions[0].textContent = heroSlides[index].button1;
            actions[1].textContent = heroSlides[index].button2;
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
            heroContent.style.opacity = 1;
        }, 300);
    }
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            updateHeroSlide(currentSlide);
            resetAutoPlay();
        });
    });
    let autoPlayInterval;
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateHeroSlide(currentSlide);
    }
    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, 6000);
    }
    function resetAutoPlay() {
        clearInterval(autoPlayInterval);
        startAutoPlay();
    }
    updateHeroSlide(currentSlide); 
    startAutoPlay();
    
    if (typeof ScrollReveal !== 'undefined') {
        const sr = ScrollReveal({ distance: '30px', duration: 1000, easing: 'cubic-bezier(.175, .885, .32, 1.275)', origin: 'bottom', reset: false });
        sr.reveal('.hero-title, .hero-subtitle, .list-header h3', { origin: 'top', distance: '20px', duration: 800, interval: 100, delay: 100 });
        sr.reveal('.category-card', { interval: 150, delay: 200 });
        sr.reveal('.product-carousel .product-card', { interval: 100, origin: 'bottom', distance: '50px', delay: 100 });
        sr.reveal('.season-card', { origin: 'left', interval: 250, distance: '40px', delay: 300 });
        sr.reveal('.jeans-banner', { scale: 0.9, duration: 1200, distance: '0px', delay: 100 });
        sr.reveal('.subscription-content', { origin: 'left', distance: '40px' });
        sr.reveal('.subscription-form', { origin: 'right', distance: '40px', delay: 200 });
    }
    
    // =========================================
    // 6. Redirección a la Página de Detalle - SECCIÓN ELIMINADA 
    // Ahora los enlaces HTML funcionarán de forma nativa.
    // =========================================

});