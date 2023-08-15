let carouselFrame = document.querySelector('.carousel-frame')
let perfumeHeadline = document.querySelector('.perfume-headline')
let perfumeNotes = document.querySelector('.perfume-notes')
let perfumeImages = document.querySelector('#img-container')
let carouselNavPrev = document.querySelector('#carousel-prev')
let carouselNavNext = document.querySelector('#carousel-next')
let sliderDots = document.querySelectorAll('.selector-dots')
let currentPerfume;
let newPerfume;
let fadeChange;
let faderIn;
let faderOut;

const carouselTexts = [["Maltese Shore", "Main notes: Coconut, Sandalwood, Vanilla Musk, and Sea Salt"], ["Perseverance", "Main notes: Iris, Jasmine, Vetiver, and Poppy"],["Fern Gully", "Main notes: Clary Sage, Hedione, and Lemongrass"], ["Obsession", "Main notes: Heliotrope, Monoi, and Vanilla"],];

document.querySelector('#carousel-prev').addEventListener('click', carouselArrows)
document.querySelector('#carousel-next').addEventListener('click', carouselArrows)

addEventListenerDots(sliderDots);

function addEventListenerDots(sliderDotsList){
  for(let i=0; i < sliderDotsList.length; i++){
    sliderDotsList[i].addEventListener('click', dotsClicked);
  }
}

function carouselArrows(e){
  interruptCarouselLoop()
  if(e.target.classList.contains("fa-solid")){
    if(e.target.parentNode.id == "carousel-prev"){
      carouselAnimation(-1)
      // carouselManager(-1)
    }
    else{
      carouselAnimation(1)
      // carouselManager(1)
    }
  }
  else{
    if(e.target.id =="carousel-prev"){
      carouselAnimation(-1)
      // carouselManager(-1)
    }
    else{
      carouselAnimation(1)
      // carouselManager(1)
    }
  }
}

// when someone clicks on either the arrow, or the dots, I want to pass in some value
// to another function that manages the carousel loop, and then from that manager
// changePerfume()

function carouselManager(moveDirection){
  if(moveDirection < 0){
    currentPerfumeCalc()
    if(currentPerfume == "0"){
      updateDots(currentPerfume, sliderDots.item(3))
      changePerfume(3)
    }
    else{
      updateDots(currentPerfume, sliderDots.item(currentPerfume - 1))
      changePerfume(currentPerfume - 1)
    }
    //move to current position - 1
  }
  else if(moveDirection > 0){
    currentPerfumeCalc()
    //move to current position + 1
    if(currentPerfume == "3"){
      updateDots(currentPerfume, sliderDots.item(0))
      changePerfume(0)
    }
    else{
      updateDots(currentPerfume, sliderDots.item(currentPerfume + 1))
      changePerfume(currentPerfume + 1)
    }
  }
}

function currentPerfumeCalc(){
  for(let i = 0; i < sliderDots.length; i++){
    if(sliderDots[i].classList.contains('current')){
      currentPerfume = i;
    }
  }
}

function dotsClicked(e){
  interruptCarouselLoop()
  if (!e.target.classList.contains('current')){
    currentPerfumeCalc();
    updateDots(currentPerfume, e.target);
    changePerfume(newPerfume)
  }
}

function updateDots(currentPerfume, newPerfumeCount){
  sliderDots.item(currentPerfume).classList.remove('current');
  newPerfumeCount.classList.add('current')
  for(let i=0; i < sliderDots.length; i++){
    if(sliderDots[i].classList.contains('current')){
      newPerfume = i;
    }
  }
}

function changePerfume(goToPerfumeNumber){
  //Here I need to toggle visibility, instead of changing the src
  //See the above updateDots logic, it's by class, and I can use this to toggle visibility
  for(let i = 0; i < perfumeImages.children.length; i++){
    if(i === goToPerfumeNumber){
      perfumeImages.children[i].hidden = false
    }
    else{
      perfumeImages.children[i].hidden = true
    }
  }
  perfumeHeadline.innerText = carouselTexts[goToPerfumeNumber][0];
  perfumeNotes.innerText = carouselTexts[goToPerfumeNumber][1];
}

function carouselAnimation(movementDirection){
  fadeOut();
  faderIn = setTimeout(fadeIn, 400);
  fadeChange = setTimeout(carouselManager, 300, movementDirection)
}
function fadeIn(){
  if(carouselFrame.classList.contains('fadein')){
    //not sure what to do here yet, need to sort out setTimeout() first
  }
  else if(carouselFrame.classList.contains('fadeout')){
    carouselFrame.classList.replace('fadeout', 'fadein')
  }
  else{
    //if it doesn't have either, why is it fading in?
  }
}
function fadeOut(){
  if(carouselFrame.classList.contains('fadeout')){
    //once again, don't know yet what to do here
  }
  else if(carouselFrame.classList.contains('fadein')){
    carouselFrame.classList.replace('fadein', 'fadeout')
  }
  else{
    //if it doesn't have either it's a new cycle
    carouselFrame.classList.add('fadeout')
  }
}
//So calling carouselManager with a parameter of -1 moves the carousel left,
//and param of +1 moves it right. Using setInterval() to create a timed loop
//where the carousel moves from right to left, one item every 2 or 3 seconds,
//and if interrupted, waits for some 10 seconds to begin again.
  let carouselLoop = null
  let waitTime = null
  function timeTesting(){
    clearInterval(carouselLoop)
    clearInterval(waitTime)
    carouselLoop = setInterval(carouselAnimation, 4000, -1)
  }
  timeTesting()

  function interruptCarouselLoop(){
    clearInterval(carouselLoop)
    clearInterval(waitTime)
    waitTime = setInterval(timeTesting, 10000)
  }
