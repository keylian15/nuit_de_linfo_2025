<template>
	<div class="snake-game">
		<div class="game-container">
			<div
				v-if="!gameStarted"
				class="start-screen"
			>
				<h2>Snake Game</h2>
				<p>Utilisez les flèches pour déplacer le serpent</p>
				<p>Score à atteindre: {{ targetScore }}</p>
				<button
					class="start-button"
					@click="startGame"
				>
					Commencer
				</button>
			</div>

			<div
				v-else-if="gameOver"
				class="game-over-screen"
			>
				<h2>Game Over!</h2>
				<p>Score final: {{ score }}</p>
				<button
					class="restart-button"
					@click="restartGame"
				>
					Rejouer
				</button>
			</div>

			<div
				v-else-if="gameWon"
				class="win-screen"
			>
				<h2>🎉 Victoire! 🎉</h2>
				<p>Score final: {{ score }}</p>
				<button
					class="restart-button"
					@click="restartGame"
				>
					Rejouer
				</button>
			</div>

			<div v-else>
				<div class="score-board">
					<span>Score: {{ score }}</span>
					<span>Objectif: {{ targetScore }}</span>
				</div>

				<canvas
					ref="gameCanvas"
					:width="canvasWidth"
					:height="canvasHeight"
					class="game-canvas"
				/>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const gameCanvas = ref<HTMLCanvasElement | null>(null);
const canvasWidth = 600;
const canvasHeight = 600;
const gridSize = 20;
const tileCount = canvasWidth / gridSize;

// Game state
const snake = ref<{ x: number; y: number }[]>([{ x: 10, y: 10 }]);
const food = ref({ x: 15, y: 15 });
const direction = ref({ x: 0, y: 0 });
const nextDirection = ref({ x: 0, y: 0 });
const score = ref(0);
const targetScore = ref(10);
const gameStarted = ref(false);
const gameOver = ref(false);
const gameWon = ref(false);
const gameLoopId = ref<number | null>(null);

// Game functions
const generateFood = () => {
	let newFood: { x: number; y: number } = {
		x: Math.floor(Math.random() * tileCount),
		y: Math.floor(Math.random() * tileCount),
	};
	let validPosition = false;

	while (!validPosition) {
		newFood = {
			x: Math.floor(Math.random() * tileCount),
			y: Math.floor(Math.random() * tileCount),
		};

		validPosition = !snake.value.some(
			segment => segment.x === newFood.x && segment.y === newFood.y,
		);
	}

	food.value = newFood;
};

const checkCollision = (head: { x: number; y: number }) => {
	// Wall collision
	if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
		return true;
	}

	// Self collision
	return snake.value.some(segment => segment.x === head.x && segment.y === head.y);
};

const updateGame = () => {
	if (!gameStarted.value || gameOver.value || gameWon.value) return;

	direction.value = { ...nextDirection.value };

	if (direction.value.x === 0 && direction.value.y === 0) return;

	if (!snake.value[0]) return;
	const head: { x: number; y: number } = { x: snake.value[0].x, y: snake.value[0].y };
	head.x += direction.value.x;
	head.y += direction.value.y;

	if (checkCollision(head)) {
		gameOver.value = true;
		return;
	}

	snake.value.unshift(head);

	if (head.x === food.value.x && head.y === food.value.y) {
		score.value++;

		if (score.value >= targetScore.value) {
			gameWon.value = true;
			return;
		}

		generateFood();
	}
	else {
		snake.value.pop();
	}
};

