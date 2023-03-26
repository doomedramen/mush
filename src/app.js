const Store = require('electron-store');
const store = new Store();
const STORE_KEY = 'MUSH_TEXT'

function debounce(func, timeout = 500) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(this, args); }, timeout);
  };
}

function saveInput(event) {
  const newText = event?.target?.value || ''
  store.set(STORE_KEY, newText)
}

window.addEventListener('load', function () {
  const initText = store.get(STORE_KEY)
  const textInput = document.getElementById('text')
  if (initText) {
    textInput.value = initText
  }
  textInput.addEventListener('keyup', debounce((event) => saveInput(event)))
})



