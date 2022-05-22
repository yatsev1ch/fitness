const reviewsContainer = document.querySelector('.reviews__reviews-list');
const trainersContainer = document.querySelector('.trainers__trainers-list');
const page = document.querySelector('.page');

const reviewsPrevButton = document.querySelector('.reviews__button--prev');
const reviewsNextButton = document.querySelector('.reviews__button--next');
const trainersPrevButton = document.querySelector('.trainers__button--prev');
const trainersNextButton = document.querySelector('.trainers__button--next');

let reviewsTouchStartX;
let trainersTouchStartX;
let trainerTarget;
let slidersInitDebouncer;

const getCurrentReviews = () => [...reviewsContainer.querySelectorAll('.reviews__review')];
const getCurrentReview = () => getCurrentReviews()[1];
const getCurrentTrainers = () => [...trainersContainer.querySelectorAll('.trainers__trainer')];
const isSwipe = (startTouch, endTouch) => Math.abs(startTouch - endTouch) > 5;

let leftSlideBlock = true;
let rightSlideBlock = false;

const createDebouncer = (callback, timeoutDelay) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(rest), timeoutDelay);
  };
};

const checkReviewsButtons = () => {
  const currentReview = getCurrentReview();
  const isFirst = currentReview.id === 'first';
  const isLast = currentReview.id === 'last';
  reviewsPrevButton.disabled = isFirst ? true : false;
  leftSlideBlock = isFirst ? true : false;
  reviewsNextButton.disabled = isLast ? true : false;
  rightSlideBlock = isLast ? true : false;
};

const initElements = (container, getter, propSetter) => {
  const elements = getter();
  propSetter(elements);
  const lastElement = elements[elements.length - 1];
  const lastElementClone = lastElement.cloneNode(true);
  lastElement.remove();
  container.insertBefore(lastElementClone, elements[0]);
};

initElements(trainersContainer, getCurrentTrainers, (_) => {});
initElements(reviewsContainer, getCurrentReviews, (elements) => {
  elements[0].id = 'first';
  elements[elements.length - 1].id = 'last';
});

const initScroll = (container, getter, completion) => {
  const elements = getter();
  const firstElement = elements[0];
  const secondElement = elements[1];
  const gap = secondElement.offsetLeft - firstElement.offsetWidth;
  completion(container, firstElement, secondElement, gap);
};

const initTrainersPosition = () => {
  initScroll(trainersContainer, getCurrentTrainers, ((container, firstElement, secondElement, gap) => {
    const offset = secondElement.offsetWidth + gap;
    container.scroll(offset, 0);
  }));
};

const initReviewsPosition = () => {
  initScroll(reviewsContainer, getCurrentReviews, (container, firstElement, secondElement, gap) => {
    const padding = (container.offsetWidth - firstElement.offsetWidth) / 2;
    const offset = secondElement.offsetWidth + (gap - padding);
    container.scroll(offset, 0);
  });
};

initReviewsPosition();
initTrainersPosition();

slidersInitDebouncer = createDebouncer(() => {
  initReviewsPosition();
  initTrainersPosition();
}, 50);

window.addEventListener('resize', () => {
  slidersInitDebouncer();
});

const slideLeft = (elementsGetter, elementsContainer) => {
  const elements = elementsGetter();
  const lastElement = elements[elements.length - 1];
  const newFirstElement = lastElement.cloneNode(true);
  trainerTarget = newFirstElement;
  const firstElement = elements[0];
  lastElement.remove();
  elementsContainer.insertBefore(newFirstElement, firstElement);
  elementsContainer.classList.add('slider--to-left');

  window.requestAnimationFrame(() => {
    elementsContainer.classList.remove('slider--to-left');
  });
};

const slideRight = (elementsGetter, elementsContainer) => {
  const elements = elementsGetter();
  const newLastElement = elements[0].cloneNode(true);
  trainerTarget = newLastElement;
  elements[0].remove();
  elementsContainer.append(newLastElement);
  elementsContainer.classList.add('slider--to-right');
  window.requestAnimationFrame(() => {
    elementsContainer.classList.remove('slider--to-right');
  });
};

const handleTouchSwipe = (touchStart, touchEnd, elementsGetter, elementsContainer, isBlockable) => {
  if (touchStart > touchEnd) {
    if (isBlockable && rightSlideBlock) {
      return;
    }
    slideRight(elementsGetter, elementsContainer);
  }
  if (touchStart < touchEnd) {
    if (isBlockable && leftSlideBlock) {
      return;
    }
    slideLeft(elementsGetter, elementsContainer);
  }
};

reviewsPrevButton.addEventListener('click', ()=> {
  slideLeft(getCurrentReviews, reviewsContainer);
  checkReviewsButtons();
});

reviewsNextButton.addEventListener('click', ()=> {
  slideRight(getCurrentReviews, reviewsContainer);
  checkReviewsButtons();
});

reviewsContainer.addEventListener('touchstart', (evt) => {
  reviewsTouchStartX = evt.changedTouches[0].screenX;
  page.classList.add('page--without-scroll');
});

reviewsContainer.addEventListener('touchend', (evt) => {
  const touchEndX = evt.changedTouches[0].screenX;
  if (isSwipe(reviewsTouchStartX, touchEndX)) {
    handleTouchSwipe(reviewsTouchStartX, touchEndX, getCurrentReviews, reviewsContainer, true);
    checkReviewsButtons();
  }
  page.classList.remove('page--without-scroll');
});

trainersPrevButton.addEventListener('click', ()=> {
  slideLeft(getCurrentTrainers, trainersContainer);
});

trainersNextButton.addEventListener('click', ()=> {
  slideRight(getCurrentTrainers, trainersContainer);

});

trainersContainer.addEventListener('touchstart', (evt) => {
  page.classList.add('page--without-scroll');
  const trainer = evt.target.closest('.trainers__trainer');
  if (trainer) {
    trainerTarget = trainer;
    trainersTouchStartX = evt.changedTouches[0].screenX;
  }
});

trainersContainer.addEventListener('touchend', (evt) => {
  const touchEndX = evt.changedTouches[0].screenX;
  if (isSwipe(trainersTouchStartX, touchEndX)) {
    handleTouchSwipe(trainersTouchStartX, touchEndX, getCurrentTrainers, trainersContainer, false);
    trainerTarget.focus();
    trainerTarget.blur();
    page.classList.remove('page--without-scroll');
    return;
  }
  trainerTarget.focus();
  page.classList.remove('page--without-scroll');
});
