const togglesContainer = document.querySelector('.passes__toggles');
const passesContainer = document.querySelector('.passes__passes-list');
const toggles = togglesContainer.querySelectorAll('.passes__toggle');
const priceElements = passesContainer.querySelectorAll('.passes__pass');

const changeToggleState = (selectedToggle) => {
  toggles.forEach((toggle) => {
    if (toggle === selectedToggle) {
      toggle.classList.add('passes__toggle--active');
    } else {
      toggle.classList.remove('passes__toggle--active');
    }
  });
};

const changePriceWith = (toggle) => {
  const toggleType = toggle.dataset.type;
  priceElements.forEach((priceElement) => {
    if (priceElement.classList.contains(`passes__pass--${toggleType}`)) {
      priceElement.classList.remove('passes__pass--hidden');
    } else {
      priceElement.classList.add('passes__pass--hidden');
    }
  });
};

togglesContainer.addEventListener('click', (evt) => {
  evt.preventDefault();
  if (evt.target.classList.contains('passes__toggle')) {
    changeToggleState(evt.target);
    changePriceWith(evt.target);
  }
});
