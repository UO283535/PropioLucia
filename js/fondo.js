class Fondo{
    constructor(nombrePais, nombreCapital , coordenadasPais){
        this.nombrePais= nombrePais;
        this.nombreCapital = nombreCapital;
        this.coordenadasPais= coordenadasPais;
        this.apiKey='f4ca93c055f7dfc08a717987cbc129a9';
    }

    
   
    consultarImagenFlickr() {
        var apiUrl = 'https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=f4ca93c055f7dfc08a717987cbc129a9&tags=corea+del+sur&extras=url_l&format=json&nojsoncallback=1';
      
        // Realiza la consulta AJAX a la API de Flickr
        $.ajax({
          url: apiUrl,
          method: 'GET',
          dataType: 'json',
          success: function(data) {
            // Verifica si se obtuvieron resultados
            var tamaño = data.photos.photo.length;
            if (tamaño> 0) {
              // Obtiene la información de la primera foto
              var indice = Math.floor(Math.random()*tamaño);
              var imageUrl = data.photos.photo[indice].url_l;
      
              // Muestra la imagen en el contenedor especificado
              $('body').css('background-image', 'url(' + imageUrl + ')').css("background-size",'cover');
              
            } else {
              $(section).html('<p>No se encontraron imágenes para ' +this.nombrePais + '</p>');
            }
          },
          error: function(error) {
            console.error('Error al realizar la consulta a la API de Flickr:', error);
          }
        });

      }
}

const fondo = new Fondo('Corea del Sur', 'Seúl','35.907757, 127.766922');
fondo.consultarImagenFlickr();