document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menu-toggle');
    const menu = document.querySelector('.menu');

    // Cerrar el menú si se hace clic fuera de él
    document.addEventListener('click', function(event) {
        if (!menuToggle.contains(event.target) && !menu.contains(event.target)) {
            menuToggle.checked = false;
        }
    });

    // Cerrar el menú al presionar la tecla Escape
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            menuToggle.checked = false;
        }
    });

    // Mejorar la accesibilidad con teclado
    const menuLinks = menu.querySelectorAll('a');
    menuLinks.forEach(link => {
        link.addEventListener('focus', function() {
            menuToggle.checked = true;
        });
    });
});