const drawGame = () => {
	const canvas = gameCanvas.value;
	if (!canvas) return;

	const ctx = canvas.getContext('2d');
	if (!ctx) return;

	// Clear canvas
	ctx.fillStyle = '#1a1a2e';
	ctx.fillRect(0, 0, canvasWidth, canvasHeight);

	// Draw grid
	ctx.strokeStyle = '#16213e';
	ctx.lineWidth = 1;
	for (let i = 0; i <= tileCount; i++) {
		ctx.beginPath();
		ctx.moveTo(i * gridSize, 0);
		ctx.lineTo(i * gridSize, canvasHeight);
		ctx.stroke();

		ctx.beginPath();
		ctx.moveTo(0, i * gridSize);
		ctx.lineTo(canvasWidth, i * gridSize);
		ctx.stroke();
	}

	// Draw snake
	snake.value.forEach((segment, index) => {
		if (index === 0) {
			// Head
			ctx.fillStyle = '#00ff88';
			ctx.shadowBlur = 10;
			ctx.shadowColor = '#00ff88';
		}
		else {
			// Body
			ctx.fillStyle = '#0f3460';
			ctx.shadowBlur = 0;
		}

		ctx.fillRect(
			segment.x * gridSize + 1,
			segment.y * gridSize + 1,
			gridSize - 2,
			gridSize - 2,
		);
	});

	// Draw food
	ctx.fillStyle = '#ff0066';
	ctx.shadowBlur = 15;
	ctx.shadowColor = '#ff0066';
	ctx.beginPath();
	ctx.arc(
		food.value.x * gridSize + gridSize / 2,
		food.value.y * gridSize + gridSize / 2,
		gridSize / 2 - 2,
		0,
		Math.PI * 2,
	);
	ctx.fill();
	ctx.shadowBlur = 0;
};

const gameLoop = () => {
	updateGame();
	drawGame();
};

const handleKeyPress = (event: KeyboardEvent) => {
	const key = event.key;

	if (!gameStarted.value && key === ' ') {
		startGame();
		return;
	}

	// Prevent changing to opposite direction
	switch (key) {
		case 'ArrowUp':
			if (direction.value.y === 0) {
				nextDirection.value = { x: 0, y: -1 };
			}
			event.preventDefault();
			break;
		case 'ArrowDown':
			if (direction.value.y === 0) {
				nextDirection.value = { x: 0, y: 1 };
			}
			event.preventDefault();
			break;
		case 'ArrowLeft':
			if (direction.value.x === 0) {
				nextDirection.value = { x: -1, y: 0 };
			}
			event.preventDefault();
			break;
		case 'ArrowRight':
			if (direction.value.x === 0) {
				nextDirection.value = { x: 1, y: 0 };
			}
			event.preventDefault();
			break;
	}
};

const startGame = () => {
	gameStarted.value = true;
	gameOver.value = false;
	gameWon.value = false;
	snake.value = [{ x: 10, y: 10 }];
	direction.value = { x: 1, y: 0 };
	nextDirection.value = { x: 1, y: 0 };
	score.value = 0;
	generateFood();

	if (gameLoopId.value) {
		clearInterval(gameLoopId.value);
	}

	gameLoopId.value = window.setInterval(gameLoop, 100);
};

const restartGame = () => {
	startGame();
};

onMounted(() => {
	window.addEventListener('keydown', handleKeyPress);
	drawGame();
});

onUnmounted(() => {
	window.removeEventListener('keydown', handleKeyPress);
	if (gameLoopId.value) {
		clearInterval(gameLoopId.value);
	}
});
</script>

<style scoped>
.snake-game {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%);
  font-family: 'Arial', sans-serif;
}

.game-container {
  text-align: center;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.18);
}

.start-screen,
.game-over-screen,
.win-screen {
  color: white;
  padding: 3rem;
}

.start-screen h2,
.game-over-screen h2,
.win-screen h2 {
  font-size: 3rem;
  margin-bottom: 1rem;
  text-shadow: 0 0 20px rgba(0, 255, 136, 0.5);
}

.start-screen p,
.game-over-screen p,
.win-screen p {
  font-size: 1.2rem;
  margin: 1rem 0;
  color: #00ff88;
}

.start-button,
.restart-button {
  margin-top: 2rem;
  padding: 1rem 3rem;
  font-size: 1.2rem;
  font-weight: bold;
  color: white;
  background: linear-gradient(45deg, #00ff88, #00ccff);
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px 0 rgba(0, 255, 136, 0.3);
}

.start-button:hover,
.restart-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px 0 rgba(0, 255, 136, 0.5);
}

.score-board {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  color: white;
  font-size: 1.2rem;
  font-weight: bold;
}

.score-board span {
  color: #00ff88;
  text-shadow: 0 0 10px rgba(0, 255, 136, 0.5);
}

.game-canvas {
  border: 3px solid #00ff88;
  border-radius: 10px;
  box-shadow: 0 0 30px rgba(0, 255, 136, 0.3);
  background: #1a1a2e;
}

.win-screen h2 {
  text-shadow: 0 0 20px rgba(255, 215, 0, 0.8);
  animation: pulse 1s infinite;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}
</style>
