<script setup>
const activeTab = ref('signin');

const switchToSignin = () => {
	activeTab.value = 'signin';
};

const switchToSignup = () => {
	activeTab.value = 'signup';
};
</script>

<template>
	<n-card>
		<n-tabs
			v-model:value="activeTab"
			class="card-tabs"
			size="large"
			animated
			pane-wrapper-style="margin: 0 -4px"
			pane-style="padding-left: 4px; padding-right: 4px; box-sizing: border-box;"
		>
			<n-tab-pane
				name="signin"
				tab="Sign in"
			>
				<SignIn />
				<div style="margin-top: 10px; text-align: center">
					No account?
					<n-button
						text
						type="primary"
						@click="switchToSignup"
					>
						Sign Up
					</n-button>
				</div>
			</n-tab-pane>

			<n-tab-pane
				name="signup"
				tab="Sign up"
			>
				<SignUp />
				<div style="margin-top: 10px; text-align: center">
					Already registered?
					<n-button
						text
						type="primary"
						@click="switchToSignin"
					>
						Sign in
					</n-button>
				</div>
			</n-tab-pane>
		</n-tabs>
	</n-card>
</template>

<style scoped>
.card-tabs .n-tabs-nav--bar-type {
  padding-left: 4px;
}
</style>
