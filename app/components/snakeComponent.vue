<template>
	<div class="snake-game">
		<div
			v-if="showSecretMenu"
			class="secret-menu"
		>
			<div class="secret-content">
				<h2>🎮 Mode Secret Déverrouillé! 🎮</h2>
				<div class="secret-options">
					<button
						class="secret-btn neon"
						@click="activateNeonMode"
					>
						✨ Neon Mode
					</button>
					<button
						class="secret-btn god"
						@click="activateGodMode"
					>
						👑 God Mode
					</button>
					<button
						class="secret-btn speed"
						@click="activateSpeedChallenge"
					>
						⚡ Speed Challenge
					</button>
					<button
						class="secret-btn close"
						@click="closeSecret"
					>
						✕ Fermer
					</button>
				</div>
			</div>
		</div>

		<div class="game-container">
			<div
				v-if="!gameStarted"
				class="start-screen"
			>
				<h1>🐍 SNAKE LEGEND 🐍</h1>
				<p class="subtitle">
					Tapez SNAKE pour débloquer des secrets...
				</p>

				<div class="skin-select">
					<h3>Choisir ton dauphin:</h3>
					<div class="skin-buttons">
						<button
							:class="['skin-btn', { active: selectedSkin === 'dolphin1' }]"
							@click="selectedSkin = 'dolphin1'"
						>
							<img
								v-if="imagesLoaded.dolphin1"
								:src="'/dolphin1.png'"
								alt="Dauphin 1"
								class="skin-preview"
							>
							<div
								v-else
								class="skin-placeholder"
							>
								🐬 Dauphin 1
							</div>
						</button>
						<button
							:class="['skin-btn', { active: selectedSkin === 'dolphin2' }]"
							@click="selectedSkin = 'dolphin2'"
						>
							<img
								v-if="imagesLoaded.dolphin2"
								:src="'/dolphin2.png'"
								alt="Dauphin 2"
								class="skin-preview"
							>
							<div
								v-else
								class="skin-placeholder"
							>
								🐬 Dauphin 2
							</div>
						</button>
					</div>
					<p
						v-if="!imagesLoaded.dolphin1 || !imagesLoaded.dolphin2"
						class="skin-note"
					>
						📁 Placez vos images dans public/dolphin1.png et public/dolphin2.png
					</p>
				</div>

				<div class="background-select">
					<h3>Choisir le fond marin:</h3>
					<div class="background-buttons">
						<button
							:class="['bg-btn', { active: selectedBackground === 'ocean' }]"
							@click="selectedBackground = 'ocean'"
						>
							🌊 Océan
						</button>
						<button
							:class="['bg-btn', { active: selectedBackground === 'deep' }]"
							@click="selectedBackground = 'deep'"
						>
							🌑 Profondeur
						</button>
						<button
							:class="['bg-btn', { active: selectedBackground === 'coral' }]"
							@click="selectedBackground = 'coral'"
						>
							🪸 Corail
						</button>
					</div>
				</div>

				<div class="difficulty-select">
					<h3>Choisir la difficulté:</h3>
					<div class="difficulty-buttons">
						<button
							v-for="diff in difficulties"
							:key="diff.name"
							:class="['difficulty-btn', { active: selectedDifficulty === diff.name }]"
							@click="selectDifficulty(diff)"
						>
							{{ diff.icon }} {{ diff.name }}
						</button>
					</div>
				</div>

				<button
					class="start-button"
					@click="startGame"
				>
					🚀 Commencer la Partie
				</button>
			</div>

			<div
				v-else-if="gameOver"
				class="game-over-screen"
			>
				<h2>💀 Game Over! 💀</h2>
				<p>Score final: <span class="final-score">{{ score }}</span></p>
				<button
					class="restart-button"
					@click="restartGame"
				>
					🔄 Rejouer
				</button>
			</div>

			<div
				v-else-if="gameWon"
				class="win-screen"
			>
				<h2>🏆 VICTOIRE ÉPIQUE! 🏆</h2>
				<p>Score final: <span class="final-score">{{ score }}</span></p>
				<p
					v-if="level > 1"
					class="level-up"
				>
					Niveau {{ level }} 🌟
				</p>
				<button
					class="restart-button"
					@click="nextLevel"
				>
					📈 Niveau Suivant
				</button>
				<button
					class="restart-button secondary"
					@click="restartGame"
				>
					🏠 Recommencer
				</button>
			</div>

			<div v-else>
				<div class="hud">
					<div class="score-board">
						<div class="stat">
							<span class="label">Score</span>
							<span class="value">{{ score }}</span>
						</div>
						<div class="stat">
							<span class="label">Niveau</span>
							<span class="value">{{ level }}</span>
						</div>
						<div
							v-if="godMode"
							class="stat"
						>
							<span class="label">👑 GOD MODE</span>
							<span class="value pulse">ACTIF</span>
						</div>
					</div>

					<div
						v-if="activePowerUp"
						class="powerup-display"
					>
						🌟 {{ activePowerUp.name }} ({{ activePowerUp.duration }}s)
					</div>
				</div>

				<canvas
					ref="gameCanvas"
					:width="canvasWidth"
					:height="canvasHeight"
					class="game-canvas"
					:class="{ neonMode }"
				/>

				<div class="particle-container">
					<div
						v-for="(particle, idx) in particles"
						:key="idx"
						class="particle"
						:style="{
							left: particle.x + 'px',
							top: particle.y + 'px',
							opacity: particle.life / particle.maxLife,
						}"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

