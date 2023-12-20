class Viajes {
    constructor (){
        navigator.geolocation.getCurrentPosition(this.getPosicion.bind(this), this.checkData.bind(this));
    }
    getPosicion(posicion){
        this.mensaje = "Se ha realizado correctamente la peticion de geolocalizacion";
        this.longitud         = posicion.coords.longitude; 
        this.latitud          = posicion.coords.latitude;  
        this.precision        = posicion.coords.accuracy;
        this.altitud          = posicion.coords.altitude;
        this.precisionAltitud = posicion.coords.altitudeAccuracy;
        this.rumbo            = posicion.coords.heading;
        this.velocidad        = posicion.coords.speed;       
    }
    checkData(error){
        switch(error.code) {
        case error.PERMISSION_DENIED:
            this.mensaje = "El usuario no permite la peticiÃ³n de geolocalizaciÃ³n"
            break;
        case error.POSITION_UNAVAILABLE:
            this.mensaje = "InformaciÃ³n de geolocalizaciÃ³n no disponible"
            break;
        case error.TIMEOUT:
            this.mensaje = "La peticiÃ³n de geolocalizaciÃ³n ha caducado"
            break;
        case error.UNKNOWN_ERROR:
            this.mensaje = "Se ha producido un error desconocido"
            break;
        }
    }
    getLongitud(){
        return this.longitud;
    }
    getLatitud(){
        return this.latitud;
    }
    getAltitud(){
        return this.altitud;
    }
    verTodo(){
        var ubicacion=document.querySelector('section');
        var datos=''; 
        datos+='<p>Longitud: '+this.longitud +' grados</p>'; 
        datos+='<p>Latitud: '+this.latitud +' grados</p>';
        datos+='<p>Precision de la latitud y longitud: '+ this.precision +' metros</p>';
        datos+='<p>Altitud: '+ this.altitude +' metros</p>';
        datos+='<p>Precision de la altitud: '+ this.precisionAltitud +' metros</p>'; 
        datos+='<p>Rumbo: '+ this.rumbo +' grados</p>'; 
        datos+='<p>Velocidad: '+ this.velocidad +' metros/segundo</p>';
        ubicacion.innerHTML = datos;
    }

    getMapaEstaticoGoogle(){
        var ubicacion=document.querySelector('section');
        
        var apiKey = "&key=AIzaSyC6j4mF6blrc4kZ54S6vYZ2_FpMY9VzyRU";
        //URL: obligatoriamente https
        var url = "https://maps.googleapis.com/maps/api/staticmap?";
        //ParÃ¡metros
        // centro del mapa (obligatorio si no hay marcadores)
        var centro = "center=" + this.latitud + "," + this.longitud;
        //zoom (obligatorio si no hay marcadores)
        //zoom: 1 (el mundo), 5 (continentes), 10 (ciudad), 15 (calles), 20 (edificios)
        var zoom ="&zoom=15";
        //TamaÃ±o del mapa en pixeles (obligatorio)
        var tamano= "&size=800x600";
        //Escala (opcional)
        //Formato (opcional): PNG,JPEG,GIF
        //Tipo de mapa (opcional)
        //Idioma (opcional)
        //region (opcional)
        //marcadores (opcional)
        var marcador = "&markers=color:red%7Clabel:S%7C" + this.latitud + "," + this.longitud;
        //rutas. path (opcional)
        //visible (optional)
        //style (opcional)
        var sensor = "&sensor=false"; 
        
        this.imagenMapa = url + centro + zoom + tamano + marcador + sensor + apiKey;
        ubicacion.innerHTML= "<img src='"+this.imagenMapa+"' alt='mapa estatico google' />";
    }

    initMap(){  
        var centro = {lat: 43.3672702, lng: -5.8502461};
        var mapaGeoposicionado = new google.maps.Map(document.querySelector('article'),{
            zoom: 8,
            center:centro,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });
        
        var infoWindow = new google.maps.InfoWindow;
        if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(function(position) {
                var pos = {
                  lat: position.coords.latitude,
                  lng: position.coords.longitude
                };
    
                infoWindow.setPosition(pos);
                infoWindow.setContent('Localizacion encontrada');
                infoWindow.open(mapaGeoposicionado);
                mapaGeoposicionado.setCenter(pos);
              }, function() {
                document.write("<p> Ha ocurrido un error inesperado </p>")
              });
            } else {
              // Browser doesn't support Geolocation
             
            }
          }
}

