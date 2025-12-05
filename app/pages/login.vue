<script setup>
const activeTab = ref('signin');
</script>

<template>
	<div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
		<div class="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
			<!-- Titre -->
			<h1 class="text-3xl font-bold text-center text-gray-800 mb-6">
				Welcome
			</h1>

			<!-- Tabs -->
			<div class="flex border-b border-gray-200 mb-6">
				<button
					class="flex-1 py-3 text-center font-medium transition-colors"
					:class="activeTab === 'signin'
						? 'text-blue-600 border-b-2 border-blue-600'
						: 'text-gray-500 hover:text-gray-700'"
					@click="activeTab = 'signin'"
				>
					Sign In
				</button>
				<button
					class="flex-1 py-3 text-center font-medium transition-colors"
					:class="activeTab === 'signup'
						? 'text-blue-600 border-b-2 border-blue-600'
						: 'text-gray-500 hover:text-gray-700'"
					@click="activeTab = 'signup'"
				>
					Sign Up
				</button>
			</div>

			<!-- Contenu des tabs -->
			<div v-if="activeTab === 'signin'">
				<SignIn />
				<p class="text-center text-sm text-gray-600 mt-4">
					No account?
					<button
						class="text-blue-600 hover:text-blue-700 font-medium"
						@click="activeTab = 'signup'"
					>
						Sign Up
					</button>
				</p>
			</div>

			<div v-else>
				<SignUp />
				<p class="text-center text-sm text-gray-600 mt-4">
					Already registered?
					<button
						class="text-blue-600 hover:text-blue-700 font-medium"
						@click="activeTab = 'signin'"
					>
						Sign In
					</button>
				</p>
			</div>
		</div>
	</div>
</template>
