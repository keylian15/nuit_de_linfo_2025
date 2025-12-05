<template>
	<UCheckboxGroup
		v-model="value"
		variant="card"
		indicator="hidden"
		:items="items"
	/>
	<UPageCard
		title="Pièces cassées"
		:description="desc"
		variant="soft"
	/>
</template>

<script setup>
const desc = ref('');
const items = ref(['Processeur', 'Carte Graphique', 'Mémoire Vive']);
const value = ref(['']);
watch(value, () => {
	desc.value = '';
	if (value.value.includes('Processeur')) {
		desc.value += '\nLe processeur est cassé';
	}
	if (value.value.includes('Carte Graphique')) {
		desc.value += '\nLa carte graphique est cassée';
	}
	if (value.value.includes('Mémoire Vive')) {
		desc.value += '\nLa mémoire vive est cassée';
	}
}, { deep: true });
</script>

<style>
</style>
