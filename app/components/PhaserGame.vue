<template>
	<div class="game-wrapper">
		<div
			ref="gameContainer"
			class="phaser-game-container"
		/>
		<div class="instructions">
			Cliquez pour capturer la souris (Échap pour quitter)
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import Phaser from 'phaser';

const gameContainer = ref<HTMLDivElement | null>(null);
let game: Phaser.Game | null = null;

class MissileGame extends Phaser.Scene {
	player!: Phaser.GameObjects.Rectangle;
	missiles!: Phaser.GameObjects.Graphics[];
	enemies!: Phaser.Physics.Arcade.Group;
	enemyMissiles!: Phaser.GameObjects.Graphics[];
	cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
	score = 0;
	scoreText!: Phaser.GameObjects.Text;
	explosionEmitter!: Phaser.GameObjects.Particles.ParticleEmitter;
	aimCursor!: Phaser.GameObjects.Container;

	constructor() {
		super({ key: 'MissileGame' });
	}

	preload() {
		// Charger l'image de l'ennemi
		this.load.image('enemy', '/enemy.png');
		// Charger l'image de la pomme
		this.load.image('apple', '/pomme.png');

		// Texture particule
		const particleGraph = this.make.graphics({ x: 0, y: 0, add: false });
		particleGraph.fillStyle(0xffffff, 1);
		particleGraph.fillCircle(4, 4, 4);
		particleGraph.generateTexture('particle', 8, 8);

		// Texture Viseur
		const cursorGraph = this.make.graphics({ x: 0, y: 0, add: false });
		cursorGraph.lineStyle(2, 0x00ff00, 1);
		cursorGraph.strokeCircle(16, 16, 10);
		cursorGraph.lineBetween(16, 2, 16, 10);
		cursorGraph.lineBetween(16, 22, 16, 30);
		cursorGraph.lineBetween(2, 16, 10, 16);
		cursorGraph.lineBetween(22, 16, 30, 16);
		cursorGraph.generateTexture('aimCursor', 32, 32);
	}

	create() {
		const width = this.scale.width;
		const height = this.scale.height;

		// Fond
		this.add.rectangle(width / 2, height / 2, width, height, 0x1a1a2e);

		// Initialiser les tableaux
		this.missiles = [];
		this.enemyMissiles = [];

		// Pointer Lock sécurisé
		this.input.on('pointerdown', () => {
			if (this.input.mouse && !this.input.mouse.locked) {
				this.input.mouse.requestPointerLock();
			}
			else {
				this.shootMissile();
			}
		});

		// Joueur
		this.player = this.add.rectangle(
			width / 2,
			height - 50,
			60,
			20,
			0x00ff41,
		);
		this.physics.add.existing(this.player);
		const playerBody = this.player.body as Phaser.Physics.Arcade.Body;
		playerBody.setCollideWorldBounds(true);
		playerBody.setImmovable(true);

		// Groupe d'ennemis (max 5)
		this.enemies = this.physics.add.group({
			maxSize: 5,
		});

		// Particules
		this.explosionEmitter = this.add.particles(0, 0, 'particle', {
			lifespan: 600,
			speed: { min: 50, max: 200 },
			scale: { start: 1, end: 0 },
			blendMode: 'ADD',
			emitting: false,
		});

		// Viseur
		const aimImg = this.add.image(0, 0, 'aimCursor');
		this.aimCursor = this.add.container(width / 2, height / 2, [aimImg]);
		this.aimCursor.setDepth(100);

		// Mouvement souris
		this.input.on('pointermove', (pointer: Phaser.Input.Pointer) => {
			if (this.input.mouse && this.input.mouse.locked) {
				this.aimCursor.x += pointer.movementX;
				this.aimCursor.y += pointer.movementY;

				// Clamp
				this.aimCursor.x = Phaser.Math.Clamp(
					this.aimCursor.x,
					0,
					width,
				);
				this.aimCursor.y = Phaser.Math.Clamp(
					this.aimCursor.y,
					0,
					height,
				);

				// Joueur suit X
				this.player.x = Phaser.Math.Clamp(
					this.aimCursor.x,
					30,
					width - 30,
				);
			}
		});

		// Clavier
		if (this.input.keyboard) {
			this.cursors = this.input.keyboard.createCursorKeys();
			this.input.keyboard.on('keydown-SPACE', () => {
				if (this.input.mouse && this.input.mouse.locked) {
					this.shootMissile();
				}
			});
		}

		// Score
		this.scoreText = this.add.text(16, 16, 'Score: 0', {
			fontSize: '20px',
			color: '#00ff41',
			fontFamily: 'Arial',
		});
		this.scoreText.setDepth(200);

		// Limites du monde physique
		this.physics.world.setBounds(0, 0, width, height);

		this.time.addEvent({
			delay: 2000,
			callback: this.spawnEnemy,
			callbackScope: this,
			loop: true,
		});
	}

