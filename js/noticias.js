//Canvas con fullscreen no puede ser 
// Hay apis que no merecen la pena webrtc web.. muy dificiles no es necesario eso
//
class Noticias{
    constructor(){
        
    // Version 1.1 23/10/2021 
    if (window.File && window.FileReader && window.FileList && window.Blob) 
    {  
        //El navegador soporta el API File
        document.write("<p>Este navegador soporta el API File </p>");
    }
        else document.write("<p>¡¡¡ Este navegador NO soporta el API File y este programa puede no funcionar correctamente !!!</p>");
  
    }
 
 
  
  readInputFile(files) 
  { 
      //Solamente toma un archivo
      //var archivo = document.getElementById("archivoTexto").files[0];
      var archivo = files[0];
      var nombre = archivo.name;
    
      var ultima = archivo.lastModifiedDate;
     // var contenido = document.getElementById("contenidoArchivo");
     var areaVisualizacion = document.querySelector("section");
     // var errorArchivo = document.getElementById("errorLectura");
     areaVisualizacion.innerHTML= "<p> "+ archivo.name +"</p>";
    // areaVisualizacion.innerHTML += "<p> Tamaño del archivo: "+ archivo.size +"</p>";
     //areaVisualizacion.innerHTML += "<p> Tipo del archivo: "+ archivo.type +"</p>";
    // areaVisualizacion.innerHTML += "<p> Fecha de la última modificación: "+ archivo.lastModifiedDate +"</p>";
     
      //Solamente admite archivos de tipo texto
      var tipoTexto = /text.*/;
      if (archivo.type.match(tipoTexto)) 
        {
          var lector = new FileReader();
          lector.onload = function (evento) {
            //El evento "onload" se lleva a cabo cada vez que se completa con éxito una operación de lectura
            //La propiedad "result" es donde se almacena el contenido del archivo
            //Esta propiedad solamente es válida cuando se termina la operación de lectura
            var noticias = lector.result.split("\n");
            
            //Recorrer cada noticia y separar sus elementos 
            //POr cada noticia hay que crear un var contenidos y recorrer esos contenidos insertandolose
            for (var i = 0; i < noticias.length; i++) {
              // Puedes hacer lo que necesites con cada noticia aquí
              // Por ejemplo, agregar cada noticia como un párrafo en el área de visualización
              var contenidos = noticias[i].split("_");
             // areaVisualizacion.innerHTML += "<p>" + noticias[i] + "</p>";
              areaVisualizacion.innerHTML += "<h4>" + contenidos[0] + "</h4>";
              areaVisualizacion.innerHTML += "<p>" + contenidos[1] + "</p>";
              areaVisualizacion.innerHTML += "<p>" + contenidos[2] + "</p>";
              areaVisualizacion.innerHTML += "<p>Autor:" + contenidos[3] + "</p>";
            }
            }      
          lector.readAsText(archivo);
          }
      else {
          errorArchivo.innerText = "Error : ¡¡¡ Archivo no válido !!!";
          }       
  };
  insertarNoticia() {
    var titular =document.getElementById('titular').value;
    var entradilla = document.getElementById('entradilla').value;
    var contenido = document.getElementById('contenido').value;
    var autor = document.getElementById('autor').value;
    // Crea un nuevo bloque con la información de la noticia
   // var noticiaHTML = "<section><h3>" + titular + "</h3><p>Entradilla: " + entradilla + "</p><p>Contenido: " + contenido + "</p><p>Autor:" + autor + "</p></section>";
    var areaVisualizacion = document.querySelector("section");
    // Inserta la noticia en el contenedor de noticias
    areaVisualizacion.innerHTML+="<h3>" + titular + "</h3>";
    areaVisualizacion.innerHTML+="<p>" + entradilla + "</p>";
    areaVisualizacion.innerHTML+="<p>" + contenido + "</p>";
    areaVisualizacion.innerHTML+="<p>Autor: " + autor + "</p>";

    // Limpia los campos después de insertar la noticia
    document.getElementById('titular').value= "";
    document.getElementById('entradilla').value= "";
    document.getElementById('contenido').value= "";
    document.getElementById('autor').value= "";
};
 
}

// Crear una instancia de la clase
const miInstancia = new Noticias();