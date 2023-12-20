<?php
// Configura la conexión a tu base de datos
$servername = "localhost";
$username = "DBUSER2023";
$password = "DBPSWD2023";
$dbname = "libre";

$conn = new mysqli($servername, $username, $password, $dbname);

// Verifica la conexión
if ($conn->connect_error) {
    die("La conexión a la base de datos falló: " . $conn->connect_error);
}



class Empleados{
    private $conn;

    // Constructor que recibe la conexión a la base de datos
    public function __construct($conn) {
        $this->conn = $conn;
        $this -> inicializar();
    }

    // Función para ejecutar una consulta y manejar errores
    private function run_query($conn, $sql, $message) {
    if ($conn->query($sql) === TRUE) {
        //echo "$message exitoso.<br>";
    } else {
        echo "Error en $message: " . $conn->error . "<br>";
    }
  }

  public function subirCSV($csv_file) {
    // Abre el archivo CSV
    $file_handle = fopen($csv_file, 'r');

    // Verifica si el archivo se abrió correctamente
    if ($file_handle === false) {
        echo "Error al abrir el archivo CSV.<br>";
        return;
    }

    // Lee el archivo CSV línea por línea
    while (($row = fgetcsv($file_handle)) !== false) {
        // Realiza las operaciones de inserción en la base de datos
        $empleado_id = $row[0];
        $nombre = $row[1];

        $sql = "INSERT INTO empleados (empleado_id, nombre) VALUES ('$empleado_id', '$nombre')";
        $this->run_query($this->conn,$sql, "Insertar datos desde CSV");

        // Puedes agregar más operaciones de inserción aquí para otras tablas si es necesario
    }

    // Cierra el archivo CSV
    fclose($file_handle);
}

public function mostrarInformacion() {
    $this -> inicializar();
    // Realiza una consulta para obtener la información necesaria
    $sql = "SELECT e.nombre AS empleado, t.rol, p.nombre_proyecto
            FROM empleados e
            INNER JOIN roles ro ON e.empleado_id = ro.empleado_id
            INNER JOIN trabajo t ON ro.trabajo_code = t.trabajo_code
            INNER JOIN asignaciones_proyectos a ON e.empleado_id = a.empleado_id
            INNER JOIN proyectos p ON a.proyecto_id = p.proyecto_id";

    $result = $this->conn->query($sql);
    $html = ''; // Inicializa la cadena HTML

    if ($result->num_rows > 0) {
        // Imprime la tabla HTML
        echo '<table border="1">';
        echo '<tr><th>Empleado</th><th>Rol</th><th>Proyecto Asignado</th></tr>';

        while ($row = $result->fetch_assoc()) {
            echo '<tr>';
            echo '<td>' . $row['empleado'] . '</td>';
            echo '<td>' . $row['rol'] . '</td>';
            echo '<td>' . $row['nombre_proyecto'] . '</td>';
            echo '</tr>';
        }

        echo '</table>';
    } else {
        echo "No se encontraron datos.";
    }
}
   public function inicializar(){

     // Eliminar todas las filas de las tablas
     $this->run_query($this->conn, "DELETE FROM asignaciones_proyectos", "Eliminar todas las filas de la tabla asignaciones_proyectos");
     $this->run_query($this->conn, "DELETE FROM proyectos", "Eliminar todas las filas de la tabla proyectos");
     $this->run_query($this->conn, "DELETE FROM roles", "Eliminar todas las filas de la tabla roles");
     $this->run_query($this->conn, "DELETE FROM trabajo", "Eliminar todas las filas de la tabla trabajo");
     $this->run_query($this->conn, "DELETE FROM empleados", "Eliminar todas las filas de la tabla empleados");
     
 
    $sql = "INSERT INTO empleados (empleado_id, nombre) VALUES 
        (1, 'Empleado 1'),
        (2, 'Empleado 2'),
        (3, 'Empleado 3')";
$this->run_query($this->conn, $sql, "INSERT en la tabla empleados");

// Inserta datos en la tabla roles


// Inserta datos en la tabla trabajo
$sql = "INSERT INTO trabajo (trabajo_code, rol) VALUES 
        (101, 'Rol 1'),
        (102, 'Rol 2'),
        (103, 'Rol 3')";
$this->run_query($this->conn, $sql, "INSERT en la tabla trabajo");
$sql = "INSERT INTO roles (empleado_id, trabajo_code) VALUES 
        (1, 101),
        (2, 102),
        (3, 103)";
$this->run_query($this->conn, $sql, "INSERT en la tabla roles");
// Inserta datos en la tabla pais
$sql = "INSERT INTO proyectos (proyecto_id, nombre_proyecto, descripcion_proyecto) VALUES 
        (1, 'P1','proyectofuncional'),
        (2, 'P2', 'proyectoOO'),
        (3, 'P3', 'proyectoestructurado')";
$this->run_query($this->conn, $sql, "INSERT en la tabla proyectos");

$sql = "INSERT INTO asignaciones_proyectos (asignacion_id, empleado_id, proyecto_id) VALUES 
        (1, 1,1),
        (2, 2, 2),
        (3, 3, 3)";
$this->run_query($this->conn, $sql, "INSERT en la tabla proyectos");
}

}

if (isset($_POST['init_btn'])) {
    // Crea una instancia de la clase Empleados
    $empleados = new Empleados($conn);

    // Llama al método inicializar
    $empleados->inicializar();
}

