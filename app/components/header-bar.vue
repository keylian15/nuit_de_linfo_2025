<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui';
import { useAuthStore } from '@/stores/auth';

const route = useRoute();
const auth = useAuthStore();

const items = computed<NavigationMenuItem[]>(() => [
	{
		label: 'Accueil',
		to: '/',
		active: route.path === '/',
	},
	{
		label: 'Nird',
		to: '/nird',
		active: route.path.startsWith('/nird'),
	},
	{
		label: 'Lasergame',
		to: '/game',
		active: route.path.startsWith('/game'),
	},
	{
		label: 'Mentions légales',
		to: '/mentions',
		active: route.path === '/mentions',
	},
	{
		label: 'Formulaires',
		to: '/formulaire',
		active: route.path === '/formulaire',
	},
]);

// Charger le token depuis localStorage au montage
onMounted(() => {
	auth.initAuth();
});

const handleLogout = () => {
	auth.logout();
	navigateTo('/login');
};

const handleLogin = () => {
	navigateTo('/login');
};
</script>

<template>
	<UTooltipProvider>
		<UApp>
			<UHeader>
				<template #title>
					<Logo class="h-6 w-auto" />
				</template>

				<UNavigationMenu :items="items" />

				<template #right>
					<UColorModeButton />

					<!-- Bouton de connexion (si non connecté) -->
					<UButton
						v-if="!auth.token"
						icon="i-heroicons-arrow-right-on-rectangle"
						color="primary"
						variant="ghost"
						@click="handleLogin"
					>
						Se connecter
					</UButton>

					<!-- Informations utilisateur et déconnexion (si connecté) -->
					<div
						v-else
						class="flex items-center gap-2"
					>
						<UTooltip :text="`Connecté en tant que ${auth.user?.username || auth.user?.email}`">
							<UAvatar
								:alt="auth.user?.username"
								size="sm"
							/>
						</UTooltip>

						<UButton
							icon="i-heroicons-arrow-left-on-rectangle"
							color="error"
							variant="ghost"
							@click="handleLogout"
						>
							Déconnexion
						</UButton>
					</div>
				</template>
			</UHeader>
		</UApp>
	</UTooltipProvider>
</template>
