document.addEventListener('DOMContentLoaded', function() {
    const pagesContainer = document.getElementById('pages');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const pageElements = document.querySelectorAll('.page');
    
    let currentPage = 0;
    const totalPages = pageElements.length;
    let isAnimating = false;

    // Organizar páginas inicialmente
    function arrangePages() {
        pageElements.forEach((page, index) => {
            page.style.transition = 'transform 1s ease-in-out';
            
            if (index === 0) {
                // Portada
                page.style.transform = 'translateX(0%)';
                page.style.zIndex = totalPages;
            } else if (index === totalPages - 1) {
                // Contraportada
                page.style.transform = 'translateX(100%)';
                page.style.zIndex = 0;
            } else if (index % 2 === 1) {
                // Páginas izquierdas (impares)
                page.style.transform = 'translateX(0%)';
                page.style.zIndex = totalPages - index;
            } else {
                // Páginas derechas (pares)
                page.style.transform = 'translateX(100%)';
                page.style.zIndex = totalPages - index;
            }
        });
    }

    // Voltear página con mejor manejo de z-index
    function flipPage(direction) {
        if (isAnimating) return;
        isAnimating = true;
        
        if (direction === 'next' && currentPage < totalPages - 1) {
            const currentPageElem = pageElements[currentPage];
            const nextPageElem = pageElements[currentPage + 1];
            
            // Preparar animación
            currentPageElem.style.zIndex = totalPages;
            nextPageElem.style.zIndex = totalPages + 1;
            
            // Animación
            currentPageElem.style.transform = 'translateX(-100%) rotateY(-180deg)';
            nextPageElem.style.transform = 'translateX(0%)';
            
            // Actualizar después de la animación
            setTimeout(() => {
                currentPageElem.style.zIndex = totalPages - currentPage - 1;
                currentPage++;
                isAnimating = false;
            }, 1000);
            
        } else if (direction === 'prev' && currentPage > 0) {
            const currentPageElem = pageElements[currentPage];
            const prevPageElem = pageElements[currentPage - 1];
            
            // Preparar animación
            currentPageElem.style.zIndex = 1;
            prevPageElem.style.zIndex = totalPages + 1;
            
            // Animación
            currentPageElem.style.transform = 'translateX(100%)';
            prevPageElem.style.transform = 'translateX(0%) rotateY(0deg)';
            
            // Actualizar después de la animación
            setTimeout(() => {
                currentPage--;
                prevPageElem.style.zIndex = totalPages - currentPage;
                isAnimating = false;
            }, 1000);
        } else {
            isAnimating = false;
        }
    }

    // Event listeners mejorados
    nextBtn.addEventListener('click', () => {
        flipPage('next');
    });
    
    prevBtn.addEventListener('click', () => {
        flipPage('prev');
    });
    
    // Soporte para gestos táctiles mejorado
    let startX = 0;
    let isDragging = false;
    
    pagesContainer.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
    }, { passive: true });
    
    pagesContainer.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
    }, { passive: false });
    
    pagesContainer.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        isDragging = false;
        
        const endX = e.changedTouches[0].clientX;
        const diff = startX - endX;
        
        if (diff > 50 && !isAnimating) {
            flipPage('next');
        } else if (diff < -50 && !isAnimating) {
            flipPage('prev');
        }
    }, { passive: true });
    
    // Inicializar
    arrangePages();
});