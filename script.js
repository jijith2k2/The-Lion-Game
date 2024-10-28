const lion = document.getElementById('lion');
const meat = document.getElementById('meat');
const spear = document.getElementById('spear');
const scoreDisplay = document.getElementById('score');
let score = 0;
let lionPosition = 125; 
let gameInterval;
let gameSpeed = 5; 

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' && lionPosition > 0) {
        lionPosition -= 20;
    } else if (event.key === 'ArrowRight' && lionPosition < 250) {
        lionPosition += 20;
    }
    lion.style.left = `${lionPosition}px`;
});

function startGame() {
    
    resetObject(meat, 'meat');
    resetObject(spear, 'spear');

    gameInterval = setInterval(() => {
        moveObject(meat, 'meat');
        moveObject(spear, 'spear');
        checkCollision();
    }, 20);
}

function moveObject(object, type) {
    let objectTop = parseInt(window.getComputedStyle(object).getPropertyValue('top'));

    if (objectTop >= 600) { 
        resetObject(object, type);
    } else {
        object.style.top = `${objectTop + gameSpeed}px`;
    }
}

function resetObject(object, type) {
    object.style.top = '-50px'; 
    object.style.left = `${Math.floor(Math.random() * 270)}px`; 
}

function checkCollision() {
    let lionRect = lion.getBoundingClientRect();
    let meatRect = meat.getBoundingClientRect();
    let spearRect = spear.getBoundingClientRect();

    
    if (lionRect.left < meatRect.right &&
        lionRect.right > meatRect.left &&
        lionRect.top < meatRect.bottom &&
        lionRect.bottom > meatRect.top) {
        score++;
        scoreDisplay.textContent = score;
        resetObject(meat, 'meat');
    }

    
    if (lionRect.left < spearRect.right &&
        lionRect.right > spearRect.left &&
        lionRect.top < spearRect.bottom &&
        lionRect.bottom > spearRect.top) {
        clearInterval(gameInterval);
        alert('Game Over! Your Score: ' + score);
        window.location.reload();
    }
}

startGame();