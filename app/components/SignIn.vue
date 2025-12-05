<script setup>
const email = ref('');
const password = ref('');
const errorMessageSignin = ref('');
const successMessageSignup = ref('');

const userStore = useUserStore();
const { success, message, token, userId } = storeToRefs(userStore);

// Cookies pour l'authentification (SSR-friendly)
const tokenCookie = useCookie('token');
const userIdCookie = useCookie('userId');

const isValidGmail = (email) => {
	return /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email);
};

const handleLogin = async () => {
	errorMessageSignin.value = '';

	if (!isValidGmail(email.value)) {
		errorMessageSignin.value = 'Only Gmail addresses are allowed.';
		return;
	}

	await userStore.login({
		email: email.value,
		password: password.value,
	});

	if (!success.value) {
		errorMessageSignin.value = message.value;
		return;
	}

	// Connexion réussie - stockage en cookies
	tokenCookie.value = token.value;
	userIdCookie.value = userId.value;

	await navigateTo('/deck-builder');
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
	</n-form>
	<n-button
		type="primary"
		block
		secondary
		strong
		@click="handleLogin"
	>
		Sign In
	</n-button>
	<n-text
		v-if="errorMessageSignin"
		type="error"
	>
		{{ errorMessageSignin }}
	</n-text>
	<n-text
		v-if="successMessageSignup"
		type="success"
	>
		{{ successMessageSignup }}
	</n-text>
</template>
