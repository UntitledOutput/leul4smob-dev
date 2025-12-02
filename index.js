
const slidesWrapper = document.querySelector('.top-carousel');
const slides = slidesWrapper.children;
const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button');
let currentSlideIndex = 0;
const totalSlides = slides.length;

function updateCarousel() {
    console.log(currentSlideIndex)
    slidesWrapper.scrollBy(500,0)
}

prevButton.addEventListener('click', () => {
  currentSlideIndex = (currentSlideIndex - 1 + totalSlides) % totalSlides;
  updateCarousel();
});

nextButton.addEventListener('click', () => {
  currentSlideIndex = (currentSlideIndex + 1) % totalSlides;
  updateCarousel();
});