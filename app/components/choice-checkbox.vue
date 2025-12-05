<template>
	<UTooltipProvider>
		<UApp>
			<div>
				<USelect
					v-model="componentValue"
					:items="componentItems"
					class="w-48"
				/>
				Sélectionné : {{ componentValue }}
			</div>
		</UApp>
	</UTooltipProvider>
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

const componentItems = ref([
	{ label: 'Composant1', value: 'compo1' },
	{ label: 'Composant2', value: 'compo2' },
	{ label: 'Composant3', value: 'compo3' },
	{ label: 'Composant4', value: 'compo4' },
]);
const componentValue = ref('compo1');
</script>
