<script setup lang="ts">
import type { SelectItem } from '@nuxt/ui';

const items = ref<SelectItem[]>([
	{
		label: 'Composant1',
		value: 'compo1',
	},
	{
		label: 'Composant2',
		value: 'compo2',
	},
	{
		label: 'Composant3',
		value: 'compo3',
	},
	{
		label: 'Composant4',
		value: 'compo4',
	},
]);
const value = ref('compo1');
</script>

<template>
	<div>
		<UApp>
			<USelect
				v-model="value"
				:items="items"
				class="w-48"
			/>
			Sélectionné : {{ value }}
		</UApp>
	</div>
</template>

<style>
</style>