	shootMissile() {
		const startX = this.player.x;
		const startY = this.player.y - 30;

		const missile = this.add.graphics();
		missile.fillStyle(0x00ffff, 1);
		missile.fillCircle(0, 0, 5);
		missile.x = startX;
		missile.y = startY;

		this.physics.add.existing(missile);
		const missileBody = missile.body as Phaser.Physics.Arcade.Body;

		const hitboxRadius = 15;
		missileBody.setCircle(hitboxRadius);
		missileBody.setOffset(-hitboxRadius, -hitboxRadius);

		const angle = Phaser.Math.Angle.Between(
			startX,
			startY,
			this.aimCursor.x,
			this.aimCursor.y,
		);

		const speed = 800;
		const vx = Math.cos(angle) * speed;
		const vy = Math.sin(angle) * speed;

		missileBody.setVelocity(vx, vy);
		this.missiles.push(missile);

		this.time.delayedCall(3000, () => {
			if (missile.active) {
				const index = this.missiles.indexOf(missile);
				if (index > -1) this.missiles.splice(index, 1);
				missile.destroy();
			}
		});
	}

	spawnEnemy() {
		if (this.enemies.getLength() >= 5) return;

		const width = this.scale.width;
		const height = this.scale.height;

		const x = Phaser.Math.Between(50, width - 50);
		const y = Phaser.Math.Between(50, Math.min(200, height / 3));

		if (
			Phaser.Math.Distance.Between(x, y, this.player.x, this.player.y)
			< 200
		)
			return;

		// 10% de chances de spawner une pomme
		const isApple = Math.random() < 0.1;
		const textureKey = isApple ? 'apple' : 'enemy';

		// Créer un sprite avec l'image
		const enemy = this.add.sprite(x, y, textureKey);
		enemy.setOrigin(0.5, 0.5);
		enemy.setDisplaySize(80, 80);

		this.physics.add.existing(enemy);

		const enemyBody = enemy.body as Phaser.Physics.Arcade.Body;
		enemyBody.setCollideWorldBounds(true);
		enemyBody.setBounce(1, 1);

		enemyBody.setVelocity(
			Phaser.Math.Between(-100, 100),
			Phaser.Math.Between(-50, 50),
		);

		this.enemies.add(enemy);

		// Marquer si c'est une pomme
		enemy.setData('isApple', isApple);
		enemy.setData(
			'nextDirectionChange',
			this.time.now + Phaser.Math.Between(1000, 3000),
		);
		enemy.setData(
			'nextShot',
			this.time.now + Phaser.Math.Between(1000, 2500),
		);
	}

	enemyShoot(enemy: Phaser.GameObjects.Sprite) {
		if (!enemy.active) return;

		const angle = Phaser.Math.Angle.Between(
			enemy.x,
			enemy.y,
			this.player.x,
			this.player.y,
		);

		const missile = this.add.graphics();
		missile.fillStyle(0xffff00, 1);
		missile.fillCircle(0, 0, 4);
		missile.x = enemy.x;
		missile.y = enemy.y;

		this.physics.add.existing(missile);
		const missileBody = missile.body as Phaser.Physics.Arcade.Body;

		const enemyMissileRadius = 4;
		missileBody.setCircle(enemyMissileRadius);
		// Centrer la hitbox sur le point (0,0) du graphics
		missileBody.setOffset(-enemyMissileRadius, -enemyMissileRadius);

		const speed = 300;
		const vx = Math.cos(angle) * speed;
		const vy = Math.sin(angle) * speed;

		missileBody.setVelocity(vx, vy);
		this.enemyMissiles.push(missile);

		this.time.delayedCall(5000, () => {
			if (missile.active) {
				const index = this.enemyMissiles.indexOf(missile);
				if (index > -1) this.enemyMissiles.splice(index, 1);
				missile.destroy();
			}
		});

		enemy.setData(
			'nextShot',
			this.time.now + Phaser.Math.Between(1500, 3000),
		);
	}