// Canvas
const gameCanvas = ref<HTMLCanvasElement | null>(null);
const canvasWidth = 400;
const canvasHeight = 400;
const gridSize = 20;
const tileCount = canvasWidth / gridSize;

// Game state
const snake = ref<{ x: number; y: number }[]>([{ x: 10, y: 10 }]);
const direction = ref({ x: 0, y: 0 });
const nextDirection = ref({ x: 0, y: 0 });
const score = ref(0);
const level = ref(1);
const gameStarted = ref(false);
const gameOver = ref(false);
const gameWon = ref(false);
const gameLoopId = ref<number | null>(null);
const showSecretMenu = ref(false);
const secretKeyBuffer = ref('');
let lastFrameTime = 0;

// Game modes
const neonMode = ref(false);
const godMode = ref(false);
const speedChallenge = ref(false);
const selectedSkin = ref<'dolphin1' | 'dolphin2'>('dolphin1');
const selectedBackground = ref<'ocean' | 'deep' | 'coral'>('ocean');

// Images des dauphins
const dolphinImages = ref<{ dolphin1: HTMLImageElement | null; dolphin2: HTMLImageElement | null }>({
	dolphin1: null,
	dolphin2: null,
});
const imagesLoaded = ref<{ dolphin1: boolean; dolphin2: boolean }>({
	dolphin1: false,
	dolphin2: false,
});

// Difficulty system
const difficulties = [
	{ name: 'Facile', speed: 150, icon: '🟢' },
	{ name: 'Moyen', speed: 100, icon: '🟡' },
	{ name: 'Difficile', speed: 60, icon: '🔴' },
	{ name: 'Infernal', speed: 30, icon: '💀' },
];
const selectedDifficulty = ref('Moyen');
let gameSpeed = 100;

// Power-ups
interface PowerUp {
	name: string;
	duration: number;
	maxDuration: number;
	type: 'speed' | 'shield' | 'slow';
}
const activePowerUp = ref<PowerUp | null>(null);
const powerUps = [
	{ x: 0, y: 0, type: 'speed' as const },
	{ x: 0, y: 0, type: 'shield' as const },
	{ x: 0, y: 0, type: 'slow' as const },
];

// Particles
interface Particle {
	x: number;
	y: number;
	vx: number;
	vy: number;
	life: number;
	maxLife: number;
}
const particles = ref<Particle[]>([]);

// Food list for multiple food items
const foods = ref([{ x: 15, y: 15 }]);

const selectDifficulty = (diff: typeof difficulties[0]) => {
	selectedDifficulty.value = diff.name;
	gameSpeed = diff.speed;
};

const generateFood = () => {
	let newFood: { x: number; y: number } = { x: 0, y: 0 };
	let validPosition = false;

	while (!validPosition) {
		newFood = {
			x: Math.floor(Math.random() * tileCount),
			y: Math.floor(Math.random() * tileCount),
		};

		validPosition = !snake.value.some(
			segment => segment.x === newFood.x && segment.y === newFood.y,
		) && !foods.value.some(f => f.x === newFood.x && f.y === newFood.y);
	}

	foods.value.push(newFood);
};

