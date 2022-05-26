const togglesContainer = document.querySelector('.passes__toggles');
const passesContainer = document.querySelector('.passes__passes-list');
const toggles = togglesContainer.querySelectorAll('.passes__toggle');
const passesGroups = passesContainer.querySelectorAll('.passes__toggle-container');

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
  passesGroups.forEach((passesGroup) => {
    if (passesGroup.classList.contains(`passes__toggle-container--${toggleType}`)) {
      passesGroup.classList.remove('passes__toggle-container--hidden');
    } else {
      passesGroup.classList.add('passes__toggle-container--hidden');
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