	override update() {
		const width = this.scale.width;
		const height = this.scale.height;

		// Collisions missiles du joueur
		this.missiles.forEach((missile) => {
			if (!missile.active) return;

			// Détruire si hors limites
			if (
				missile.x < -20
				|| missile.x > width + 20
				|| missile.y < -20
				|| missile.y > height + 20
			) {
				const index = this.missiles.indexOf(missile);
				if (index > -1) this.missiles.splice(index, 1);
				missile.destroy();
				return;
			}

			this.enemies.children.entries.forEach((enemyObj) => {
				const enemy = enemyObj as Phaser.GameObjects.Sprite;
				if (!enemy.active) return;

				if (this.physics.overlap(missile, enemy)) {
					this.hitEnemy(missile, enemy);
				}
			});
		});

		// Collisions missiles ennemis
		this.enemyMissiles.forEach((missile) => {
			if (!missile.active) return;

			// Détruire si hors limites
			if (
				missile.x < -20
				|| missile.x > width + 20
				|| missile.y < -20
				|| missile.y > height + 20
			) {
				const index = this.enemyMissiles.indexOf(missile);
				if (index > -1) this.enemyMissiles.splice(index, 1);
				missile.destroy();
				return;
			}

			if (this.physics.overlap(missile, this.player)) {
				this.hitPlayer(this.player, missile);
			}
		});

		// Mise à jour des ennemis
		this.enemies.children.entries.forEach((enemyObj) => {
			const enemy = enemyObj as Phaser.GameObjects.Sprite;
			if (!enemy.active) return;

			const enemyBody = enemy.body as Phaser.Physics.Arcade.Body;
			const isApple = enemy.getData('isApple') as boolean;

			// FORCER les ennemis à rester dans les limites
			if (enemy.x < 45) {
				enemy.x = 45;
				enemyBody.velocity.x = Math.abs(enemyBody.velocity.x);
			}
			if (enemy.x > width - 45) {
				enemy.x = width - 45;
				enemyBody.velocity.x = -Math.abs(enemyBody.velocity.x);
			}
			if (enemy.y < 45) {
				enemy.y = 45;
				enemyBody.velocity.y = Math.abs(enemyBody.velocity.y);
			}
			if (enemy.y > height * 0.6) {
				enemy.y = height * 0.6;
				enemyBody.velocity.y = -Math.abs(enemyBody.velocity.y);
			}

			// Changer de direction aléatoirement
			const nextChange = enemy.getData('nextDirectionChange') as number;
			if (this.time.now > nextChange) {
				enemyBody.setVelocity(
					Phaser.Math.Between(-150, 150),
					Phaser.Math.Between(-80, 80),
				);
				enemy.setData(
					'nextDirectionChange',
					this.time.now + Phaser.Math.Between(1000, 3000),
				);
			}

			// Tir des ennemis (sauf si c'est une pomme)
			if (!isApple) {
				const nextShot = enemy.getData('nextShot') as number;
				if (this.time.now > nextShot) {
					this.enemyShoot(enemy);
				}
			}
		});

		this.scoreText.setText(`Score: ${this.score}`);
	}

	hitEnemy(
		missile: Phaser.GameObjects.Graphics,
		enemy: Phaser.GameObjects.Sprite,
	) {
		const isApple = enemy.getData('isApple') as boolean;

		if (isApple) {
			// Si c'est une pomme, rediriger vers le snake game
			window.location.href = '/snake';
			return;
		}

		this.score += 10;

		this.explosionEmitter.setPosition(enemy.x, enemy.y);
		this.explosionEmitter.explode(20);

		const index = this.missiles.indexOf(missile);
		if (index > -1) this.missiles.splice(index, 1);

		missile.destroy();
		enemy.destroy();
	}

	hitPlayer(
		player: Phaser.GameObjects.Rectangle,
		missile: Phaser.GameObjects.Graphics,
	) {
		this.cameras.main.shake(200, 0.02);
		this.cameras.main.flash(200, 255, 0, 0);

		const index = this.enemyMissiles.indexOf(missile);
		if (index > -1) this.enemyMissiles.splice(index, 1);

		missile.destroy();
		this.score = Math.max(0, this.score - 5);
	}
}

onMounted(() => {
	if (gameContainer.value && !game) {
		const config: Phaser.Types.Core.GameConfig = {
			type: Phaser.AUTO,
			parent: gameContainer.value,
			backgroundColor: '#0f0f1e',
			scene: [MissileGame],
			physics: {
				default: 'arcade',
				arcade: {
					gravity: { y: 0, x: 0 },
					debug: false,
				},
			},
			scale: {
				mode: Phaser.Scale.RESIZE,
				width: '100%',
				height: '100%',
			},
		};
		game = new Phaser.Game(config);
	}
});

onBeforeUnmount(() => {
	if (game) {
		game.destroy(true);
		game = null;
	}
});
</script>

<style scoped>
.game-wrapper {
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	overflow: hidden;
	background: #0a0a0a;
}

.phaser-game-container {
	width: 100%;
	height: 100%;
}

.instructions {
	position: fixed;
	top: 20px;
	left: 50%;
	transform: translateX(-50%);
	color: white;
	font-family: Arial, sans-serif;
	background: rgba(0, 0, 0, 0.8);
	padding: 10px 20px;
	border-radius: 8px;
	pointer-events: none;
	z-index: 1000;
	border: 1px solid #00ff41;
}
</style>
