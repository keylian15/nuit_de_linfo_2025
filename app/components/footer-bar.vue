<script setup lang="ts">
const currentYear = computed(() => new Date().getFullYear());

const socialLinks = [
	{
		label: 'GitHub',
		to: 'https://github.com/keylian15/nuit_de_linfo_2025',
		icon: 'i-simple-icons-github',
		external: true,
	},
];
</script>

<template>
	<footer
		class="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900"
	>
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
			<!-- Section principale -->
			<div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
				<!-- À propos -->
				<div class="md:col-span-2">
					<div class="flex items-center gap-2 mb-4">
						<UIcon
							name="i-heroicons-sparkles"
							class="w-6 h-6 text-primary"
						/>
						<h3
							class="text-lg font-bold text-gray-900 dark:text-white"
						>
							Gamnirdfication
						</h3>
					</div>
					<p
						class="text-sm text-gray-600 dark:text-gray-400 mb-4 max-w-md"
					>
						Plateforme innovante de gamification pour rendre
						l'apprentissage plus amusant et engageant. Découvrez nos
						jeux éducatifs et progressez tout en vous amusant !
					</p>
					<div class="flex gap-3">
						<UButton
							v-for="link in socialLinks"
							:key="link.label"
							:to="link.to"
							:icon="link.icon"
							variant="ghost"
							size="sm"
							:external="link.external"
							:aria-label="link.label"
						/>
					</div>
				</div>

				<!-- Navigation rapide -->
				<div>
					<h4
						class="text-sm font-semibold text-gray-900 dark:text-white mb-4"
					>
						Navigation
					</h4>
					<ul class="space-y-3">
						<li>
							<ULink
								to="/"
								class="text-sm text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
							>
								Accueil
							</ULink>
						</li>
						<li>
							<ULink
								to="/nird"
								class="text-sm text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
							>
								Nird
							</ULink>
						</li>
						<li>
							<ULink
								to="/game"
								class="text-sm text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
							>
								Lasergame
							</ULink>
						</li>
					</ul>
				</div>

				<!-- Informations légales -->
				<div>
					<h4
						class="text-sm font-semibold text-gray-900 dark:text-white mb-4"
					>
						Légal
					</h4>
					<ul class="space-y-3">
						<li>
							<ULink
								to="/mentions"
								class="text-sm text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
							>
								<UIcon
									name="i-heroicons-document-text"
									class="w-4 h-4 inline-block mr-1"
								/>
								Mentions légales
							</ULink>
						</li>
						<li>
							<ULink
								to="mailto:contact@nird.example"
								class="text-sm text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
								external
							>
								<UIcon
									name="i-heroicons-envelope"
									class="w-4 h-4 inline-block mr-1"
								/>
								Contact
							</ULink>
						</li>
					</ul>
				</div>
			</div>

			<!-- Séparateur -->
			<UDivider class="my-6" />

			<!-- Copyright et hébergeur -->
			<div
				class="flex flex-col sm:flex-row justify-between items-center gap-4"
			>
				<div
					class="flex flex-col sm:flex-row items-center gap-2 text-sm text-gray-600 dark:text-gray-400"
				>
					<span>© {{ currentYear }} J'ai push dans le main</span>
					<span class="hidden sm:block">•</span>
					<span>Tous droits réservés</span>
				</div>

				<div class="flex items-center gap-2 text-sm">
					<UBadge
						color="gray"
						variant="subtle"
					>
						<UIcon
							name="i-heroicons-server"
							class="w-3 h-3"
						/>
						<span class="ml-1">Hébergé par
							<span class="font-semibold">TarzanHR</span></span>
					</UBadge>
				</div>
			</div>
		</div>
	</footer>
</template>
