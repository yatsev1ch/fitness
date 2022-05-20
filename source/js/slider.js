const reviewsContainer = document.querySelector('.reviews__reviews-list');
const trainersContainer = document.querySelector('.trainers__trainers-list');
const page = document.querySelector('.page');

const reviewsPrevButton = document.querySelector('.reviews__button--prev');
const reviewsNextButton = document.querySelector('.reviews__button--next');
const trainersPrevButton = document.querySelector('.trainers__button--prev');
const trainersNextButton = document.querySelector('.trainers__button--next');

const getCurrentReviews = () => [...reviewsContainer.querySelectorAll('.reviews__review')];
const getCurrentTrainers = () => [...trainersContainer.querySelectorAll('.trainers__trainer')];

let reviewsTouchStartX;
let trainersTouchStartX;
let trainerTarget;

const slideLeft = (elementsGetter, elementsContainer) => {
  const elements = elementsGetter();
  const lastElement = elements[elements.length - 1];
  const lastElementClone = lastElement.cloneNode(true);
  const firstElement = elements[0];
  lastElement.remove();
  elementsContainer.insertBefore(lastElementClone, firstElement);
};

const slideRight = (elementsGetter, elementsContainer) => {
  const elements = elementsGetter();
  const firstElement = elements[0];
  const firstElementClone = elements[0].cloneNode(true);
  firstElement.remove();
  elementsContainer.appendChild(firstElementClone);
};

const handleTouchSwipe = (touchStart, touchEnd, elementsGetter, elementsContainer) => {
  if (Math.abs(touchStart - touchEnd) < 20) {
    return;
  }

  if (touchStart > touchEnd) {
    slideRight(elementsGetter, elementsContainer);
  }

  if (touchStart < touchEnd) {
    slideLeft(elementsGetter, elementsContainer);
  }
};


reviewsPrevButton.addEventListener('click', ()=> {
  slideLeft(getCurrentReviews, reviewsContainer);
});

reviewsNextButton.addEventListener('click', ()=> {
  slideRight(getCurrentReviews, reviewsContainer);
});

reviewsContainer.addEventListener('touchstart', (evt) => {
  evt.preventDefault();
  reviewsTouchStartX = evt.changedTouches[0].screenX;
  page.classList.add('page--without-scroll');
});

reviewsContainer.addEventListener('touchend', (evt) => {
  const touchEndX = evt.changedTouches[0].screenX;
  handleTouchSwipe(reviewsTouchStartX, touchEndX, getCurrentReviews, reviewsContainer);
  page.classList.remove('page--without-scroll');
});

trainersPrevButton.addEventListener('click', ()=> {
  slideLeft(getCurrentTrainers, trainersContainer);
});

trainersNextButton.addEventListener('click', ()=> {
  slideRight(getCurrentTrainers, trainersContainer);

});

trainersContainer.addEventListener('touchstart', (evt) => {
  const trainer = evt.target.closest('.trainers__trainer');
  if (trainer) {
    trainerTarget = trainer;
    trainerTarget.classList.add('trainers__trainer--on-swiping');
    page.classList.add('page--without-scroll');
    trainersTouchStartX = evt.changedTouches[0].screenX;
  }
});

trainersContainer.addEventListener('touchcancel', () => {
  trainerTarget.classList.remove('trainers__trainer--on-swiping');
  trainerTarget = null;
  page.classList.remove('page--without-scroll');
});

trainersContainer.addEventListener('touchend', (evt) => {
  const touchEndX = evt.changedTouches[0].screenX;
  handleTouchSwipe(trainersTouchStartX, touchEndX, getCurrentTrainers, trainersContainer);
  if (trainerTarget) {
    trainerTarget.classList.remove('trainers__trainer--on-swiping');
    trainerTarget = null;
    page.classList.remove('page--without-scroll');
  }
});