if (isset($_POST['import_csv_btn'])) {
    // Verifica si se cargó correctamente el archivo
    if (isset($_FILES['csv_file']) && $_FILES['csv_file']['error'] == UPLOAD_ERR_OK) {
        // Ruta temporal del archivo cargado
        $tmp_file = $_FILES['csv_file']['tmp_name'];

        // Crea una instancia de la clase Empleados
        $empleados = new Empleados($conn);

        // Llama al método subirCSV y pasa la ruta temporal del archivo
        $empleados->subirCSV($tmp_file);
    } else {
        echo "Error al cargar el archivo CSV.<br>";
    }
}

if (isset($_POST['export_csv_btn'])) {
    // Llama a la función exportarCSV y pasa la variable $conn
    exportarCSV($conn);
    exit;
}

// ... (Más código si es necesario)

function exportarCSV($conn) {
    // Configura el nombre del archivo CSV de salida
    $output_file = 'exportacion_datos.csv';

    // Configura el tipo de contenido para la respuesta HTTP
    header('Content-Type: text/csv');
    header('Content-Disposition: attachment; filename="' . $output_file . '"');

    // Abre la salida del archivo
    $output = fopen('php://output', 'w');

    // Agrega una línea con los encabezados CSV
    fputcsv($output, array('empleado_id', 'nombre'));

    // Realiza una consulta para obtener los datos de la base de datos
    $result = $conn->query('SELECT empleado_id, nombre FROM empleados');

    // Recorre los resultados y agrega cada fila al archivo CSV
    while ($row = $result->fetch_assoc()) {
        fputcsv($output, $row);
    }

    fputcsv($output, array('empleado_id', 'trabajo_code'));

    // Realiza una consulta para obtener los datos de la base de datos
    $result = $conn->query('SELECT empleado_id, trabajo_code FROM roles');

    // Recorre los resultados y agrega cada fila al archivo CSV
    while ($row = $result->fetch_assoc()) {
        fputcsv($output, $row);
    }

    fputcsv($output, array('trabajo_code', 'rol'));

    // Realiza una consulta para obtener los datos de la base de datos
    $result = $conn->query('SELECT trabajo_code, rol FROM trabajo');

    // Recorre los resultados y agrega cada fila al archivo CSV
    while ($row = $result->fetch_assoc()) {
        fputcsv($output, $row);
    }

    fputcsv($output, array('proyecto_id', 'nombre_proyecto', 'descripcion_proyecto'));

    // Realiza una consulta para obtener los datos de la base de datos
    $result = $conn->query('SELECT proyecto_id, nombre_proyecto, descripcion_proyecto FROM proyectos');

    // Recorre los resultados y agrega cada fila al archivo CSV
    while ($row = $result->fetch_assoc()) {
        fputcsv($output, $row);
    }

    fputcsv($output, array('asignacion_id', 'empleado_id', 'proyecto_id'));

    // Realiza una consulta para obtener los datos de la base de datos
    $result = $conn->query('SELECT asignacion_id, empleado_id, proyecto_id FROM asignaciones_proyectos');

    // Recorre los resultados y agrega cada fila al archivo CSV
    while ($row = $result->fetch_assoc()) {
        fputcsv($output, $row);
    }
    // Cierra la salida del archivo
    fclose($output);
}

if (isset($_POST['action']) && $_POST['action'] == 'mostrarInformacion') {
    // Crea una instancia de la clase Empleados
    $empleados = new Empleados($conn);

    // Llama al método mostrarInformacion
    ob_start(); // Captura la salida HTML en lugar de mostrarla directamente
    $empleados->mostrarInformacion();
    $html = ob_get_clean(); // Obtiene la salida capturada

    // Devuelve la tabla HTML como respuesta a la solicitud AJAX
    echo $html;
    exit;
}
$empleados = new Empleados($conn);

    // Llama al método mostrarInformacion
   
    $empleados->mostrarInformacion();

// Cierra la conexión a la base de datos
$conn->close();
?>
<head>
    <!-- Datos que describen el documento 
Este ejercicio consiste en una aplciacion para los trabajadores de administracion donde podran subir datos nuevos de trabajadores, su rol, proyectos existentes y asignados
y descargar el contenido de la base de datos en un csv asi como actualizarla con unos datos por defecto establecidos -->
    <meta charset="UTF-8" />
    <title>INICIO</title>
    <meta name = "author" content = "LUCIA VILLANUEVA RODRIGUEZ" />
    <meta name = "description" content = " En este documento se desarrollo un ejercicio de tematica libre" />
    <meta name = "keywords" content ="csv, subir, exportar, inicializar" />
    <meta name = "viewport" content ="width=device-width, initial-scale=1.0" />
    <link rel="icon" href="multimedia/imagenes/ImagenFavicon.jpg" />
    <link rel = "stylesheet" type="text/css" href="estilo/estilo.css" />
    <link rel = "stylesheet" type="text/css" href="estilo/layout.css" />
    <link rel="stylesheet" href="estilo/libre.css">
    <script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>
    <script src ='js/libre.js'></script>

</head>
<body>
<h1>Inicialización de Datos</h1>
    <form action="" method="post" enctype="multipart/form-data" >
        <input type="submit" value="Inicializar" name="init_btn">
        <input type="file" name="csv_file" accept=".csv">
        <input type="submit" value="Importar CSV" name="import_csv_btn">
        <input type="submit" value="Exportar CSV" name="export_csv_btn">
        <input type="button" value="Mostrar Información" onclick = empleado.mostrarInformacion()">
        </form>
        
   
    <article>
</article>
</body>
</html>

