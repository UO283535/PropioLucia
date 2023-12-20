class Pais{
    //Atributos nombre del país, nombre de la capital, cantidad de población, 
    //tipo de forma de gobierno, coordenadas de la capital y religión mayoritaria.
    nombre;
    nombreCapital;
    poblacion;
    formaDeGobierno;
    coordenadaCapital;
    religion;
    constructor(nombre, nombreCapital, poblacion){
        this.nombre= nombre;
        this.capital= nombreCapital;
        this.poblacion = poblacion;
       
        this.inicializar();
    }
    obtenerInformacion() {
        return `${this.nombre} - Capital: ${this.capital}, Población: ${this.poblacion}, 
        Forma de Gobierno: ${this.formaDeGobierno}, Coordenadas Capital: ${this.coordenadaCapital}, Religion: ${this.religion}`;
      }

    obtenerNombre(){
        return `Pais: ${this.nombre}` ;
    }

    obtenerCapital(){
        return `Capital: ${this.capital}` ;
    }

    obtenerInformacionPais(){
        var lista = "<ul>";
        lista += "<li>"+ this.poblacion +"</li>";
        lista += "<li>"+ this.formaDeGobierno +"</li>";
        lista += "<li>"+ this.religion +"</li>";
        lista+="</ul>";
        return lista;
        
    }

    obtenerCoordenadas(){
        var parrafo = "<p> Coordenadas Capital: "+ this.coordenadaCapital+"</p>";
        return parrafo;
    }
    mostrarTemperaturas(){
        var apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=37.5665&lon=126.9780&appid=8b8f032deac9ae56d516e74722ed3a24';
        var section = document.querySelector('section');
        // Realiza la consulta AJAX a la API de Flickr
        $.ajax({
          url: apiUrl,
          method: 'GET',
          dataType: 'json',
          success: function(data) {
            // Verifica si se obtuvieron resultados
            var tamaño = data.list.length;
           // const img1 = `https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}.png`;
            if (tamaño> 0) {
              
             $('section').append("<p> Dia 1  temperatura minima :" +data.list[0].main.temp_min + " Temperatura maxima: "+ data.list[0].main.temp_max+ " Porcentaje humedad : "+ data.list[0].main.humidity+ "</p>"+
              "<img src = "+`https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}.png`+" alt ='Imagen tiempo Corea del Sur' />"+
              "<p> Dia 2  temperatura minima :" +data.list[1].main.temp_min + " Temperatura maxima: "+ data.list[1].main.temp_max+ " Porcentaje humedad : "+ data.list[1].main.humidity+"</p>"+
              "<img src = "+`https://openweathermap.org/img/wn/${data.list[1].weather[0].icon}.png`+" alt ='Imagen tiempo Corea del Sur' />" +
              "<p> Dia 3  temperatura minima :" +data.list[2].main.temp_min + " Temperatura maxima: "+ data.list[2].main.temp_max + " Porcentaje humedad : "+ data.list[2].main.humidity+"</p>" +
              "<img src = "+`https://openweathermap.org/img/wn/${data.list[2].weather[0].icon}.png`+" alt ='Imagen tiempo Corea del Sur' />" +
              "<p> Dia 4  temperatura minima :" +data.list[3].main.temp_min + " Temperatura maxima: "+ data.list[3].main.temp_max+ " Porcentaje humedad : "+ data.list[3].main.humidity+"</p>" +
              "<img src = "+`https://openweathermap.org/img/wn/${data.list[3].weather[0].icon}.png`+" alt ='Imagen tiempo Corea del Sur' />" +
              "<p> Dia 5  temperatura minima :" +data.list[4].main.temp_min + " Temperatura maxima: "+ data.list[4].main.temp_max+ " Porcentaje humedad : "+ data.list[4].main.humidity+ "</p>"+
              "<img src = "+`https://openweathermap.org/img/wn/${data.list[4].weather[0].icon}.png`+" alt ='Imagen tiempo Corea del Sur' />" );
             
            } 
          },
          error: function(error) {
            console.error('Error al realizar la consulta a la API de openWeather:', error);
          }
        });
    }
    inicializar(){
    this.formaDeGobierno="Republica";
    this.coordenadaCapital="37.5665° N 126.9780° E ";
    this.religion="Budismo";
    this.apikey = '8b8f032deac9ae56d516e74722ed3a24';
    this.api='api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}';
    }
}
