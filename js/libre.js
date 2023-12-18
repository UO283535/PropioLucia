// JavaScript principal para manejar la lógica de la aplicación

// Función para cargar todos los libros
function loadBooks() {
    // Crear instancia de objeto XMLHttpRequest
    var xhr = new XMLHttpRequest();

    // Configurar la solicitud GET a get_books.php
    xhr.open('GET', 'getBook.php', true);

    // Configurar la función de callback cuando la solicitud esté lista
    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
            // La solicitud fue exitosa
            var data = JSON.parse(xhr.responseText);
            displayBooks(data);
        } else {
            // La solicitud no fue exitosa
            console.error('Error al obtener libros:', xhr.statusText);
        }
    };

    // Configurar la función de callback para manejar errores de red
    xhr.onerror = function () {
        console.error('Error de red al intentar obtener libros.');
    };

    // Enviar la solicitud
    xhr.send();
}

// main.js

// Función para mostrar los libros en la página
function displayBooks(books) {
    // Obtener el elemento en el que se mostrarán los libros
    var mainContent = document.getElementById('main-content');

    // Limpiar cualquier contenido existente
    mainContent.innerHTML = '';

    // Crear un contenedor para los libros
    var booksContainer = document.createElement('div');
    booksContainer.className = 'books-container';

    // Iterar sobre cada libro y crear elementos HTML para mostrar la información
    books.forEach(function(book) {
        var bookElement = document.createElement('div');
        bookElement.className = 'book';

        // Crear elementos HTML para mostrar la información del libro
        var titleElement = document.createElement('h2');
        titleElement.textContent = book.titulo;

        var authorElement = document.createElement('p');
        authorElement.textContent = 'Autor: ' + book.nombre_autor;

        var categoryElement = document.createElement('p');
        categoryElement.textContent = 'Categoría: ' + book.nombre_categoria;

        // Agregar los elementos al contenedor del libro
        bookElement.appendChild(titleElement);
        bookElement.appendChild(authorElement);
        bookElement.appendChild(categoryElement);

        // Agregar el libro al contenedor principal de libros
        booksContainer.appendChild(bookElement);
    });

    // Agregar el contenedor de libros al contenido principal de la página
    mainContent.appendChild(booksContainer);
}

// Evento de carga de la página
document.addEventListener("DOMContentLoaded", function () {
    // Llamar a la función para cargar y mostrar los libros
    loadBooks();
});


// Función para cargar las categorías
function loadCategories() {
    // Implementar la lógica aquí usando AJAX o Fetch API
}

// Función para cargar los autores
function loadAuthors() {
    // Implementar la lógica aquí usando AJAX o Fetch API
}

