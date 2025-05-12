const CHAR_DELAY = 50;

function getRandomChar() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()-_+?{}[]<>';
  return chars.charAt(Math.floor(Math.random() * chars.length));
}

function generateRandomLine(length = 8) {
  return Array.from({ length }, getRandomChar).join('');
}

function typeLine(el, text, callback) {
  el.textContent = '';
  let i = 0;
  function nextChar() {
    if (i < text.length) {
      el.textContent += text[i++];
      setTimeout(nextChar, CHAR_DELAY);
    } else if (callback) {
      callback();
    }
  }
  nextChar();
}

function generateRandomText() {
  const lines = [
    generateRandomLine(),
    generateRandomLine(),
    generateRandomLine()
  ];
  const el1 = document.getElementById('line1');
  const el2 = document.getElementById('line2');
  const el3 = document.getElementById('line3');

  typeLine(el1, lines[0], () => {
    typeLine(el2, lines[1], () => {
      typeLine(el3, lines[2]);
    });
  });
}

function updateText(input) {
  const third = Math.ceil(input.length / 3);
  document.getElementById('line1').textContent = input.slice(0, third);
  document.getElementById('line2').textContent = input.slice(third, 2 * third);
  document.getElementById('line3').textContent = input.slice(2 * third);
}

document.getElementById('userInput').addEventListener('input', (e) => {
  updateText(e.target.value);
});

const leadingMap = [-60, -40, -20, 0, 20, 40, 60];
document.getElementById('leadingSlider').addEventListener('input', (e) => {
  const index = parseInt(e.target.value) + 1;
  const extra = leadingMap[index];
  document.querySelector('.text-container').style.lineHeight = `${128 + extra}px`;
});

function rotateAndReflect() {
  ['line1', 'line2', 'line3'].forEach(id => {
    const lineEl = document.getElementById(id);
    const text = lineEl.textContent;
    if (text.length < 2) return;

    let i = Math.floor(Math.random() * text.length);
    let j;
    do { j = Math.floor(Math.random() * text.length); } while (j === i);

    let html = '';
    for (let idx = 0; idx < text.length; idx++) {
      const ch = text[idx];
      if (idx === i) {
        html += `<span style="display:inline-block; transform:rotate(180deg);">${ch}</span>`;
      } else if (idx === j) {
        html += `<span style="display:inline-block; transform:scaleY(-1);">${ch}</span>`;
      } else {
        html += ch;
      }
    }
    lineEl.innerHTML = html;
  });
}

document.getElementById('randomizeBtn').addEventListener('click', generateRandomText);
document.getElementById('rotateReflectBtn').addEventListener('click', rotateAndReflect);

generateRandomText();