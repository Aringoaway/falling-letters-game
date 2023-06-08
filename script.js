const startBtn = document.getElementById('startBtn');
const gameArea = document.getElementById('gameArea');
const timer = document.getElementById('timer');
const scoreDisplay = document.getElementById('score');

let gameInterval;
let gameTime = 20;
let score = 0;
let goldenLetterPrice = 2;

startBtn.addEventListener('click', startGame);

function startGame() {
	startBtn.disabled = true;
	gameInterval = setInterval(updateGame, 1000);
	spawnLetter();
}

function updateGame() {
	gameTime--;
	timer.textContent = `Time: ${gameTime}`;

	if (gameTime === 0) {
		clearInterval(gameInterval);
		clearDisplay();
		showScoreDetails();
	} else {
		spawnLetter();
	}
}

function clearDisplay() {
	console.log("clear")
	const displayedLetters =  document.querySelectorAll('.letter');
	displayedLetters.forEach(i => {
		i.remove();
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
		const notPressed = document.querySelector('.not-pressed');
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
	gameTime = 20;
	alert(`Total Score: ${score} (Total Points + (Total Golden Letters * Golden Letter Price))`);
}
