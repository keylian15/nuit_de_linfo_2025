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

// Scène d'exemple
class ExampleScene extends Phaser.Scene {
	constructor() {
		super({ key: 'ExampleScene' });
	}

	preload() {
		// Chargez vos assets ici
		// this.load.image('logo', '/assets/logo.png');
	}

	create() {
		// Créez votre jeu ici
		this.add.text(400, 300, 'Phaser + Nuxt!', {
			fontSize: '32px',
			color: '#ffffff',
		}).setOrigin(0.5);

		// Exemple: ajoutez un cercle cliquable
		const circle = this.add.circle(400, 400, 50, 0x6699ff);
		circle.setInteractive();
		circle.on('pointerdown', () => {
			console.log('Circle clicked!');
		});
	}

	update() {
		// Logique de mise à jour du jeu
	}
}

onMounted(() => {
	if (gameContainer.value && !game) {
		const config: Phaser.Types.Core.GameConfig = {
			type: Phaser.AUTO,
			width: 800,
			height: 600,
			parent: gameContainer.value,
			backgroundColor: '#282c34',
			scene: [ExampleScene],
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
}
</style>
