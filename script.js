const startBtn = document.getElementById('startBtn');
const gameArea = document.getElementById('gameArea');
const timer = document.getElementById('timer');
const scoreDisplay = document.getElementById('score');
const resultBanner = document.getElementById('resultBanner');

let gameInterval;
let gameTime = 20;
let score = 0;
let goldenLetterPrice = 2;
let gameOver = false;

startBtn.addEventListener('click', startGame);

function startGame() {
	startBtn.disabled = true;
	resetGame();
	gameInterval = setInterval(updateGame, 1000);
	spawnLetter();
}

function resetGame() {
	gameTime = 20;
	score = 0;
	gameOver = false;
	timer.textContent = `Time: ${gameTime}`;
	scoreDisplay.textContent = `Score: ${score}`;
	resultBanner.style.display = 'none';
}

function updateGame() {
	gameTime--;
	timer.textContent = `Time: ${gameTime}`;

	if (gameTime === 0) {
		gameOver = true;
		clearInterval(gameInterval);
		showScoreDetails();
	} else if (!gameOver) {
		spawnLetter();
	}
}

function clearDisplay() {
	const displayedLetters =  document.querySelectorAll('.letter');
	displayedLetters.forEach(letter => {
		gameArea.removeChild(letter);
	})
}

function spawnLetter() {
	const letter = document.createElement('div');
	const generatedLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
	letter.classList.add('letter');
	letter.textContent = generatedLetter;
	let leftPercentage = Math.floor(Math.random() * 90);
	if ((leftPercentage !== 0) && (leftPercentage !== 100)) {
		letter.style.left = leftPercentage + '%';
	}

	if (Math.random() < 0.1) {
		letter.classList.add('golden');
	}

	gameArea.appendChild(letter);
	let gameAreaHeight = gameArea.clientHeight;
	const fallingAnimation = [
		{ transform: "translateY(0)" },
		{ transform: `translateY(${gameAreaHeight - 20}px)`},
	];

	const fallingTiming = {
		duration: 8000,
		iterations: 1,
	};

	const animationLetter = letter.animate(fallingAnimation, fallingTiming);

	animationLetter.onfinish = function () {
		letter.classList.add("not-pressed");
		let notPressed = document.querySelector('.not-pressed');
			if (notPressed != undefined) {
				notPressed.remove();
			}
	}

	document.body.addEventListener('keypress', (e) => {
		let char = e.key;
		if (char.length === 1 && (generatedLetter.toLowerCase() === char.toLowerCase())) {
			if (letter.classList.contains('golden')) {
				score += goldenLetterPrice;
			} else {
				score++;
			}
			scoreDisplay.textContent = `Score: ${score}`;
			letter.remove();
		}
	});

}


function showScoreDetails() {
	startBtn.disabled = false;
	resultBanner.style.display = 'block';
	resultBanner.textContent = `Total Score: ${score}`;
	clearDisplay();
}