const spawnPowerUp = () => {
	const selectedPowerUp = powerUps[Math.floor(Math.random() * powerUps.length)];
	if (!selectedPowerUp) return;
	const powerUpType = selectedPowerUp.type;
	let pos: { x: number; y: number };
	let valid = false;

	while (!valid) {
		pos = {
			x: Math.floor(Math.random() * tileCount),
			y: Math.floor(Math.random() * tileCount),
		};
		valid = !snake.value.some(s => s.x === pos.x && s.y === pos.y)
			&& !foods.value.some(f => f.x === pos.x && f.y === pos.y);
	}

	const duration = powerUpType === 'speed' ? 5 : powerUpType === 'shield' ? 8 : 6;
	activePowerUp.value = {
		name: powerUpType === 'speed' ? '⚡ Vitesse' : powerUpType === 'shield' ? '🛡️ Bouclier' : '🐢 Ralenti',
		duration,
		maxDuration: duration,
		type: powerUpType,
	};
};

const createParticles = (x: number, y: number) => {
	// Limite maximale de particules pour éviter les ralentissements
	if (particles.value.length > 50) return;

	// Réduit de 8 à 5 particules par explosion
	for (let i = 0; i < 5; i++) {
		particles.value.push({
			x: x * gridSize + gridSize / 2,
			y: y * gridSize + gridSize / 2,
			vx: (Math.random() - 0.5) * 4,
			vy: (Math.random() - 0.5) * 4,
			life: 20, // Réduit de 30 à 20 frames
			maxLife: 20,
		});
	}
};

const checkCollision = (head: { x: number; y: number }) => {
	if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
		return !godMode.value;
	}

	return snake.value.slice(1).some(segment => segment.x === head.x && segment.y === head.y);
};

const updateGame = () => {
	if (!gameStarted.value || gameOver.value || gameWon.value) return;

	direction.value = { ...nextDirection.value };

	if (direction.value.x === 0 && direction.value.y === 0) return;

	if (!snake.value[0]) return;
	const head: { x: number; y: number } = { x: snake.value[0].x, y: snake.value[0].y };
	head.x += direction.value.x;
	head.y += direction.value.y;

	if (godMode.value && (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount)) {
		head.x = (head.x + tileCount) % tileCount;
		head.y = (head.y + tileCount) % tileCount;
	}

	if (checkCollision(head)) {
		gameOver.value = true;
		return;
	}

	snake.value.unshift(head);

	// Check food collision
	const foodIndex = foods.value.findIndex(f => f.x === head.x && f.y === head.y);
	if (foodIndex !== -1) {
		// Ne pas retirer la queue - le snake grandit
		score.value++;
		createParticles(head.x, head.y);
		foods.value.splice(foodIndex, 1);
		generateFood();

		if (score.value % 5 === 0) {
			spawnPowerUp();
		}
	}
	else {
		// Retirer la queue seulement si on n'a pas mangé
		snake.value.pop();
	}

	// Update power-up
	if (activePowerUp.value) {
		activePowerUp.value.duration--;
		if (activePowerUp.value.duration <= 0) {
			activePowerUp.value = null;
		}
	}

	// Update particles
	particles.value = particles.value.filter((p) => {
		p.x += p.vx;
		p.y += p.vy;
		p.life--;
		return p.life > 0;
	});
};

