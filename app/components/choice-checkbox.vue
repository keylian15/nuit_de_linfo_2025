<template>
	<div>
		<li>
			<input
				v-model="checking"
				type="checkbox"
				value="t1"
				class="check1"
			>
			<label for="check1" />
			<input
				v-model="checking"
				type="checkbox"
				value="t2"
				class="check2"
			>
			<label for="check2" />
		</li>
	</div>
	{{ text1 }}
	{{ text2 }}
</template>

<script setup>
const checking = ref([]);
const text1 = ref('');
const text2 = ref('');
if (text1.value in checking.value) {
	text1.value = 'text1';
}
else {
	text1.value = '';
}
if (text2.value in checking.value) {
	text2.value = 'text2';
}
else {
	text2.value = '';
}
</script>

<style>
</style>
