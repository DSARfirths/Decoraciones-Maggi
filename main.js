// main.js

/**
 * --- Fase 1: Carga de Componentes Reutilizables ---
 * Este código se ejecuta cuando el contenido principal de la página (DOM) está listo.
 */
document.addEventListener('DOMContentLoaded', function () {

    // --- 1. CARGADOR DE HEADER Y FOOTER ---
    
    /**
     * Función genérica para cargar un componente HTML en un elemento de la página.
     * @param {string} url - La ruta al archivo HTML del componente (ej. 'header.html').
     * @param {string} elementId - El ID del contenedor donde se insertará el HTML.
     * @returns {Promise} - Una promesa que se resuelve cuando el componente se ha cargado.
     */
    const loadComponent = (url, elementId) => {
        return fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`No se pudo cargar el componente: ${url}`);
                }
                return response.text();
            })
            .then(data => {
                const element = document.getElementById(elementId);
                if (element) {
                    element.innerHTML = data;
                } else {
                    console.error(`El elemento con ID '${elementId}' no fue encontrado.`);
                }
            })
            .catch(error => console.error(error));
    };

    // --- 2. INICIALIZACIÓN DE FUNCIONALIDADES ---

    /**
     * Inicializa la funcionalidad del menú móvil (hamburguesa).
     * Esta función DEBE llamarse DESPUÉS de que el header se haya cargado.
     */
    const initializeMobileMenu = () => {
        const menuToggle = document.getElementById('menu-toggle');
        const mainMenu = document.getElementById('main-menu');

        if (menuToggle && mainMenu) {
            menuToggle.addEventListener('click', () => {
                // Alterna la clase 'is-active' para mostrar/ocultar el menú con CSS
                mainMenu.classList.toggle('is-active');
                menuToggle.classList.toggle('is-active');
            });
        }
    };
    
    /**
     * Actualiza el año del copyright en el footer al año actual.
     */
    const updateCopyrightYear = () => {
        const yearSpan = document.getElementById('copyright-year');
        if(yearSpan) {
            // El año actual es 2025
            yearSpan.textContent = new Date().getFullYear(); 
        }
    }


    // --- 3. EJECUCIÓN ---
    // Cargamos el header y, UNA VEZ CARGADO, inicializamos el menú móvil.
    loadComponent('header.html', 'main-header-placeholder').then(() => {
        initializeMobileMenu();
    });

    // Cargamos el footer y, UNA VEZ CARGADO, actualizamos el año del copyright.
    loadComponent('footer.html', 'main-footer-placeholder').then(() => {
        updateCopyrightYear();
    });

});