const drawGame = () => {
	const canvas = gameCanvas.value;
	if (!canvas) return;

	const ctx = canvas.getContext('2d');
	if (!ctx) return;

	// Fond selon le thème sélectionné
	let bgColor, gridColor;
	switch (selectedBackground.value) {
		case 'ocean':
			bgColor = neonMode.value ? '#0a0a0f' : '#1a3a52';
			gridColor = neonMode.value ? 'rgba(0, 255, 255, 0.1)' : 'rgba(100, 200, 255, 0.15)';
			break;
		case 'deep':
			bgColor = neonMode.value ? '#000005' : '#0a0a1a';
			gridColor = neonMode.value ? 'rgba(0, 255, 255, 0.1)' : 'rgba(50, 50, 100, 0.2)';
			break;
		case 'coral':
			bgColor = neonMode.value ? '#0f0a0a' : '#2a1a3a';
			gridColor = neonMode.value ? 'rgba(255, 0, 255, 0.1)' : 'rgba(255, 100, 150, 0.15)';
			break;
		default:
			bgColor = neonMode.value ? '#0a0a0f' : '#1a1a2e';
			gridColor = neonMode.value ? 'rgba(0, 255, 255, 0.1)' : '#16213e';
	}

	ctx.fillStyle = bgColor;
	ctx.fillRect(0, 0, canvasWidth, canvasHeight);

	// Draw grid - une ligne par case jouable
	ctx.strokeStyle = gridColor;
	if (neonMode.value) {
		ctx.shadowColor = gridColor;
		ctx.shadowBlur = 3;
	}
	ctx.lineWidth = 1;
	// Grille complète - toutes les cases
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

	ctx.shadowBlur = 0;

	// Draw snake
	snake.value.forEach((segment, index) => {
		if (index === 0) {
			// Dessiner l'image du dauphin pour la tête
			const img = dolphinImages.value[selectedSkin.value];
			if (img && img.complete) {
				ctx.save();
				// Rotation selon la direction
				const angle = Math.atan2(direction.value.y, direction.value.x);
				ctx.translate(
					segment.x * gridSize + gridSize / 2,
					segment.y * gridSize + gridSize / 2,
				);
				ctx.rotate(angle);
				ctx.drawImage(
					img,
					-gridSize / 2,
					-gridSize / 2,
					gridSize,
					gridSize,
				);
				ctx.restore();
			}
			else {
				// Fallback si l'image n'est pas chargée
				if (neonMode.value) {
					ctx.fillStyle = '#00ffff';
					ctx.shadowColor = '#00ffff';
					ctx.shadowBlur = 20;
				}
				else {
					ctx.fillStyle = '#00ff88';
					ctx.shadowBlur = 10;
					ctx.shadowColor = '#00ff88';
				}
				ctx.fillRect(
					segment.x * gridSize + 1,
					segment.y * gridSize + 1,
					gridSize - 2,
					gridSize - 2,
				);
			}
		}
		else {
			// Couleur de la queue adaptée au fond
			let bodyColor;
			switch (selectedBackground.value) {
				case 'ocean':
					bodyColor = neonMode.value ? '#00ccff' : '#3399cc';
					break;
				case 'deep':
					bodyColor = neonMode.value ? '#6666ff' : '#4444aa';
					break;
				case 'coral':
					bodyColor = neonMode.value ? '#ff66ff' : '#cc66aa';
					break;
				default:
					bodyColor = neonMode.value ? '#0099ff' : '#0f3460';
			}
			ctx.fillStyle = bodyColor;
			ctx.shadowBlur = 0;
			ctx.fillRect(
				segment.x * gridSize + 1,
				segment.y * gridSize + 1,
				gridSize - 2,
				gridSize - 2,
			);
		}
	});

	// Draw food
	foods.value.forEach((f) => {
		ctx.fillStyle = neonMode.value ? '#ff00ff' : '#ff0066';
		ctx.shadowColor = ctx.fillStyle;
		ctx.shadowBlur = neonMode.value ? 20 : 15;
		ctx.beginPath();
		ctx.arc(
			f.x * gridSize + gridSize / 2,
			f.y * gridSize + gridSize / 2,
			gridSize / 2 - 2,
			0,
			Math.PI * 2,
		);
		ctx.fill();
	});

	ctx.shadowBlur = 0;
};

const gameLoop = () => {
	const now = Date.now();
	const elapsed = now - lastFrameTime;

	// Limite le framerate selon la vitesse du jeu
	if (elapsed >= gameSpeed) {
		lastFrameTime = now - (elapsed % gameSpeed);
		updateGame();
	}

	drawGame();
	gameLoopId.value = requestAnimationFrame(gameLoop);
};