class SVGUploader {
    constructor() {
        this.init();
    }

    init() {
        // Manejar el cambio en el input de tipo file
        $("input[value ='Subir SVG'").change((e) => this.subirficheroSVG(e.target.files));
    }

    subirficheroSVG(ficheros) {
        $('section>article').empty();
        for (let i = 0; i < ficheros.length; i++) {
            const fichero = ficheros[i];
            const reader = new FileReader();
            reader.onload = (e) => {
                $('section>article').append('<p>Contenido del archivo SVG:  ' + fichero.name + ':</p><pre>' + e.target.result + '</pre>');
            };
            reader.readAsText(fichero);
        }
    }
}

class KMLUploader{
    constructor() {
        this.init();
    }

    init() {
        // Manejar el cambio en el input de tipo file
        $("input[value ='Subir KML'").change((e) => this.subirficheroKML(e.target.files));
    }

    subirficheroKML(event){
        const files = event.target.files;

    // Iterar sobre los archivos seleccionados
    for (let i = 0; i < files.length; i++) {
        const file = files[i];

        // Verificar si es un archivo KML
        if (file.type === 'application/vnd.google-earth.kml+xml') {
            // Leer el contenido del archivo
            const reader = new FileReader();
            reader.onload = function(e) {
                const kmlContent = e.target.result;

                // Procesar la información KML y representarla en el mapa
                processKML(kmlContent);
            };
            reader.readAsText(file);
        } else {
            alert('Por favor, seleccione archivos KML.');
        }
    }
}
processKML(kmlContent) {
    // Implementa la lógica para procesar el contenido KML y representarlo en el mapa.
    // Puedes utilizar la API de Google Maps para agregar marcadores, polígonos, etc.
    // Ejemplo: crea un mapa y muestra un marcador en una ubicación específica
    const map = new google.maps.Map(document.querySelector(article), {
        center: { lat: 0, lng: 0 },
        zoom: 2
    });

    const marker = new google.maps.Marker({
        position: { lat: 0, lng: 0 },
        map: map,
        title: 'Marcador desde archivo KML'
    });
}
}

class XMLUploader{
    constructor() {
        this.init();
    }

    init() {
        // Manejar el cambio en el input de tipo file
        $("input[value ='Subir XML'").change((e) => this.subirficheroXML(e.target.files));
    }

    subirficheroXML(event){
            const fileInput = event.target.files;
            const resultadoDiv = document.getElementById('resultado');
        
            const file = fileInput[0];
        
            if (file) {
                const reader = new FileReader();
        
                reader.onload = function (e) {
                    const xmlString = e.target.result;
        
                    // Procesar el XML como antes
                    const xmlDoc = new DOMParser().parseFromString(xmlString, 'text/xml');
        
                    // (Aquí puedes llamar a tu función de procesamiento XML)
                    mostrarResultadoEnDiv(xmlDoc);
                };
        
                reader.readAsText(file);
            } else {
                resultadoDiv.innerText = 'Selecciona un archivo XML.';
            }
        }
        
        mostrarResultadoEnDiv(xmlDoc) {
            // (Aquí puedes colocar el código para procesar y mostrar el resultado según tus necesidades)
        
            // Ejemplo: Mostrar el XML como texto en el div de resultados
            const resultadoDiv = $('section>article').append( new XMLSerializer().serializeToString(xmlDoc));
        }
    

}
var miPosicion = new Viajes();

function initMap(){
    miPosicion.initMap();
}
var svg = new SVGUploader();
var kml = new KMLUploader();
var xml = new XMLUploader();