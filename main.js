// TODO: 

// Faker.js via python 3.7+

// Build out a db of perfumes
// Maybe a fake user profile db also?
// A db of bottles?

// Update semantics, and Javascript use of prototypes, other JS features, like maybe
// currying or something.


(function () {
  const carouselFrame = document.querySelector('.carousel-frame');
  const perfumeImages = document.querySelector('#img-container');
  const sliderDots = document.querySelectorAll('.selector-dots');
  const carouselNavPrev = document.querySelector('#carousel-prev');
  const carouselNavNext = document.querySelector('#carousel-next');

  const perfumeData = [
    {
      name: "Maltese Shore",
      notes: "Main notes: Coconut, Sandalwood, Vanilla Musk, and Sea Salt",
      imageSrc: "./imgs/carousel1.jpg",
    },
    {
      name: "Perseverance",
      notes: "Main notes: Iris, Jasmine, Vetiver, and Poppy",
      imageSrc: "./imgs/carousel2.jpg",
    },
    {
      name: "Fern Gully",
      notes: "Main notes: Clary Sage, Hedione, and Lemongrass",
      imageSrc: "./imgs/carousel3.jpg",
    },
    {
      name: "Obsession",
      notes: "Main notes: Heliotrope, Monoi, and Vanilla",
      imageSrc: "./imgs/carousel4.jpg",
    },
  ];

  let currentPerfumeIndex = 0;
  let automaticCarouselInterval;

  function updatePerfumeDisplay() {
    const currentPerfume = perfumeData[currentPerfumeIndex];
    const perfumeImageElements = perfumeImages.children;

    for (let i = 0; i < perfumeImageElements.length; i++) {
      if (i === currentPerfumeIndex) {
        fadeIn(perfumeImageElements[i]);
      } else {
        fadeOut(perfumeImageElements[i]);
      }
      sliderDots[i].classList.toggle('current', i === currentPerfumeIndex);
    }

    document.querySelector('.perfume-headline').textContent = currentPerfume.name;
    document.querySelector('.perfume-notes').textContent = currentPerfume.notes;
  }

  function fadeOut(element) {
    element.style.opacity = 1;
    (function fade() {
      if ((element.style.opacity -= 0.1) < 0) {
        element.style.display = 'none';
      } else {
        requestAnimationFrame(fade);
      }
    })();
  }

  function fadeIn(element) {
    element.style.opacity = 0;
    element.style.display = 'block';
    (function fade() {
      let val = parseFloat(element.style.opacity);
      if (!((val += 0.1) > 1)) {
        element.style.opacity = val;
        requestAnimationFrame(fade);
      }
    })();
  }

  function handleDotClick(event) {
    const dotIndex = Array.from(sliderDots).indexOf(event.target);
    if (dotIndex >= 0) {
      currentPerfumeIndex = dotIndex;
      updatePerfumeDisplay();
      clearInterval(automaticCarouselInterval);
      startAutomaticCarousel();
    }
  }

  function handleArrowClick(isNext) {
    if (isNext) {
      currentPerfumeIndex = (currentPerfumeIndex + 1) % perfumeData.length;
    } else {
      currentPerfumeIndex = (currentPerfumeIndex - 1 + perfumeData.length) % perfumeData.length;
    }
    updatePerfumeDisplay();
    clearInterval(automaticCarouselInterval);
    startAutomaticCarousel();
  }

  function startAutomaticCarousel() {
    automaticCarouselInterval = setInterval(() => {
      currentPerfumeIndex = (currentPerfumeIndex + 1) % perfumeData.length;
      updatePerfumeDisplay();
    }, 3000); // Change image every 3 seconds
  }

  document.querySelector('#carousel-prev').addEventListener('click', () => handleArrowClick(false));
  document.querySelector('#carousel-next').addEventListener('click', () => handleArrowClick(true));
  sliderDots.forEach(dot => dot.addEventListener('click', handleDotClick));

  updatePerfumeDisplay();
  startAutomaticCarousel();
})();