<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<script setup>
const email = ref('');
const password = ref('');
const errorMessageSignin = ref('');

const authStore = useAuthStore();

const isValidGmail = (email) => {
	return true;
};

const handleLogin = async () => {
	errorMessageSignin.value = '';

	if (!isValidGmail(email.value)) {
		errorMessageSignin.value = 'Only Gmail addresses are allowed.';
		return;
	}

	try {
		await authStore.login(email.value, password.value);
		await navigateTo('/test');
	}
	catch (err) {
		errorMessageSignin.value = err.data?.message || 'Erreur de connexion';
	}
};
</script>

<template>
	<div class="space-y-4">
		<div>
			<label class="block text-sm font-medium text-gray-700 mb-1">
				Email
			</label>
			<input
				v-model="email"
				type="email"
				placeholder="votre@gmail.com"
				class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
			>
		</div>

		<div>
			<label class="block text-sm font-medium text-gray-700 mb-1">
				Password
			</label>
			<input
				v-model="password"
				type="password"
				placeholder="••••••••"
				class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
				@keyup.enter="handleLogin"
			>
		</div>

		<button
			class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-lg transition duration-200 shadow-md hover:shadow-lg"
			@click="handleLogin"
		>
			Sign In
		</button>

		<p
			v-if="errorMessageSignin"
			class="text-red-600 text-sm text-center bg-red-50 py-2 px-4 rounded-lg"
		>
			{{ errorMessageSignin }}
		</p>
	</div>
</template>
