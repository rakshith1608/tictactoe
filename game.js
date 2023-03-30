// Define the canvas and its properties
const canvas = document.getElementById('board');
const context = canvas.getContext('2d');
context.lineWidth = 5;

// Define the game variables
let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];

// Define the winning combinations
const winningCombinations = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6]
];

// Define the drawX function
function drawX(x, y) {
	context.beginPath();
	context.moveTo(x - 50, y - 50);
	context.lineTo(x + 50, y + 50);
	context.moveTo(x + 50, y - 50);
	context.lineTo(x - 50, y + 50);
	context.stroke();
}

// Define the drawO function
function drawO(x, y) {
	context.beginPath();
	context.arc(x, y, 50, 0, 2 * Math.PI);
	context.stroke();
}

// Define the draw function
function draw() {
	context.clearRect(0, 0, canvas.width, canvas.height);

	for (let i = 0; i < gameState.length; i++) {
		const x = (i % 3) * 100 + 50;
		const y = Math.floor(i / 3) * 100 + 50;

		if (gameState[i] === 'X') {
			drawX(x, y);
		} else if (gameState[i] === 'O') {
			drawO(x, y);
		}
	}

	checkWin();
}
let playerTurn = 1;

// Define the drawPlayerTurn function to display whose player's turn it is
const playerTurnMessage = document.getElementById('player-turn-message');
function drawPlayerTurn() {
	playerTurnMessage.textContent = `Player ${playerTurn}'s turn`;
}

// Define the switchTurn function to switch the player turn
function switchTurn() {
	playerTurn = playerTurn === 1 ? 2 : 1;
	drawPlayerTurn();
}
// Define the handleClick function
function handleClick(event) {
	const x = event.clientX - canvas.offsetLeft;
	const y = event.clientY - canvas.offsetTop;
	const index = Math.floor(x / 100) + Math.floor(y / 100) * 3;

	if (gameState[index] === '') {
		gameState[index] = currentPlayer;
		currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
		draw();
		checkWin();
		switchTurn();
	}
}
function reset() {
	gameState = ['', '', '', '', '', '', '', '', ''];
	context.clearRect(0, 0, canvas.width, canvas.height);
	//drawGrid();
	drawPlayerTurn();
}

// Call the drawPlayerTurn function at the beginning of the game
drawPlayerTurn();
// Define the checkWin function
function checkWin() {
	const winningCombinations = [
		[0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
		[0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
		[0, 4, 8], [2, 4, 6] // Diagonals
	];

	for (let i = 0; i < winningCombinations.length; i++) {
		const [a, b, c] = winningCombinations[i];

		if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
			// Draw the winning symbol in the winning boxes
			context.fillStyle = '#FFFF00';
			context.fillRect((a % 3) * 100, Math.floor(a / 3) * 100, 100, 100);
			context.fillRect((b % 3) * 100, Math.floor(b / 3) * 100, 100, 100);
			context.fillRect((c % 3) * 100, Math.floor(c / 3) * 100, 100, 100);

			// Change the background and display the animation
			canvas.style.background = 'linear-gradient(to right, #FFDAB9, #FFFACD)';
			const player = gameState[a] === 'X' ? '1' : '2';
			const animation = document.createElement('div');
			animation.textContent = `PLAYER ${player} WINS!`;
			animation.style.position = 'absolute';
			animation.style.top = '70%';
			animation.style.left = '50%';
			animation.style.transform = 'translate(-50%, -50%)';
			animation.style.fontSize = '3em';
			animation.style.color = '#FF8C00';
			animation.style.fontFamily = 'Times New Roman, sans-serif';
			animation.style.animation = 'animate 2s linear 1';
			document.body.appendChild(animation);
				
			// Display the notification and reset the game after the animation ends
			animation.addEventListener('animationend', () => {
				alert(`Player ${player} wins!`);
				reset();
				canvas.style.background = '#FFFFFF';
				animation.remove();
			});
			reset();
			return;
		}
	}

	// Check if the game is a tie
	if (!gameState.includes('')) {
		setTimeout(() => {
			alert('Tie game!');
			reset();
		}, 100);
	}
}

// Add the event listener
canvas.addEventListener('click', handleClick);

// Draw the initial board
draw();
function draw() {
	context.clearRect(0, 0, canvas.width, canvas.height);

	// Draw the board boundaries
	context.beginPath();
	context.moveTo(100, 0);
	context.lineTo(100, 300);
	context.moveTo(200, 0);
	context.lineTo(200, 300);
	context.moveTo(0, 100);
	context.lineTo(300, 100);
	context.moveTo(0, 200);
	context.lineTo(300, 200);
	context.stroke();

	// Draw the marks on the board
	for (let i = 0; i < gameState.length; i++) {
		const x = (i % 3) * 100 + 50;
		const y = Math.floor(i / 3) * 100 + 50;

		if (gameState[i] === 'X') {
			drawX(x, y);
		} else if (gameState[i] === 'O') {
			drawO(x, y);
		}
	}

	checkWin();
}
