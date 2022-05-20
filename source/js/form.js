const phoneInput = document.querySelector('.feedback input[type="tel"]');

const NUMBER_EXPRESSION = /[0-9]/;

const getCodeFrom = (string) => {
  const sliced = string.slice(1, 4);
  return sliced ? `(${sliced}` : '';
};

const getFirstNumber = (string) => {
  const sliced = string.slice(0, 1);
  return sliced ? `+${sliced}` : '+';
};

const getNumber = (string) => {
  const sliced = string.slice(4, 11);
  return sliced ? `)${sliced}` : '';
};

const handleInput = (input) => {
  let clearString = [...input.value].filter((char) => NUMBER_EXPRESSION.test(char)).join('');
  if (clearString.length === 1 && clearString[0] !== '7') {
    clearString = '7' + clearString;
  }
  const finalString = `${getFirstNumber(clearString)}${getCodeFrom(clearString)}${getNumber(clearString)}`;
  input.value = input.value !== '' ? finalString : '';
};

phoneInput.addEventListener('input', (evt) => {
  handleInput(evt.target);
});
