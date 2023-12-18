<?php
include("libre.php");

// Query para obtener todos los libros
$sql = "SELECT libros.*, autores.nombre AS nombre_autor, categorias.nombre AS nombre_categoria 
        FROM libros 
        JOIN autores ON libros.id_autor = autores.id 
        JOIN categorias ON libros.id_categoria = categorias.id";

$result = $conn->query($sql);

// Verificar si hay resultados
if ($result->num_rows > 0) {
    $books = array();

    // Obtener datos de cada fila
    while ($row = $result->fetch_assoc()) {
        $books[] = $row;
    }

    // Devolver los datos en formato JSON
    echo json_encode($books);
} else {
    // No hay libros encontrados
    echo json_encode(array("message" => "No se encontraron libros."));
}

// Cerrar la conexión
$conn->close();
?>