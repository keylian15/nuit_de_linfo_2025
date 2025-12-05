<script setup>
const email = ref('');
const password = ref('');
const Second_password = ref('');
const errorMessageSignup = ref('');
const successMessageSignup = ref('');

const authStore = useAuthStore();

const isValidGmail = (email) => {
	return /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email);
};

const handleRegister = async () => {
	errorMessageSignup.value = '';
	successMessageSignup.value = '';

	if (!isValidGmail(email.value)) {
		errorMessageSignup.value = 'Only Gmail addresses are allowed.';
		return;
	}

	if (password.value !== Second_password.value) {
		errorMessageSignup.value = 'Same password required';
		return;
	}

	try {
		await authStore.register(email.value, password.value);

		successMessageSignup.value = 'Compte créé ! Connectez-vous';

		// Réinitialiser les champs
		email.value = '';
		password.value = '';
		Second_password.value = '';
	}
	catch (err) {
		errorMessageSignup.value = err.data?.message || 'Erreur lors de la création du compte';
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
			>
		</div>

		<div>
			<label class="block text-sm font-medium text-gray-700 mb-1">
				Reenter Password
			</label>
			<input
				v-model="Second_password"
				type="password"
				placeholder="••••••••"
				class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
				@keyup.enter="handleRegister"
			>
		</div>

		<button
			class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-lg transition duration-200 shadow-md hover:shadow-lg"
			@click="handleRegister"
		>
			Sign up
		</button>

		<p
			v-if="errorMessageSignup"
			class="text-red-600 text-sm text-center bg-red-50 py-2 px-4 rounded-lg"
		>
			{{ errorMessageSignup }}
		</p>

		<p
			v-if="successMessageSignup"
			class="text-green-600 text-sm text-center bg-green-50 py-2 px-4 rounded-lg"
		>
			{{ successMessageSignup }}
		</p>
	</div>
</template>
