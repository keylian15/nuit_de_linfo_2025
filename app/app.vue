<script setup lang="ts">
import { ref, onMounted } from 'vue';

const token = ref('');

onMounted(async () => {
	try {
		const data = await $fetch('/api/auth/login', {
			method: 'POST',
			body: { email: 'test@example.com', password: 'password' },
		});
		token.value = data.token;
		localStorage.setItem('token', token.value);
	}
	catch (err) {
		console.error('Erreur login:', err);
	}
});
</script>

<template>
	<div>
		<h1>Token récupéré :</h1>
		<p v-if="token">
			{{ token }}
		</p>
		<p v-else>
			Connexion en cours...
		</p>
	</div>
</template>
