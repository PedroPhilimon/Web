document.addEventListener('DOMContentLoaded', () => {

    const inputGroups = document.querySelectorAll('.input-group');

    // Función para manejar el foco
    function handleFocus(event) {
        // Encuentra el .input-group padre y añade la clase 'active'
        const group = event.target.closest('.input-group');
        if (group) {
            group.classList.add('active');
        }
    }

    // Función para manejar la pérdida de foco
    function handleBlur(event) {
        const input = event.target;
        const group = input.closest('.input-group');

        if (group) {
            // Quita la clase 'active' solo si el input está vacío
            if (input.value.trim() === '') {
                group.classList.remove('active');
            }
        }
    }

    // Inicializar listeners para todos los inputs dentro de .input-group
    inputGroups.forEach(group => {
        const input = group.querySelector('input');
        
        if (input) {
            // Si el input ya tiene contenido (e.g., por auto-relleno), lo marcamos como activo al cargar
            if (input.value.trim() !== '') {
                group.classList.add('active');
            }
            
            input.addEventListener('focus', handleFocus);
            input.addEventListener('blur', handleBlur);
        }
    });
});