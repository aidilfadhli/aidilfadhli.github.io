// Disable right-click
document.addEventListener(
  'contextmenu',
  (e) => {
    e.preventDefault();
  },
  false
);

// Disable View Source Code
document.addEventListener('keydown', (e) => {
  // USE THIS TO DISABLE CONTROL AND ALL FUNCTION KEYS
  // if (e.ctrlKey || (e.keyCode>=112 && e.keyCode<=123)) {
  // THIS WILL ONLY DISABLE CONTROL AND F12
  if (e.ctrlKey || e.keyCode == 123) {
    e.stopPropagation();
    e.preventDefault();
  }
});

/** TO DISABLE SCREEN CAPTURE **/
document.addEventListener('keyup', (e) => {
  if (e.key == 'PrintScreen') {
    navigator.clipboard.writeText('');
    alert('Screnn Capture not allowed');
    alert('Website ini dilindungi oleh @dill.fdh');
  }
});

/** TO DISABLE PRINTS WHIT CTRL+P **/
document.addEventListener('keydown', (e) => {
  if (e.ctrlKey && e.key == 'p') {
    alert('Website ini dilindungi oleh @dill.fdh');
    e.cancelBubble = true;
    e.preventDefault();
    e.stopImmediatePropagation();
  }
});
