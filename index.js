 // use a script tag or an external JS file
 document.addEventListener("DOMContentLoaded", (event) => {
  gsap.registerPlugin(ScrollToPlugin,TextPlugin)
  ScrollToPlugin.config({ autoKill: true })
  // gsap code here!



 });

function onResize() {
    for (let i = 0; i < slides.length; i++) {
      const element = slides[i];

      const main = element.querySelector("#main")
      if (main) {
        const img = main.parentElement.querySelector("#center-img")

        main.style.left = window.getComputedStyle(img).marginLeft
        main.style.right = window.getComputedStyle(img).marginRight
        main.style.width = window.getComputedStyle(img).width
        main.style.height = window.getComputedStyle(img).height
      }
    }
}


window.addEventListener('resize', onResize);

const slidesWrapper = document.querySelector('#top-carousel');
const slides = slidesWrapper.children;

for (let i = 0; i < slides.length; i++) {
  const element = slides[i];

  const img = element.querySelector("#center-img")
  if (img) {
      const main = img.parentElement;
      img.parentElement.parentElement.appendChild(img)

      const bg = img.cloneNode()
      bg.id = "bg-img"
      img.parentElement.insertBefore(bg, img)

      main.style.left = window.getComputedStyle(img).marginLeft
  }
}

const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button');
const buttonContainers = document.querySelector('.carousel-btns');
let currentSlideIndex = 0;
const totalSlides = slides.length;
let isScrollingSlide = false;

if (totalSlides == 1) {
  buttonContainers.remove()
} else {

  if (buttonContainers) {

    slidesWrapper.insertBefore(slides[0].cloneNode(true),slides[totalSlides-1].nextSibling)
    slidesWrapper.insertBefore(slides[totalSlides-1].cloneNode(true),slides[0])

    slidesWrapper.scrollBy(slides[0].scrollWidth,0)

    for (let i = 0; i < slidesWrapper.children.length; i++) {
      const element = slidesWrapper.children[i];
      element.id = "TopCarousel_"+i
    }



    function postCarousel() {

        if (currentSlideIndex >= totalSlides) {
          slidesWrapper.scrollTo(slides[0].scrollWidth, 0)
          currentSlideIndex = 0;
        } else if (currentSlideIndex < 0) {
          slidesWrapper.scrollTo(slides[0].scrollWidth*totalSlides, 0)
          currentSlideIndex = totalSlides-1;
        } 
        isScrollingSlide = false;
    }

    function updateCarousel(direction) {

        if (isScrollingSlide)
          return;

        isScrollingSlide = true;
        gsap.to(slidesWrapper, { duration: 0.125, scrollTo: {x:"#"+slidesWrapper.children[currentSlideIndex+direction+1].id,y:0, autoKill: true}, onComplete: postCarousel });

        currentSlideIndex += direction;
      }

    prevButton.addEventListener('click', () => {
      updateCarousel(-1);
    });

    nextButton.addEventListener('click', () => {
      updateCarousel(1);
    });

  }
}

onResize()
