<?php
class Carrusel {
    public $nombreCapital;
    public $nombrePais;

    function __construct($nombreCapital, $nombrePais) {
        $this->nombreCapital = $nombreCapital;
        $this->nombrePais = $nombrePais;
    }

    function obtenerImagenesPais() {
        // Configuración de la API de Flickr (reemplaza con tu clave)
        $apiKey = 'f4ca93c055f7dfc08a717987cbc129a9';
        $url = "https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key={$apiKey}&text={$this->nombrePais}&per_page=10&format=json&nojsoncallback=1";

        // Realizar la llamada a la API de Flickr
        $response = file_get_contents($url);
        $datos = json_decode($response, true);

        // Obtener las URL de las imágenes
        $imagenes = [];
        foreach ($datos['photos']['photo'] as $foto) {
            $farm = $foto['farm'];
            $server = $foto['server'];
            $id = $foto['id'];
            $secret = $foto['secret'];
            $urlImagen = "https://farm{$farm}.staticflickr.com/{$server}/{$id}_{$secret}.jpg";
            $imagenes[] = $urlImagen;
        }

        // Retornar las URLs de las imágenes
        return $imagenes;
    }
}

$carrusel = new Carrusel("Seul", "CoreaDelSur");
$urlsImagenes = $carrusel->obtenerImagenesPais();
class Moneda
{
    public $siglasOriginal;
    public $siglasCambio;
    public $tasa;

    function __construct($siglasOriginal, $siglasCambio, $monedaBase, $claveApi)
    {
        $this->siglasOriginal = $siglasOriginal;
        $this->siglasCambio = $siglasCambio;
        $this->obtenerYMostrarTasaDeCambio($monedaBase, $claveApi);
    }

    function obtenerYMostrarTasaDeCambio($monedaBase, $claveApi)
    {
        $url = "https://open.er-api.com/v6/latest/{$monedaBase}?apikey={$claveApi}";
        $response = file_get_contents($url);
        $tasas = json_decode($response, true);
        $this->tasa = isset($tasas['rates'][$this->siglasCambio]) ? $tasas['rates'][$this->siglasCambio] : null;
    }

    function obtenerHtmlTasaDeCambio()
    {
        // Construir y devolver la cadena HTML
        $html = "<h3>Tasa de Cambio</h3>";
        $html .= "<p>De {$this->siglasOriginal} a {$this->siglasCambio}</p>";
        $html .= "<p>1 {$this->siglasOriginal} son {$this->tasa} {$this->siglasCambio}</p>";
        return $html;
    }
}

// Datos para la moneda
$siglasOriginal = "EUR";  // Cambiando la moneda original a Euro
$siglasCambio = "KRW";    // Cambiando la moneda de cambio a Won Coreano
$monedaBase = "EUR";
$claveApi = "d1b13c817c22884f39397556"; // Reemplaza con tu clave de ExchangeRate-API

// Crear instancia de la clase Moneda
$moneda = new Moneda($siglasOriginal, $siglasCambio, $monedaBase, $claveApi);

// Obtener la cadena HTML y almacenarla en una variable
$htmlTasaDeCambio = $moneda->obtenerHtmlTasaDeCambio();

?>

<!DOCTYPE HTML>

<html lang="es">
<head>
    <!-- Datos que describen el documento -->
    <meta charset="UTF-8" />
    <title>Escritorio virtual:viajes</title>
    <meta name = "author" content = "LUCIA VILLANUEVA RODRIGUEZ" />
    <meta name = "description" content = "informacion de un viaje a corea del sur" />
    <meta name = "keywords" content ="mapa, estatico, dinamico, kml, xml, svg, pais" />
    <meta name = "viewport" content ="width=device-width, initial-scale=1.0" />
    <link rel = "stylesheet" type="text/css" href="estilo/estilo.css" />
    <link rel = "stylesheet" type="text/css" href="estilo/viajes.css" />
    <link rel = "stylesheet" type="text/css" href="estilo/layout.css" />
    <link rel="icon" href="multimedia/imagenes/ImagenFavicon.jpg" />
    <script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>
    <script src="js/viajes.js"></script>
</head>

<body>
    <header>
        <h1>Escritorio virtual</h1>
          <!-- Datos con el contenidos que aparece en el navegador poner en minusculas todo -->
          <nav>
              <a title ="Inicio de escritorio virtual" accesskey ="A" href = "index.html" tabindex ="1">Inicio</a>
              <a title = "Informacion acerca del autor del escritorio" accesskey ="S" href = "sobremi.html" tabindex ="2">Sobre mi</a>
              <a title = "Noticias" accesskey ="N" href = "noticias.html" tabindex = "3">Noticias</a>
              <a title = "Agenda" accesskey ="G" href = "agenda.html" tabindex = "4">Agenda</a>
              <a title = "Meteorologia" accesskey ="M" href = "meteorologia.html" tabindex ="5">Meteorologia</a>
              <a title = "Viajes" accesskey ="V" href = "viajes.php" tabindex ="6">Viajes</a>
              <a title = "Juegos" accesskey ="J" href = "juegos.html" tabindex = "7">Juegos</a>
          </nav>
        </header>
    
    
    <h2>Ubicación usuario </h2>
    <section>
    <h3>Operaciones</h3>
        <input type = "button" value ="Ver datos coordenadas" onclick ="miPosicion.verTodo()">
        <input type = "button" value ="Ver mapa estatico google" onclick ="miPosicion.getMapaEstaticoGoogle()">
    </section>
    <article>
        <h3>Mapa dinámico</h3>
        <script async="" defer="" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyC6j4mF6blrc4kZ54S6vYZ2_FpMY9VzyRU&amp;callback=initMap"></script>
    </article>
    <section>
        <h3>Subir SVG</h3>
        <input type = "file" onclick ="svg.init()">
        <h3>Subir archivos KML</h3>
        <input type="file" onclick="kml.init()">
        <h3>Subir archivos XML</h3>
        <input type="file" onclick="xml.init()">
    </section>
    <article></article>
    </section>
    <section>
    <h3>Información ubicación</h3>
    </section>
    <section>
    <h3>Información Corea del Sur</h3>
    <?php
        // Imprimir la cadena HTML en la sección deseada
        echo $htmlTasaDeCambio;
        ?>
    </section>
   
    <section id = 'carrousel'>
    <h3> Carrousel de imagenes </h3>
       
       <?php
       foreach ($urlsImagenes as $url) {
           echo "<img src='{$url}' alt='Imagen de país'>";
       }
       ?>
    <button data-action="next">&gt;</button>
    <button data-action="prev"> &lt; </button>
    <script src="js/imagenes.js"></script>
    </section>
   
    
</body>
</html>