<?php
include("libre.php");

// Query para obtener todos los libros
$sql = "SELECT * from libros";

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