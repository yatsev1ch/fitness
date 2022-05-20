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

const shiftElementAtStart = (elementsGetter, elementsContainer, alignment) => {
  let elements = elementsGetter();
  const lastElement = elements[elements.length - 1];
  const lastElementClone = lastElement.cloneNode(true);
  const firstElement = elements[0];
  lastElement.remove();
  elementsContainer.insertBefore(lastElementClone, firstElement);
  elements = elementsGetter();
  elements[1].scrollIntoView({behavior: 'instant', block: 'nearest', inline: alignment});
};

shiftElementAtStart(getCurrentTrainers, trainersContainer, 'start');
shiftElementAtStart(getCurrentReviews, reviewsContainer, 'center');

const slideLeft = (elementsGetter, elementsContainer, alignment) => {
  let elements = elementsGetter();
  const lastElement = elements[elements.length - 1];
  const lastElementClone = lastElement.cloneNode(true);
  const firstElement = elements[0];
  lastElement.remove();
  elementsContainer.insertBefore(lastElementClone, firstElement);
  elements = elementsGetter();
  elements[2].scrollIntoView({behavior: 'instant', block: 'nearest', inline: alignment});
  elements[1].scrollIntoView({behavior: 'smooth', block: 'nearest', inline: alignment});
};

const slideRight = (elementsGetter, elementsContainer, alignment) => {
  let elements = elementsGetter();
  const firstElement = elements[0];
  const firstElementClone = elements[0].cloneNode(true);
  firstElement.remove();
  elementsContainer.appendChild(firstElementClone);
  elements = elementsGetter();
  elements[0].scrollIntoView({behavior: 'instant', block: 'nearest', inline: alignment});
  elements[1].scrollIntoView({behavior: 'smooth', block: 'nearest', inline: alignment});
};

const handleTouchSwipe = (touchStart, touchEnd, elementsGetter, elementsContainer, alignment) => {
  if (touchStart > touchEnd) {
    slideRight(elementsGetter, elementsContainer, alignment);
  }

  if (touchStart < touchEnd) {
    slideLeft(elementsGetter, elementsContainer, alignment);
  }
};


reviewsPrevButton.addEventListener('click', ()=> {
  slideLeft(getCurrentReviews, reviewsContainer, 'center');
});

reviewsNextButton.addEventListener('click', ()=> {
  slideRight(getCurrentReviews, reviewsContainer, 'center');
});

reviewsContainer.addEventListener('touchstart', (evt) => {
  evt.preventDefault();
  reviewsTouchStartX = evt.changedTouches[0].screenX;
  page.classList.add('page--without-scroll');
});

reviewsContainer.addEventListener('touchend', (evt) => {
  const touchEndX = evt.changedTouches[0].screenX;
  handleTouchSwipe(reviewsTouchStartX, touchEndX, getCurrentReviews, reviewsContainer, 'center');
  page.classList.remove('page--without-scroll');
});

trainersPrevButton.addEventListener('click', ()=> {
  slideLeft(getCurrentTrainers, trainersContainer, 'start');
});

trainersNextButton.addEventListener('click', ()=> {
  slideRight(getCurrentTrainers, trainersContainer, 'start');

});

trainersContainer.addEventListener('touchstart', (evt) => {
  const trainer = evt.target.closest('.trainers__trainer');
  if (trainer) {
    evt.preventDefault();
    trainerTarget = trainer;
    trainerTarget.classList.add('trainers__trainer--on-swiping');
    page.classList.add('page--without-scroll');
    trainersTouchStartX = evt.changedTouches[0].screenX;
  }
});

trainersContainer.addEventListener('touchend', (evt) => {
  const touchEndX = evt.changedTouches[0].screenX;
  if (Math.abs(trainersTouchStartX - touchEndX) < 2) {
    trainerTarget.focus();
  } else {
    handleTouchSwipe(trainersTouchStartX, touchEndX, getCurrentTrainers, trainersContainer, 'start');
  }
  trainerTarget.classList.remove('trainers__trainer--on-swiping');
  trainerTarget = null;
  trainersTouchStartX = null;
  page.classList.remove('page--without-scroll');
});
