document.addEventListener('DOMContentLoaded', () => {

    // =========================================
    // 1. Funcionalidad del Modo Oscuro (Dark Mode)
    // =========================================
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;

    // Cargar la preferencia guardada del usuario
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

    // Alternar el modo
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            // Alternar la clase en el body
            const isDarkMode = !body.classList.contains('dark-mode'); // Se invierte la lógica antes de aplicar
            
            body.classList.toggle('dark-mode', isDarkMode);
            body.classList.toggle('light-mode', !isDarkMode);

            // Guardar la preferencia en localStorage
            localStorage.setItem('darkMode', isDarkMode);
            
            // Opcional: Cambiar el icono del botón (ya cubierto en CSS con pseudo-clase)
            const icon = darkModeToggle.querySelector('i');
            icon.classList.toggle('fa-moon', !isDarkMode);
            icon.classList.toggle('fa-sun', isDarkMode);
        });
    }

    loadDarkMode(); // Inicializar al cargar


    // =========================================
    // 2. Navegación Móvil (Menú Hamburguesa)
    // =========================================
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            // Alternar el icono de hamburguesa a 'X' para mejor UX
            const icon = menuToggle.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times'); // Icono de cerrar (X)
        });
    }


    // =========================================
    // 3. Funcionalidad de Carrusel para Listados de Productos
    // =========================================
    const productSections = document.querySelectorAll('.product-showcase');

    productSections.forEach(section => {
        const carousel = section.querySelector('.product-carousel');
        const nextButton = section.querySelector('.carousel-nav.next');
        const prevButton = section.querySelector('.carousel-nav.prev');
        
        // Define el desplazamiento basado en el ancho de una tarjeta + el gap CSS (280px + 25px)
        const scrollAmount = 305; 
        
        // Función para verificar si hay más contenido para desplazar
        const checkScroll = () => {
             // Ocultar botón 'prev' si está al inicio
             prevButton.style.opacity = carousel.scrollLeft > 0 ? '1' : '0';

             // Ocultar botón 'next' si está al final (con un margen de error)
             const isAtEnd = carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth - 1;
             nextButton.style.opacity = isAtEnd ? '0' : '1';
        };

        // Evento para desplazamiento hacia adelante (Next)
        if (nextButton) {
            nextButton.addEventListener('click', () => {
                carousel.scrollBy({
                    left: scrollAmount,
                    behavior: 'smooth'
                });
            });
        }
        
        // Evento para desplazamiento hacia atrás (Prev)
        if (prevButton) {
            prevButton.addEventListener('click', () => {
                carousel.scrollBy({
                    left: -scrollAmount,
                    behavior: 'smooth'
                });
            });
        }

        // Llamar a checkScroll en cada desplazamiento y al cargar
        carousel.addEventListener('scroll', checkScroll);
        
        // Inicializar el estado de los botones
        checkScroll();
    });


    // =========================================
    // 4. Carrusel/Dots del Hero Section (Auto-play y Contenido)
    // =========================================
    const heroSection = document.querySelector('.hero-section');
    const dots = heroSection.querySelectorAll('.dot');
    const heroContent = heroSection.querySelector('.hero-content');
    
    let currentSlide = 0;
    const totalSlides = dots.length;

    // Contenido simulado para cada slide
    const heroSlides = [
        { title: 'Define tu estilo con Tienda Urbano.', text: 'Diseños modernos y cómodos que se adaptan a tu ritmo. Encuentra las últimas tendencias en ropa, accesorios y calzado que tu estilo te define.', button1: 'Ver Ofertas', button2: 'Ver Productos' },
        { title: '¡Nuevas Colecciones de Invierno 2025!', text: 'Abrígate con estilo. Descubre lo último en chaquetas, sweaters y botas con materiales de primera calidad.', button1: 'VER INVIERNO', button2: 'NUEVOS ARRIBOS' },
        { title: 'Grandes Descuentos en Jeans', text: 'Hasta 50% de descuento en una selección de tus denim favoritos. ¡No te lo pierdas por tiempo limitado!', button1: 'VER JEANS', button2: 'TIENDA COMPLETA' }
    ];

    function updateHeroSlide(index) {
        // Animación de desvanecimiento para la transición (CSS se encarga del resto)
        heroContent.style.opacity = 0;

        setTimeout(() => {
            // Actualiza el contenido
            heroContent.querySelector('.hero-title').textContent = heroSlides[index].title;
            heroContent.querySelector('.hero-subtitle').textContent = heroSlides[index].text;
            
            // Actualiza los textos de los botones (solo el texto, no los links)
            const actions = heroContent.querySelectorAll('.hero-actions a');
            actions[0].textContent = heroSlides[index].button1;
            actions[1].textContent = heroSlides[index].button2;

            // Actualiza los dots
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });

            // Muestra el contenido con animación
            heroContent.style.opacity = 1;

        }, 300); // Espera 300ms para la transición
    }

    // Inicializar listeners para los puntos
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            updateHeroSlide(currentSlide);
            resetAutoPlay();
        });
    });

    // Auto-play y reinicio
    let autoPlayInterval;
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateHeroSlide(currentSlide);
    }

    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, 6000); // Cambia cada 6 segundos
    }

    function resetAutoPlay() {
        clearInterval(autoPlayInterval);
        startAutoPlay();
    }

    // Iniciar el carrusel
    updateHeroSlide(currentSlide); 
    startAutoPlay();


    // =========================================
    // 5. Animaciones con ScrollReveal (Transiciones con Scroll)
    // =========================================
    // Nota: El link de la librería ScrollReveal debe estar en el HTML antes de script.js
    if (typeof ScrollReveal !== 'undefined') {
        // Configuracion base para todas las animaciones
        const sr = ScrollReveal({
            distance: '30px',
            duration: 1000,
            easing: 'cubic-bezier(.175, .885, .32, 1.275)', // Animación más "elástica"
            origin: 'bottom',
            reset: false, // Animación solo una vez
        });

        // Títulos y Subtítulos Principales
        sr.reveal('.hero-title, .hero-subtitle, .list-header h3', {
            origin: 'top',
            distance: '20px',
            duration: 800,
            interval: 100,
            delay: 100
        });
        
        // Grid de Categorías (Aparecen con un pequeño intervalo)
        sr.reveal('.category-card', {
            interval: 150,
            delay: 200
        });

        // Carruseles de Productos (Las tarjetas aparecen una por una)
        sr.reveal('.product-carousel .product-card', {
            interval: 100,
            origin: 'bottom',
            distance: '50px',
            delay: 100
        });

        // Banners Estacionales y de Jeans
        sr.reveal('.season-card', {
            origin: 'left',
            interval: 250,
            distance: '40px',
            delay: 300
        });
        sr.reveal('.jeans-banner', {
            scale: 0.9,
            duration: 1200,
            distance: '0px',
            delay: 100
        });

        // Sección de Suscripción
        sr.reveal('.subscription-content', { 
            origin: 'left',
            distance: '40px' 
        });
        sr.reveal('.subscription-form', { 
            origin: 'right',
            distance: '40px',
            delay: 200
        });
    }


    

}); // Fin del DOMContentLoaded