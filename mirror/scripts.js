const greySquare1 = document.getElementById('greySquare1');
const greySquare2 = document.getElementById('greySquare2');
const squareSlider = document.getElementById('squareSlider');
const squareCountLabel = document.getElementById('squareCount');
const rotateButton = document.getElementById('rotateButton');
const reflectButton = document.getElementById('reflectButton');
const pauseButton = document.getElementById('pauseButton');
const speedSlider = document.getElementById('speedSlider');
const speedValue = document.getElementById('speedValue');
const densitySlider = document.getElementById('densitySlider');
const densityValue = document.getElementById('densityValue');

const unitWidth = 53.3333;
const unitHeight = 80;

let totalSquares = 10;
let squares1 = [];
let squares2 = [];
let positions = [];
let isPaused = false;
let density = 5;
let maxSpots = 0;
const letters = "abcdefghijlnopqrsxyz123456789$%^&*_+{}[]";

function updateAvailableSpots() {
  const maxX = greySquare1.offsetWidth - unitWidth;
  const maxY = greySquare1.offsetHeight - unitHeight;
  maxSpots = Math.floor((maxX / unitWidth) * (maxY / unitHeight) * (density / 10));
}

function createSquares(num) {
  squares1.forEach(sq => greySquare1.removeChild(sq));
  squares2.forEach(sq => greySquare2.removeChild(sq));
  squares1 = [];
  squares2 = [];
  positions = [];

  updateAvailableSpots();

  const squaresToCreate = Math.min(num, maxSpots);
  totalSquares = squaresToCreate;
  const maxX = greySquare1.offsetWidth - unitWidth;
  const maxY = greySquare1.offsetHeight - unitHeight;

  for (let i = 0; i < squaresToCreate; i++) {
    const letter = letters[Math.floor(Math.random() * letters.length)];

    const square1 = document.createElement('div');
    square1.classList.add('small-square');
    square1.textContent = letter;
    greySquare1.appendChild(square1);
    squares1.push(square1);

    const square2 = document.createElement('div');
    square2.classList.add('small-square');
    square2.textContent = letter;
    greySquare2.appendChild(square2);
    squares2.push(square2);

    let randomX, randomY, tries = 0;
    let collision;
    do {
      randomX = Math.floor(Math.random() * (maxX / unitWidth)) * unitWidth;
      randomY = Math.floor(Math.random() * (maxY / unitHeight)) * unitHeight;
      collision = positions.some(p => p.x === randomX && p.y === randomY);
      tries++;
      if (tries > 100) break;
    } while (collision);

    square1.style.left = `${randomX}px`;
    square1.style.top = `${randomY}px`;
    square2.style.left = `${randomX}px`;
    square2.style.top = `${randomY}px`;

    positions.push({ x: randomX, y: randomY });
  }

  squareCountLabel.textContent = totalSquares;
}

function checkCollision(newX, newY, excludeIndex = -1) {
  for (let i = 0; i < totalSquares; i++) {
    if (i !== excludeIndex) {
      const pos = positions[i];
      if (
        newX < pos.x + unitWidth &&
        newX + unitWidth > pos.x &&
        newY < pos.y + unitHeight &&
        newY + unitHeight > pos.y
      ) {
        return true;
      }
    }
  }
  return false;
}

function moveSquare() {
  if (isPaused) return;

  squares1.forEach((square, index) => {
    const direction = Math.floor(Math.random() * 4);
    let posX = positions[index].x;
    let posY = positions[index].y;

    let newPosX = posX;
    let newPosY = posY;

    switch (direction) {
      case 0: if (posY > 0) newPosY -= unitHeight; break;
      case 1: if (posY < greySquare1.offsetHeight - unitHeight) newPosY += unitHeight; break;
      case 2: if (posX > 0) newPosX -= unitWidth; break;
      case 3: if (posX < greySquare1.offsetWidth - unitWidth) newPosX += unitWidth; break;
    }

    if (!checkCollision(newPosX, newPosY, index)) {
      square.style.top = `${newPosY}px`;
      square.style.left = `${newPosX}px`;
      squares2[index].style.top = `${newPosY}px`;
      squares2[index].style.left = `${newPosX}px`;

      positions[index] = { x: newPosX, y: newPosY };
    }
  });
}

function rotateSquares() {
  const numToRotate = Math.floor(Math.random() * totalSquares);
  const rotateCount = numToRotate > 0 ? numToRotate : 1;

  for (let i = 0; i < rotateCount; i++) {
    const index = Math.floor(Math.random() * totalSquares);
    squares1[index].style.transform = `rotate(180deg)`;
    squares2[index].style.transform = `rotate(180deg)`;
  }
}

function reflectSquare() {
  const index = Math.floor(Math.random() * totalSquares);
  squares1[index].style.transform = `scaleX(-1)`;
  squares2[index].style.transform = `scaleX(-1)`;
}

squareSlider.addEventListener('input', (e) => {
  totalSquares = parseInt(e.target.value, 10);
  squareCountLabel.textContent = totalSquares;
  createSquares(totalSquares);
});

rotateButton.addEventListener('click', rotateSquares);
reflectButton.addEventListener('click', reflectSquare);

pauseButton.addEventListener('click', () => {
  isPaused = !isPaused;
  pauseButton.textContent = isPaused ? 'resume' : 'pause';
});

speedSlider.addEventListener('input', (e) => {
  moveInterval = parseInt(e.target.value, 10);
  speedValue.textContent = moveInterval;
  clearInterval(intervalId);
  intervalId = setInterval(moveSquare, moveInterval);
});

densitySlider.addEventListener('input', (e) => {
  density = parseInt(e.target.value, 10);
  densityValue.textContent = density;
  createSquares(totalSquares);
});

createSquares(totalSquares);
let moveInterval = parseInt(speedSlider.value, 10);
let intervalId = setInterval(moveSquare, moveInterval);
