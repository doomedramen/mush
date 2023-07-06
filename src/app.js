const Store = require('electron-store');
const store = new Store();
const STORE_KEY = 'MUSH_TEXT'

const editor = CodeMirror(document.getElementById('editor'), {
  mode: "markdown",
  lineNumbers: false,
  theme: 'dracula',
  lineWrapping: true,
});

let saveTimeout;

editor.on('change', () => {
  if (saveTimeout) {
    clearTimeout(saveTimeout)
  }
  saveTimeout = setTimeout(() => {
    const newText = editor.getValue() || ''
    store.set(STORE_KEY, newText)
  }, 500)
})

const initText = store.get(STORE_KEY)
if (initText) {
  editor.setValue(initText)
}
