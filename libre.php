<?php
// Configuración de la base de datos (reemplaza con tus propios valores)
$servername = "localhost";
$username = "DBUSER2023";
$password = "DBPSWD2023";
$dbname = "libre";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar la conexión
if ($conn->connect_error) {
    die("Error de conexión a la base de datos: " . $conn->connect_error);
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Librería Online</title>
    <link rel="stylesheet" href="estilo/libre.css">
</head>
<body>
    <header>
        <h1>Librería Online</h1>
        <nav>
            <ul>
                <li><a href="#" onclick="loadBooks()">Todos los Libros</a></li>
                <li><a href="#" onclick="loadCategories()">Filtrar por Categoría</a></li>
                <li><a href="#" onclick="loadAuthors()">Filtrar por Autor</a></li>
            </ul>
        </nav>
    </header>
    <main id="main-content">
        <!-- Contenido principal aquí -->
    </main>
    <footer>
        <p>&copy; 2023 Librería Online</p>
    </footer>
    <script src="js/libre.js"></script>
</body>
</html>

