<template>
	<div class="game-page">
		<h1>Mon Jeu Phaser</h1>
		<ClientOnly>
			<PhaserGame />
		</ClientOnly>
	</div>
</template>

<script setup lang="ts">
// Phaser ne fonctionne que côté client, donc on utilise ClientOnly
</script>

<style scoped>
.game-page {
	padding: 2rem;
	text-align: center;
}

h1 {
	margin-bottom: 2rem;
	color: #2c3e50;
}
</style>
