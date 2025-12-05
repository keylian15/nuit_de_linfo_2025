<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui';

const route = useRoute();
const items = computed<NavigationMenuItem[]>(() => [
	{
		label: 'Accueil',
		to: '/',
		active: route.path.startsWith('/'),
	},
	{
		label: 'Nird',
		to: '/nird',
		active: route.path.startsWith('/nird'),
	},
	{
		label: 'Lasergame',
		to: '/lasergame',
		active: route.path.startsWith('/lasergame'),
	},
]);
</script>

<template>
	<UHeader>
		<template #title>
			<Logo class="h-6 w-auto" />
		</template>

		<UNavigationMenu :items="items" />

		<template #right>
			<UColorModeButton />

			<UTooltip
				text="Open on GitHub"
				:kbds="['meta', 'G']"
			>
				<UButton
					color="neutral"
					variant="ghost"
					to="https://github.com/nuxt/ui"
					target="_blank"
					icon="i-simple-icons-github"
					aria-label="GitHub"
				/>
			</UTooltip>
		</template>
	</UHeader>
</template>