const handleKeyPress = (event: KeyboardEvent) => {
	const key = event.key.toUpperCase();
	secretKeyBuffer.value += key;

	if (secretKeyBuffer.value.includes('SNAKE')) {
		showSecretMenu.value = true;
		secretKeyBuffer.value = '';
	}

	if (secretKeyBuffer.value.length > 10) {
		secretKeyBuffer.value = secretKeyBuffer.value.slice(-5);
	}

	if (!gameStarted.value) return;

	switch (key) {
		case 'ARROWUP':
			if (direction.value.y === 0) {
				nextDirection.value = { x: 0, y: -1 };
			}
			event.preventDefault();
			break;
		case 'ARROWDOWN':
			if (direction.value.y === 0) {
				nextDirection.value = { x: 0, y: 1 };
			}
			event.preventDefault();
			break;
		case 'ARROWLEFT':
			if (direction.value.x === 0) {
				nextDirection.value = { x: -1, y: 0 };
			}
			event.preventDefault();
			break;
		case 'ARROWRIGHT':
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
	foods.value = [{ x: 15, y: 15 }];
	activePowerUp.value = null;
	neonMode.value = false;
	godMode.value = false;
	speedChallenge.value = false;
	particles.value = [];
	lastFrameTime = Date.now();

	if (gameLoopId.value) {
		cancelAnimationFrame(gameLoopId.value);
	}

	gameLoopId.value = requestAnimationFrame(gameLoop);
};

const activateNeonMode = () => {
	neonMode.value = false; // Reset d'abord
	godMode.value = false;
	speedChallenge.value = false;
	showSecretMenu.value = false;
	startGame();
	neonMode.value = true; // Activer après startGame
};

const activateGodMode = () => {
	neonMode.value = false;
	godMode.value = false;
	speedChallenge.value = false;
	showSecretMenu.value = false;
	startGame();
	godMode.value = true; // Activer après startGame
};

const activateSpeedChallenge = () => {
	neonMode.value = false;
	godMode.value = false;
	speedChallenge.value = false;
	showSecretMenu.value = false;
	gameSpeed = 20;
	selectedDifficulty.value = 'Infernal';
	startGame();
	speedChallenge.value = true; // Activer après startGame
};

const closeSecret = () => {
	showSecretMenu.value = false;
};

const restartGame = () => {
	level.value = 1;
	gameWon.value = false;
	startGame();
};

const nextLevel = () => {
	level.value++;
	gameSpeed = Math.max(30, gameSpeed - 10);
	gameWon.value = false;
	startGame();
};

onMounted(() => {
	// Charger les images des dauphins
	const img1 = new Image();
	img1.src = '/dolphin1.png';
	img1.onload = () => {
		dolphinImages.value.dolphin1 = img1;
		imagesLoaded.value.dolphin1 = true;
	};
	img1.onerror = () => {
		imagesLoaded.value.dolphin1 = false;
	};

	const img2 = new Image();
	img2.src = '/dolphin2.png';
	img2.onload = () => {
		dolphinImages.value.dolphin2 = img2;
		imagesLoaded.value.dolphin2 = true;
	};
	img2.onerror = () => {
		imagesLoaded.value.dolphin2 = false;
	};

	window.addEventListener('keydown', handleKeyPress);
	if (gameCanvas.value) {
		drawGame();
	}
});

onUnmounted(() => {
	window.removeEventListener('keydown', handleKeyPress);
	if (gameLoopId.value) {
		cancelAnimationFrame(gameLoopId.value);
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
	position: relative;
	overflow: hidden;
}

.secret-menu {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 0.9);
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 1000;
	backdrop-filter: blur(10px);
}

.secret-content {
	text-align: center;
	animation: slideIn 0.5s ease;
}

.secret-content h2 {
	color: #00ff88;
	font-size: 3rem;
	margin-bottom: 2rem;
	text-shadow: 0 0 30px #00ff88;
	animation: pulse 1s infinite;
}

.secret-options {
	display: flex;
	gap: 2rem;
	flex-wrap: wrap;
	justify-content: center;
}

.secret-btn {
	padding: 1.5rem 2.5rem;
	font-size: 1.2rem;
	border: none;
	border-radius: 15px;
	cursor: pointer;
	font-weight: bold;
	transition: all 0.3s ease;
	text-transform: uppercase;
	letter-spacing: 2px;
}

.secret-btn.neon {
	background: linear-gradient(45deg, #00ffff, #ff00ff);
	color: white;
	box-shadow: 0 0 20px rgba(0, 255, 255, 0.5);
}

.secret-btn.god {
	background: linear-gradient(45deg, #ffaa00, #ff6600);
	color: white;
	box-shadow: 0 0 20px rgba(255, 170, 0, 0.5);
}

.secret-btn.speed {
	background: linear-gradient(45deg, #00ff88, #00ccff);
	color: white;
	box-shadow: 0 0 20px rgba(0, 255, 136, 0.5);
}

.secret-btn.close {
	background: rgba(255, 255, 255, 0.1);
	color: #ff0066;
	border: 2px solid #ff0066;
}

.secret-btn:hover {
	transform: scale(1.1);
	filter: brightness(1.3);
}

.game-container {
	position: relative;
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
	text-align: center;
}

.start-screen h1 {
	font-size: 4rem;
	margin-bottom: 0.5rem;
	text-shadow: 0 0 30px rgba(0, 255, 136, 0.5);
	animation: glow 2s ease-in-out infinite;
}

.subtitle {
	color: #00ff88;
	margin-bottom: 2rem;
	font-size: 1rem;
	opacity: 0.8;
}

.skin-select {
	margin: 2rem 0;
	padding: 2rem;
	background: rgba(0, 0, 0, 0.3);
	border-radius: 15px;
	border: 2px solid rgba(0, 255, 136, 0.3);
}

.skin-select h3 {
	color: white;
	margin-bottom: 1rem;
}

.skin-buttons {
	display: flex;
	gap: 1rem;
	justify-content: center;
	flex-wrap: wrap;
	margin-top: 1rem;
}

.skin-btn {
	padding: 0.5rem;
	border: 3px solid rgba(0, 255, 136, 0.5);
	background: rgba(0, 0, 0, 0.2);
	cursor: pointer;
	border-radius: 10px;
	transition: all 0.3s ease;
	width: 120px;
	height: 120px;
	display: flex;
	align-items: center;
	justify-content: center;
}

.skin-btn:hover {
	transform: scale(1.05);
	border-color: #00ff88;
	box-shadow: 0 0 20px rgba(0, 255, 136, 0.5);
}

.skin-btn.active {
	background: rgba(0, 255, 136, 0.2);
	border-color: #00ff88;
	box-shadow: 0 0 30px rgba(0, 255, 136, 0.8);
}

.skin-preview {
	width: 100%;
	height: 100%;
	object-fit: contain;
	border-radius: 5px;
}

.skin-placeholder {
	font-size: 1.5rem;
	color: white;
	text-align: center;
}

.skin-note {
	color: rgba(255, 255, 255, 0.6);
	font-size: 0.85rem;
	margin-top: 1rem;
	text-align: center;
}

.background-select {
	margin: 2rem 0;
	padding: 2rem;
	background: rgba(0, 0, 0, 0.3);
	border-radius: 15px;
	border: 2px solid rgba(0, 255, 136, 0.3);
}

.background-select h3 {
	color: white;
	margin-bottom: 1rem;
}

.background-buttons {
	display: flex;
	gap: 1rem;
	justify-content: center;
	flex-wrap: wrap;
	margin-top: 1rem;
}

.bg-btn {
	padding: 0.8rem 1.5rem;
	border: 2px solid rgba(0, 255, 136, 0.5);
	background: rgba(0, 0, 0, 0.2);
	color: white;
	cursor: pointer;
	border-radius: 10px;
	transition: all 0.3s ease;
	font-size: 1rem;
}

.bg-btn:hover {
	transform: scale(1.05);
	border-color: #00ff88;
	box-shadow: 0 0 20px rgba(0, 255, 136, 0.5);
}

.bg-btn.active {
	background: rgba(0, 255, 136, 0.2);
	border-color: #00ff88;
	box-shadow: 0 0 30px rgba(0, 255, 136, 0.8);
	transform: scale(1.1);
}

.difficulty-select {
	margin: 2rem 0;
	padding: 2rem;
	background: rgba(0, 0, 0, 0.3);
	border-radius: 15px;
	border: 2px solid rgba(0, 255, 136, 0.3);
}

.difficulty-buttons {
	display: flex;
	gap: 1rem;
	justify-content: center;
	flex-wrap: wrap;
	margin-top: 1rem;
}

.difficulty-btn {
	padding: 0.8rem 1.5rem;
	border: 2px solid rgba(0, 255, 136, 0.5);
	background: rgba(0, 0, 0, 0.2);
	color: white;
	cursor: pointer;
	border-radius: 10px;
	transition: all 0.3s ease;
	font-size: 1rem;
}

.difficulty-btn.active {
	background: linear-gradient(45deg, #00ff88, #00ccff);
	border-color: #00ff88;
	box-shadow: 0 0 15px rgba(0, 255, 136, 0.5);
}

.difficulty-btn:hover {
	transform: translateY(-2px);
	border-color: #00ff88;
}

.score-to-beat {
	font-size: 1.3rem;
	color: #ff00ff;
	text-shadow: 0 0 15px rgba(255, 0, 255, 0.5);
	margin: 2rem 0;
}

.start-button {
	margin-top: 2rem;
	padding: 1.2rem 3rem;
	font-size: 1.4rem;
	font-weight: bold;
	color: white;
	background: linear-gradient(45deg, #00ff88, #00ccff);
	border: none;
	border-radius: 50px;
	cursor: pointer;
	transition: all 0.3s ease;
	box-shadow: 0 4px 20px 0 rgba(0, 255, 136, 0.4);
	text-transform: uppercase;
	letter-spacing: 1px;
}

.start-button:hover {
	transform: translateY(-3px);
	box-shadow: 0 8px 30px 0 rgba(0, 255, 136, 0.6);
	filter: brightness(1.2);
}

.game-over-screen h2,
.win-screen h2 {
	font-size: 3.5rem;
	margin-bottom: 1.5rem;
	text-shadow: 0 0 30px rgba(0, 255, 136, 0.5);
	animation: bounce 0.6s ease;
}

.final-score {
	color: #ff00ff;
	font-size: 2.5rem;
	text-shadow: 0 0 15px rgba(255, 0, 255, 0.5);
}

.victory-text {
	font-size: 1.5rem;
	color: #ffaa00;
	margin: 1rem 0;
	animation: pulse 1s infinite;
}

.level-up {
	font-size: 1.3rem;
	color: #00ffff;
	text-shadow: 0 0 15px rgba(0, 255, 255, 0.5);
}

.restart-button {
	margin-top: 1.5rem;
	padding: 1rem 2.5rem;
	font-size: 1.2rem;
	font-weight: bold;
	color: white;
	background: linear-gradient(45deg, #00ff88, #00ccff);
	border: none;
	border-radius: 50px;
	cursor: pointer;
	transition: all 0.3s ease;
	box-shadow: 0 4px 15px 0 rgba(0, 255, 136, 0.3);
	margin-right: 1rem;
	text-transform: uppercase;
}

.restart-button.secondary {
	background: linear-gradient(45deg, #ff00ff, #ff0066);
	margin-right: 0;
}

.restart-button:hover {
	transform: translateY(-2px);
	box-shadow: 0 6px 20px 0 rgba(0, 255, 136, 0.5);
}

.hud {
	margin-bottom: 1.5rem;
}

.score-board {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
	gap: 1rem;
	padding: 1rem;
	background: rgba(0, 0, 0, 0.4);
	border-radius: 10px;
	border: 2px solid rgba(0, 255, 136, 0.3);
}

.stat {
	display: flex;
	flex-direction: column;
	align-items: center;
	color: white;
}

.stat .label {
	font-size: 0.9rem;
	color: #00ccff;
	opacity: 0.8;
}

.stat .value {
	font-size: 1.8rem;
	font-weight: bold;
	color: #00ff88;
	text-shadow: 0 0 10px rgba(0, 255, 136, 0.5);
}

.stat .value.pulse {
	animation: pulse 1s infinite;
}

.powerup-display {
	margin-top: 1rem;
	padding: 0.8rem;
	background: rgba(255, 0, 255, 0.2);
	border: 2px solid #ff00ff;
	border-radius: 8px;
	color: #ff00ff;
	text-shadow: 0 0 10px rgba(255, 0, 255, 0.5);
	font-weight: bold;
	text-align: center;
	animation: pulse 0.5s infinite;
}

.game-canvas {
	border: 3px solid #00ff88;
	border-radius: 10px;
	box-shadow: 0 0 30px rgba(0, 255, 136, 0.3);
	background: #1a1a2e;
	display: block;
	margin: 0 auto;
	image-rendering: pixelated;
}

.game-canvas.neonMode {
	border-color: #00ffff;
	box-shadow: 0 0 50px rgba(0, 255, 255, 0.5);
}

.particle-container {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	pointer-events: none;
}

.particle {
	position: absolute;
	width: 4px;
	height: 4px;
	background: #00ff88;
	border-radius: 50%;
	box-shadow: 0 0 5px #00ff88;
}

@keyframes glow {
	0%, 100% {
		text-shadow: 0 0 20px rgba(0, 255, 136, 0.5);
	}
	50% {
		text-shadow: 0 0 40px rgba(0, 255, 136, 0.8);
	}
}

@keyframes pulse {
	0%, 100% {
		opacity: 1;
	}
	50% {
		opacity: 0.6;
	}
}

@keyframes bounce {
	0%, 100% {
		transform: translateY(0);
	}
	50% {
		transform: translateY(-10px);
	}
}

@keyframes slideIn {
	from {
		opacity: 0;
		transform: scale(0.8);
	}
	to {
		opacity: 1;
		transform: scale(1);
	}
}
</style>
