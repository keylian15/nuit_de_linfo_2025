<template>
	<div
		ref="gameContainer"
		class="phaser-game-container"
	/>
	<div class="instructions">
		Cliquez pour capturer la souris (Échap pour quitter)
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import Phaser from 'phaser';

// Variables Vue
const gameContainer = ref<HTMLDivElement | null>(null);
let game: Phaser.Game | null = null;

class MissileGame extends Phaser.Scene {
	// Déclarations simplifiées sans 'private' pour éviter les conflits de parsing
	player!: Phaser.GameObjects.Rectangle;
	missiles!: Phaser.Physics.Arcade.Group;
	enemies!: Phaser.Physics.Arcade.Group;
	enemyMissiles!: Phaser.Physics.Arcade.Group;
	cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
	score = 0;
	scoreText!: Phaser.GameObjects.Text;
	explosionEmitter!: Phaser.GameObjects.Particles.ParticleEmitter;
	aimCursor!: Phaser.GameObjects.Container;

	constructor() {
		super({ key: 'MissileGame' });
	}

	preload() {
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
		this.add.rectangle(400, 300, 800, 600, 0x1a1a2e);

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
		this.player = this.add.rectangle(400, 550, 60, 20, 0x00ff41);
		this.physics.add.existing(this.player);
		const playerBody = this.player.body as Phaser.Physics.Arcade.Body;
		playerBody.setCollideWorldBounds(true);
		playerBody.setImmovable(true);

		// Groupes
		this.missiles = this.physics.add.group({
			defaultKey: 'missile',
			maxSize: 50,
		});
		this.enemies = this.physics.add.group({
			defaultKey: 'enemy',
			maxSize: 20,
		});
		this.enemyMissiles = this.physics.add.group({
			defaultKey: 'enemyMissile',
			maxSize: 50,
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
		this.aimCursor = this.add.container(400, 300, [aimImg]);
		this.aimCursor.setDepth(100);

		// Mouvement souris
		this.input.on('pointermove', (pointer: Phaser.Input.Pointer) => {
			if (this.input.mouse && this.input.mouse.locked) {
				this.aimCursor.x += pointer.movementX;
				this.aimCursor.y += pointer.movementY;

				// Clamp manuel
				if (this.aimCursor.x < 0) this.aimCursor.x = 0;
				if (this.aimCursor.x > 800) this.aimCursor.x = 800;
				if (this.aimCursor.y < 0) this.aimCursor.y = 0;
				if (this.aimCursor.y > 600) this.aimCursor.y = 600;

				// Joueur suit X
				let targetX = this.aimCursor.x;
				if (targetX < 30) targetX = 30;
				if (targetX > 770) targetX = 770;
				this.player.x = targetX;
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

		this.physics.world.setBoundsCollision(true, true, true, true);

		// Collisions : Fonction fléchée pour éviter les problèmes de binding
		this.physics.add.overlap(this.missiles, this.enemies, (obj1, obj2) => {
			this.hitEnemy(obj1, obj2);
		});
		this.physics.add.overlap(
			this.player,
			this.enemyMissiles,
			(obj1, obj2) => {
				this.hitPlayer(obj1, obj2);
			},
		);

		this.time.addEvent({
			delay: 1500,
			callback: this.spawnEnemy,
			callbackScope: this,
			loop: true,
		});
	}

	shootMissile() {
		const missile = this.add.rectangle(
			this.aimCursor.x,
			this.aimCursor.y,
			4,
			25,
			0x00ffff,
		);
		this.physics.add.existing(missile);

		const missileBody = missile.body as Phaser.Physics.Arcade.Body;
		missileBody.setBounce(1, 1);
		missileBody.setCollideWorldBounds(true);
		missileBody.setVelocity(0, -600);
		missileBody.setVelocityX(Phaser.Math.Between(-50, 50));

		this.missiles.add(missile);

		this.time.delayedCall(4000, () => {
			if (missile.active) missile.destroy();
		});
	}

	spawnEnemy() {
		const x = Phaser.Math.Between(50, 750);
		const y = Phaser.Math.Between(50, 200);

		if (
			Phaser.Math.Distance.Between(x, y, this.player.x, this.player.y)
			< 200
		)
			return;

		const enemy = this.add.rectangle(x, y, 40, 40, 0xff00ff);
		this.physics.add.existing(enemy);

		const enemyBody = enemy.body as Phaser.Physics.Arcade.Body;
		enemyBody.setCollideWorldBounds(true);
		enemyBody.setBounce(1, 1);
		enemyBody.setVelocity(
			Phaser.Math.Between(-150, 150),
			Phaser.Math.Between(-50, 50),
		);

		this.enemies.add(enemy);

		enemy.setData(
			'nextDirectionChange',
			this.time.now + Phaser.Math.Between(1000, 3000),
		);
		enemy.setData(
			'nextShot',
			this.time.now + Phaser.Math.Between(1000, 2500),
		);
	}

	enemyShoot(enemy: Phaser.GameObjects.Rectangle) {
		if (!enemy.active) return;

		const angle = Phaser.Math.Angle.Between(
			enemy.x,
			enemy.y,
			this.player.x,
			this.player.y,
		);
		const missile = this.add.rectangle(enemy.x, enemy.y, 6, 15, 0xffff00);
		this.physics.add.existing(missile);

		const missileBody = missile.body as Phaser.Physics.Arcade.Body;
		missileBody.setVelocity(Math.cos(angle) * 250, Math.sin(angle) * 250);

		this.enemyMissiles.add(missile);

		this.time.delayedCall(4000, () => {
			if (missile.active) missile.destroy();
		});

		enemy.setData(
			'nextShot',
			this.time.now + Phaser.Math.Between(1500, 3000),
		);
	}

	hitEnemy(obj1: any, obj2: any) {
		const missile = obj1 as Phaser.GameObjects.Rectangle;
		const enemy = obj2 as Phaser.GameObjects.Rectangle;

		this.score += 10;
		this.scoreText.setText('Score: ' + this.score);

		this.explosionEmitter.setPosition(enemy.x, enemy.y);
		this.explosionEmitter.explode(20);

		missile.destroy();
		enemy.destroy();
	}

	hitPlayer(player: any, missile: any) {
		const missileRect = missile as Phaser.GameObjects.Rectangle;
		this.cameras.main.shake(200, 0.02);
		this.cameras.main.flash(200, 255, 0, 0);
		missileRect.destroy();
	}

	override update() {
		this.enemies.children.entries.forEach((enemyObj) => {
			const enemy = enemyObj as Phaser.GameObjects.Rectangle;
			if (!enemy.active) return;

			const enemyBody = enemy.body as Phaser.Physics.Arcade.Body;

			if (enemy.y > 350) {
				enemyBody.setVelocityY(-Math.abs(enemyBody.velocity.y));
			}

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

			const nextShot = enemy.getData('nextShot') as number;
			if (this.time.now > nextShot) {
				this.enemyShoot(enemy);
			}
		});
	}
}

onMounted(() => {
	if (gameContainer.value && !game) {
		const config: Phaser.Types.Core.GameConfig = {
			type: Phaser.AUTO,
			width: 800,
			height: 600,
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
.phaser-game-container {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
	background: #0a0a0a;
}
.instructions {
	position: absolute;
	top: 10px;
	left: 50%;
	transform: translateX(-50%);
	color: white;
	font-family: Arial, sans-serif;
	background: rgba(0, 0, 0, 0.5);
	padding: 5px 10px;
	border-radius: 4px;
	pointer-events: none;
}
</style>
