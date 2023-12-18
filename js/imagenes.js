class Imagenes {
    constructor() {}
  
    mostrarImagenes() {
        const slides = document.querySelectorAll("img");

        // select next slide button
        const nextSlide = document.querySelector("button[data-action='next']");
        
        // current slide counter
        let curSlide = 0;
        // maximum number of slides
        let maxSlide = slides.length - 1;
        
        // add event listener and navigation functionality
        nextSlide.addEventListener("click", function () {
          // check if current slide is the last and reset current slide
          if (curSlide === maxSlide) {
            curSlide = 0;
          } else {
            curSlide++;
          }
        
          //   move slide by -100%
          slides.forEach((slide, indx) => {
              var trans = 100 * (indx - curSlide);
            $(slide).css('transform', 'translateX(' + trans + '%)')
          });
        });
        
        // select next slide button
        const prevSlide = document.querySelector("button[data-action='prev']");
        
        // add event listener and navigation functionality
        prevSlide.addEventListener("click", function () {
          // check if current slide is the first and reset current slide to last
          if (curSlide === 0) {
            curSlide = maxSlide;
          } else {
            curSlide--;
          }
        
          //   move slide by 100%
          slides.forEach((slide, indx) => {
              var trans = 100 * (indx - curSlide);
            $(slide).css('transform', 'translateX(' + trans + '%)')
          });
        });
  }
}
  
  var imagen = new Imagenes();
  imagen.mostrarImagenes();
  