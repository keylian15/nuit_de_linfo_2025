<script setup>
const email = ref('');
const password = ref('');
const Second_password = ref('');
const errorMessageSignup = ref('');
const successMessageSignup = ref('');

const userStore = useUserStore();
const { success, message } = storeToRefs(userStore);

const isValidGmail = (email) => {
	return /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email);
};

const handleRegister = async () => {
	errorMessageSignup.value = '';

	if (!isValidGmail(email.value)) {
		errorMessageSignup.value = 'Only Gmail addresses are allowed.';
		return;
	}

	if (password.value !== Second_password.value) {
		errorMessageSignup.value = 'Same password required';
		return;
	}

	await userStore.register({
		email: email.value,
		password: password.value,
	});

	if (!success.value) {
		errorMessageSignup.value = message.value;
		return;
	}

	// Création réussie
	successMessageSignup.value = 'Compte créé ! Connectez-vous';
};
</script>

<template>
	<n-form>
		<n-form-item-row label="Email">
			<n-input v-model:value="email" />
		</n-form-item-row>
		<n-form-item-row label="Password">
			<n-input
				v-model:value="password"
				type="password"
			/>
		</n-form-item-row>
		<n-form-item-row label="Reenter Password">
			<n-input
				v-model:value="Second_password"
				type="password"
			/>
		</n-form-item-row>
	</n-form>
	<n-button
		type="primary"
		block
		secondary
		strong
		@click="handleRegister"
	>
		Sign up
	</n-button>
	<n-text
		v-if="errorMessageSignup"
		type="error"
	>
		{{ errorMessageSignup }}
	</n-text>
	<n-text
		v-if="successMessageSignup"
		type="success"
	>
		{{ successMessageSignup }}
	</n-text>
</template>
