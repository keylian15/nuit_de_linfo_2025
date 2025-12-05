<template>
	<label for="select-list">Select<br></label>

	<select
		id="compo-select"
		v-model="optionSelected"
		name="compo"
	>
		<option value="">
			--Choisir une option--
		</option>
		<option value="compo1">
			Composant1
		</option>
		<option value="compo2">
			Composant2
		</option>
		<option value="compo3">
			Composant3
		</option>
		<option value="compo4">
			Composant4
		</option>
		<option value="compo5">
			Composant5
		</option>
		<option value="compo6">
			Composant6
		</option>
	</select>

	{{ optionSelected }}
</template>

<script setup>
const optionSelected = ref('');
</script>

<style>
h1 {
	color: #42b983;
}
</style>
