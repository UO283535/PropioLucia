class Agenda {
    constructor() {
        this.url = 'https://ergast.com/api/f1/current';
        this.lastApiCall = null;
        this.lastApiResult = null;
    }

    consultarCarreras() {
        var now = new Date().getTime();
        var tiempoTranscurrido = now - (this.lastApiCall || 0);
        var intervaloMinutos = 5;

        if (tiempoTranscurrido < intervaloMinutos * 60 * 1000 && this.lastApiResult) {
            this.mostrarCarreras(this.lastApiResult);
        } else {
            $.ajax({
                dataType:"xml",
                url:this.url,
                method:'GET',
                success: function(datos){
                    //("h5").text((new XMLSerializer()).serializeToString(datos));
                   var totalCarreras = $('Race', datos).length;
                   var carreras = $('Race', datos).text();
                   var stringdatos ="";
                   
                   $(datos).find('Race').each(function(){
                    var name = $(this).find('RaceName').text();
                    var circuitName = $(this).find('CircuitName').text();
                    var lat = $(this).find('Location').attr('lat');
                    var long = $(this).find('Location').attr('long');
                    var dia = $(this).find('Date').first().text();
                    var hora = $(this).find('Time').first().text();
                    stringdatos += "<li>"+ name+"<ul>"+ circuitName+"</ul>"+ "<ul>"+ lat+" , "+ long+"</ul>"+ "<ul>"+dia+"</ul>"+"<ul>"+hora+"</ul></li>";
                   })
                  
                   $("p").append(stringdatos);  
                },
                error:function(){
                    $("h3").html("¡Tenemos problemas! No puedo obtener XML de <a href='http://openweathermap.org'>OpenWeatherMap</a>"); 
                    $("h4").remove();
                    $("h5").remove();
                    $("p").remove();
                    }
        
            });
        }
    }
    mostrarCarreras(data) {
        var carrerasContainer =document.querySelector('section');
        carrerasContainer.empty();

        data.MRData.RaceTable.Races.forEach(function(carrera) {
            var infoCarrera = "<section>";
            infoCarrera += "<h3>" + carrera.raceName + "</h3>";
            infoCarrera += "<p>Circuito: " + carrera.Circuit.circuitName + "</p>";
            infoCarrera += "<p>Coordenadas: " + carrera.Circuit.Location.lat + ", " + carrera.Circuit.Location.long + "</p>";
            infoCarrera += "<p>Fecha y Hora: " + carrera.date + " " + carrera.time + "</p>";
            infoCarrera += "</section>";

            carrerasContainer.append(infoCarrera);
        });
    }
}

// Crear una instancia de la clase Agenda y llamar a la función consultarCarreras al cargar la página
const agenda = new Agenda();
agenda.consultarCarreras();
