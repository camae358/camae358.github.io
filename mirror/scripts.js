const squares = document.querySelectorAll('.square');
const gridSize = 50;
const maxX = Math.floor(window.innerWidth / gridSize) - 1;
const maxY = Math.floor(window.innerHeight / gridSize) - 1;

let directions = ['up', 'down', 'left', 'right'];

function getRandomDirection() {
    return directions[Math.floor(Math.random() * directions.length)];
}

function getNewPosition(square, direction) {
    const rect = square.getBoundingClientRect();
    let newX = Math.floor(rect.left / gridSize);
    let newY = Math.floor(rect.top / gridSize);

    switch (direction) {
        case 'up':
            newY = Math.max(newY - 1, 0);
            break;
        case 'down':
            newY = Math.min(newY + 1, maxY);
            break;
        case 'left':
            newX = Math.max(newX - 1, 0);
            break;
        case 'right':
            newX = Math.min(newX + 1, maxX);
            break;
    }

    return { x: newX * gridSize, y: newY * gridSize };
}

function moveSquares() {
    let positions = [];

    squares.forEach(square => {
        let direction = getRandomDirection();
        let position;

        do {
            position = getNewPosition(square, direction);
        } while (positions.some(p => Math.abs(p.x - position.x) < gridSize && Math.abs(p.y - position.y) < gridSize));

        positions.push(position);
        square.style.left = `${position.x}px`;
        square.style.top = `${position.y}px`;
    });
}

// Initial positioning
squares.forEach(square => {
    const position = getNewPosition(square, getRandomDirection());
    square.style.left = `${position.x}px`;
    square.style.top = `${position.y}px`;
});

// Move squares every 3 seconds
setInterval(moveSquares, 3000);
