const PASSES_PRICES = {
  'month': {
    'trainer': 5000,
    'day': 1700,
    'fullDay': 2700,
  },
  'halfYear': {
    'trainer': 15000,
    'day': 9900,
    'fullDay': 12300,
  },
  'year': {
    'trainer': 25000,
    'day': 19000,
    'fullDay': 596000,
  },
};

const togglesContainer = document.querySelector('.passes__toggles');
const passesContainer = document.querySelector('.passes__passes-list');
const toggles = togglesContainer.querySelectorAll('.passes__toggle');
const priceElements = passesContainer.querySelectorAll('[data-type]');

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
  const pricesObject = PASSES_PRICES[`${toggleType}`];
  priceElements.forEach((priceElement) => {
    const type = priceElement.dataset.type;
    priceElement.dataset.price = pricesObject[`${type}`];
    priceElement.innerHTML = `${pricesObject[`${type }`]}&nbsp;`;
  });
};

togglesContainer.addEventListener('click', (evt) => {
  evt.preventDefault();
  if (evt.target.classList.contains('passes__toggle')) {
    changeToggleState(evt.target);
    changePriceWith(evt.target);
  }
});
