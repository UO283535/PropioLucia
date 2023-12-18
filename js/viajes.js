class Viajes {
    constructor (){
        navigator.geolocation.getCurrentPosition(this.getPosicion.bind(this), this.checkData.bind(this));
    }
    getPosicion(posicion){
        this.mensaje = "Se ha realizado correctamente la peticiÃ³n de geolocalizaciÃ³n";
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
var miPosicion = new Viajes();

function initMap(){
    miPosicion.initMap();
}