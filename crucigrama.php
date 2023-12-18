<?php
class Record {

    function __construct() {
      $this -> server = "localhost";
      $this -> user = "DBUSER2023";
      $this -> pass = "DBPSWD2023";
      $this -> dbname = "records";
      $this -> conexion= new mysqli($this-> server, $this -> user, $this -> pass, $this -> dbname);

      if($this -> conexion -> connect_error){
        //Si connect_error es true es que hubo un error pero no me dice mas informacion mas alla de ahi
        die('error en la conexion');//Finaliza el proceso si hay un error
        echo $this -> conexion -> connect_error;
      }
    }

    function insertar($nombre, $apellido, $nivel, $tiempo){
     $sentencia = $this -> conexion -> prepare('INSERT INTO REGISTRO (nombre, apellido, nivel, tiempo) VALUES (?,?,?,?)');
     if($sentencia == false){
      die("Error en la insercion ". $this -> conexion -> error);
      //Error en la consulta
     }
     //Pasamos parametros a la sentencia 
     $sentencia-> bind_param('ssii',$nombre, $apellido, $nivel, $tiempo);//Recibe primero una cadena con el formato de los parametros con tatnos caracteres con parametros de la consulta 
     //Los parametros pueden ser una i -> variable de tipo entero una d -> variable de tipo double, s -> variable de tipo string  y una b -> de tipo blob
     //Ahora vamos a ejecutar la consulta

     $consulta= $sentencia -> execute();
     if($consulta == false){
      die("error en la consulta ". $sentencia -> error);
     }

    }
}

//isset nos dice si una variable o una posicion del array esta definida
if(isset($_POST['nombre'])){
  $record = new Record();

// Resto del contenido del archivo crucigrama.php
  $nombre = $_POST['nombre'];
  $apellido = $_POST['apellido'];
  $nivel = $_POST['nivel'];
  $tiempo = $_POST['tiempo'];
  $record -> insertar($nombre, $apellido, $nivel, $tiempo);
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" type="text/css" href="estilo/estilo.css">
  <link rel="stylesheet" type="text/css" href="estilo/crucigrama.css">
  <link rel = "stylesheet" type="text/css" href="estilo/layout.css" />
  <link rel="icon" href="multimedia/imagenes/ImagenFavicon.jpg" />
  <title>Crucigrama Game</title>
</head>
<body>
  <header>
  <h1>Escritorio virtual</h1>
  <!-- Datos con el contenidos que aparece en el navegador -->
  <nav>
        <a title ="INICIO" accesskey ="A" href = "index.html" tabindex ="1">Inicio</a>
        <a title = "SOBRE MI" accesskey ="S" href = "sobremi.html" tabindex ="2">Sobre mi</a>
        <a title = "NOTICIAS" accesskey ="N" href = "noticias.html" tabindex = "3">Noticias</a>
        <a title = "AGENDA" accesskey ="G" href = "agenda.html" tabindex = "4">Agenda</a>
        <a title = "METEOROLOGIA" accesskey ="M" href = "meteorologia.html" tabindex ="5">Meteorologia</a>
        <a title = "VIAJES" accesskey ="V" href = "viajes.php" tabindex ="6">Viajes</a>
        <a title = "JUEGOS" accesskey ="J" href = "juegos.html" tabindex = "7">Juegos</a>
    </nav>
</header>
    <h2> Juego de Crucigrama</h2>
  <main>
  
  </main>
  
  <section>
    <h3>Cuestionario registro</h3>
  </section>
  <script src="js/crucigrama.js"></script>
</body>
</html>