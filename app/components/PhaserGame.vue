<template>
	<div
		ref="gameContainer"
		class="phaser-game-container"
	/>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import Phaser from 'phaser';

const gameContainer = ref<HTMLDivElement | null>(null);
let game: Phaser.Game | null = null;

class MissileGame extends Phaser.Scene {
	private player!: Phaser.GameObjects.Rectangle;
	private missiles!: Phaser.Physics.Arcade.Group;
	private enemies!: Phaser.Physics.Arcade.Group;
	private enemyMissiles!: Phaser.Physics.Arcade.Group;
	private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
	private score: number = 0;
	private scoreText!: Phaser.GameObjects.Text;

	constructor() {
		super({ key: 'MissileGame' });
	}

	create() {
		// Fond simple
		this.add.rectangle(400, 300, 800, 600, 0x1a1a2e);

		// Joueur (curseur en bas de l'écran)
		this.player = this.add.rectangle(400, 550, 60, 20, 0x00ff41);
		this.physics.add.existing(this.player);
		const playerBody = this.player.body as Phaser.Physics.Arcade.Body;
		playerBody.setCollideWorldBounds(true);

		// Groupe de missiles du joueur
		this.missiles = this.physics.add.group({
			defaultKey: 'missile',
			maxSize: 50,
		});

		// Groupe d'ennemis
		this.enemies = this.physics.add.group({
			defaultKey: 'enemy',
			maxSize: 20,
		});

		// Groupe de missiles ennemis
		this.enemyMissiles = this.physics.add.group({
			defaultKey: 'enemyMissile',
			maxSize: 50,
		});

		// Curseur clavier (optionnel, pour test)
		this.cursors = this.input.keyboard!.createCursorKeys();

		// Suivre la souris sur l'axe X
		this.input.on('pointermove', (pointer: Phaser.Input.Pointer) => {
			this.player.x = Phaser.Math.Clamp(pointer.x, 30, 770);
		});

		// Tirer avec clic ou espace
		this.input.on('pointerdown', () => {
			this.shootMissile();
		});

		this.input.keyboard!.on('keydown-SPACE', () => {
			this.shootMissile();
		});

		// Score
		this.scoreText = this.add.text(16, 16, 'Score: 0', {
			fontSize: '20px',
			color: '#00ff41',
		});

		// Bordures du monde pour les rebonds
		this.physics.world.setBoundsCollision(true, true, true, true);

		// Collisions
		this.physics.add.overlap(
			this.missiles,
			this.enemies,
			this.hitEnemy as Phaser.Types.Physics.Arcade.ArcadePhysicsCallback,
			undefined,
			this,
		);
		this.physics.add.overlap(
			this.player,
			this.enemyMissiles,
			this.hitPlayer as Phaser.Types.Physics.Arcade.ArcadePhysicsCallback,
			undefined,
			this,
		);

		// Spawn d'ennemis toutes les 2 secondes
		this.time.addEvent({
			delay: 2000,
			callback: this.spawnEnemy,
			callbackScope: this,
			loop: true,
		});
	}

	shootMissile() {
		const missile = this.add.rectangle(this.player.x, this.player.y - 20, 8, 20, 0xff6b6b);
		this.physics.add.existing(missile);

		const missileBody = missile.body as Phaser.Physics.Arcade.Body;
		missileBody.setBounce(1, 1);
		missileBody.setCollideWorldBounds(true);
		missileBody.setVelocity(0, -400);

		this.missiles.add(missile);

		// Détruire après 5 secondes
		this.time.delayedCall(5000, () => {
			if (missile.active) missile.destroy();
		});
	}

	spawnEnemy() {
		let x = Phaser.Math.Between(50, 750);
		const y = Phaser.Math.Between(50, 200);

		// Éviter de spawn trop proche du joueur
		const distToPlayer = Phaser.Math.Distance.Between(x, y, this.player.x, this.player.y);
		if (distToPlayer < 200) {
			x = this.player.x > 400 ? Phaser.Math.Between(50, 300) : Phaser.Math.Between(500, 750);
		}

		const enemy = this.add.rectangle(x, y, 40, 40, 0xff00ff);
		this.physics.add.existing(enemy);

		const enemyBody = enemy.body as Phaser.Physics.Arcade.Body;
		enemyBody.setCollideWorldBounds(true);
		enemyBody.setBounce(1, 1);

		// Vitesse horizontale aléatoire, vitesse verticale positive (vers le bas) ou nulle
		const velocityX = Phaser.Math.Between(-150, 150);
		const velocityY = Phaser.Math.Between(-50, 50); // Rester en haut
		enemyBody.setVelocity(velocityX, velocityY);

		this.enemies.add(enemy);

		enemy.setData('nextDirectionChange', this.time.now + Phaser.Math.Between(1000, 3000));
		enemy.setData('nextShot', this.time.now + Phaser.Math.Between(1000, 2500));
	}

	enemyShoot(enemy: Phaser.GameObjects.Rectangle) {
		const angle = Phaser.Math.Angle.Between(enemy.x, enemy.y, this.player.x, this.player.y);

		const missile = this.add.rectangle(enemy.x, enemy.y, 6, 15, 0xffff00);
		this.physics.add.existing(missile);

		const missileBody = missile.body as Phaser.Physics.Arcade.Body;
		missileBody.setVelocity(Math.cos(angle) * 250, Math.sin(angle) * 250);

		this.enemyMissiles.add(missile);

		// Détruire après 4 secondes
		this.time.delayedCall(4000, () => {
			if (missile.active) missile.destroy();
		});

		enemy.setData('nextShot', this.time.now + Phaser.Math.Between(1500, 3000));
	}

	hitEnemy(missile: Phaser.GameObjects.GameObject, enemy: Phaser.GameObjects.GameObject) {
		const missileRect = missile as Phaser.GameObjects.Rectangle;
		const enemyRect = enemy as Phaser.GameObjects.Rectangle;

		this.score += 10;
		this.scoreText.setText('Score: ' + this.score);

		missileRect.destroy();
		enemyRect.destroy();
	}

	hitPlayer(_player: Phaser.GameObjects.GameObject, missile: Phaser.GameObjects.GameObject) {
		const missileRect = missile as Phaser.GameObjects.Rectangle;
		this.cameras.main.shake(200, 0.01);
		missileRect.destroy();
	}

	update() {
		// Déplacement au clavier
		if (this.cursors.left.isDown) {
			this.player.x -= 5;
			this.player.x = Phaser.Math.Clamp(this.player.x, 30, 770);
		}
		else if (this.cursors.right.isDown) {
			this.player.x += 5;
			this.player.x = Phaser.Math.Clamp(this.player.x, 30, 770);
		}

		// Mise à jour des ennemis
		this.enemies.children.entries.forEach((enemyObj) => {
			const enemy = enemyObj as Phaser.GameObjects.Rectangle;
			const enemyBody = enemy.body as Phaser.Physics.Arcade.Body;

			// Empêcher les ennemis de descendre trop bas (zone du joueur)
			if (enemy.y > 350) {
				enemyBody.setVelocityY(-Math.abs(enemyBody.velocity.y));
			}

			// Changer de direction aléatoirement
			if (this.time.now > enemy.getData('nextDirectionChange')) {
				const newVelocityX = Phaser.Math.Between(-150, 150);
				const newVelocityY = Phaser.Math.Between(-80, 80);
				enemyBody.setVelocity(newVelocityX, newVelocityY);
				enemy.setData('nextDirectionChange', this.time.now + Phaser.Math.Between(1000, 3000));
			}

			// Tirer périodiquement
			if (this.time.now > enemy.getData('nextShot')) {
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
</style>
