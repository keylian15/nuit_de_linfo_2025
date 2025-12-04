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
	private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;

	constructor() {
		super({ key: 'MissileGame' });
	}

	create() {
		// Fond
		this.add.rectangle(400, 300, 800, 600, 0x1a1a2e);

		// Grille de fond
		const graphics = this.add.graphics();
		graphics.lineStyle(1, 0x16213e, 0.3);
		for (let i = 0; i < 800; i += 40) {
			graphics.lineBetween(i, 0, i, 600);
		}
		for (let i = 0; i < 600; i += 40) {
			graphics.lineBetween(0, i, 800, i);
		}

		// Joueur (curseur en bas de l'écran)
		this.player = this.add.rectangle(400, 550, 60, 20, 0x00ff41);
		this.physics.add.existing(this.player);
		const playerBody = this.player.body as Phaser.Physics.Arcade.Body;
		playerBody.setCollideWorldBounds(true);

		// Groupe de missiles
		this.missiles = this.physics.add.group({
			defaultKey: 'missile',
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

		// Instructions
		this.add.text(400, 30, 'Déplacez la souris pour bouger - Cliquez ou ESPACE pour tirer', {
			fontSize: '16px',
			color: '#a8dadc',
			fontFamily: 'Arial',
		}).setOrigin(0.5, 0);

		// Bordures du monde pour les rebonds
		this.physics.world.setBoundsCollision(true, true, true, true);
	}

	shootMissile() {
		// Créer un missile
		const missile = this.add.rectangle(this.player.x, this.player.y - 20, 8, 20, 0xff6b6b);
		this.physics.add.existing(missile);

		const missileBody = missile.body as Phaser.Physics.Arcade.Body;
		missileBody.setBounce(1, 1); // Rebond à 100%
		missileBody.setCollideWorldBounds(true);
		missileBody.setVelocity(0, -400); // Vitesse vers le haut

		this.missiles.add(missile);

		// Effet visuel de tir
		const flash = this.add.circle(this.player.x, this.player.y - 10, 15, 0xffffff, 0.8);
		this.tweens.add({
			targets: flash,
			alpha: 0,
			scale: 2,
			duration: 200,
			onComplete: () => flash.destroy(),
		});

		// Détruire le missile après 5 secondes
		this.time.delayedCall(5000, () => {
			if (missile.active) {
				this.destroyMissile(missile);
			}
		});
	}

	destroyMissile(missile: Phaser.GameObjects.Rectangle) {
		// Effet d'explosion
		const x = missile.x;
		const y = missile.y;

		const explosion = this.add.circle(x, y, 5, 0xff6b6b);
		this.tweens.add({
			targets: explosion,
			scale: 3,
			alpha: 0,
			duration: 300,
			onComplete: () => explosion.destroy(),
		});

		missile.destroy();
	}

	update() {
		// Optionnel: déplacement au clavier si besoin
		if (this.cursors.left.isDown) {
			this.player.x -= 5;
			this.player.x = Phaser.Math.Clamp(this.player.x, 30, 770);
		}
		else if (this.cursors.right.isDown) {
			this.player.x += 5;
			this.player.x = Phaser.Math.Clamp(this.player.x, 30, 770);
		}
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
