<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<script setup lang="ts">
import { ref } from 'vue';
import SuccessPopup from '@/../app/components/SuccessPopup.vue';

const updatedAt = '5 décembre 2025';
const siteName = 'Gamnirdfication';
const company = 'J\'ai push dans le main';
const email = 'keylian59555@gmail.com';
</script>

<template>
	<div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-blue-950 dark:to-indigo-950">
		<section class="relative overflow-hidden py-20 px-4">
			<div class="max-w-5xl mx-auto">
				<div class="text-center mb-12">
					<h1 class="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
						Mentions Légales
					</h1>
					<p class="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
						Informations légales concernant le site <strong class="text-blue-600 dark:text-blue-400">{{ siteName }}</strong>.
					</p>
				</div>

				<div class="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg">
					<article class="prose dark:prose-invert max-w-none">
						<h2>1. Éditeur du site</h2>
						<p>
							Le site est édité par <strong>{{ company }}</strong>.
						</p>

						<h2>2. Directeur de la publication</h2>
						<p>
							Le directeur de la publication est le représentant légal de l'association.
						</p>

						<h2>3. Hébergeur</h2>
						<p>
							Le site est hébergé par <strong>TarzanHR</strong>.
						</p>

						<h2>4. Propriété intellectuelle</h2>
						<p>
							L'ensemble des éléments (textes, images, logos, icônes, vidéos)
							présents sur ce site sont la propriété de leurs auteurs respectifs
							ou sont utilisés sous licence. Toute reproduction totale ou partielle
							est interdite sans autorisation.
						</p>

						<h2>5. Données personnelles</h2>
						<p>
							Les données collectées sur ce site sont traitées conformément
							au RGPD. Pour toute question relative à vos données personnelles,
							contactez-nous à :
							<a
								class="text-blue-600 dark:text-blue-400"
								:href="`mailto:${email}`"
							>{{ email }}</a>
						</p>

						<h2>6. Cookies et traceurs</h2>
						<p>
							Ce site n'utilise pas de cookies ni de traceurs propriétaires
							ou tiers. Aucune information personnelle n'est collectée via
							des cookies lors de la navigation sur ce site.
						</p>

						<h2>7. Liens vers des sites externes</h2>
						<p>
							Ce site ne contient pas de liens vers des sites externes.
							Aucun contenu externe (iframe, embeds) n'est intégré sur ce site.
						</p>

						<h2>8. Accessibilité</h2>
						<p>
							Nous nous efforçons de rendre ce site accessible. Si vous
							rencontrez des difficultés d'accès, merci de contacter
							<a
								class="text-blue-600 dark:text-blue-400"
								:href="`mailto:${email}`"
							>{{ email }}</a>.
						</p>

						<h2>9. Conditions d'utilisation</h2>
						<p>
							L'utilisation du site implique l'acceptation pleine et entière
							des présentes mentions légales.
						</p>

						<p class="text-sm text-gray-500 dark:text-gray-400 mt-6">
							Dernière mise à jour : {{ updatedAt }}
						</p>
					</article>
				</div>
			</div>

			<!-- Decorative blobs (preserved for brand identity) -->
			<div class="absolute top-20 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
			<div class="absolute top-40 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
			<div class="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" />
		</section>
	</div>
</template>

<style scoped>
@keyframes blob {
	0%, 100% {
		transform: translate(0, 0) scale(1);
	}
	33% {
		transform: translate(30px, -50px) scale(1.1);
	}
	66% {
		transform: translate(-20px, 20px) scale(0.9);
	}
}

.animate-blob {
	animation: blob 7s infinite;
}

.animation-delay-2000 {
	animation-delay: 2s;
}

.animation-delay-4000 {
	animation-delay: 4s;
}

.prose h2 {
	margin-top: 1.25rem;
	margin-bottom: 0.5rem;
}

/* Keep text readable on dark background */
article.prose p {
	color: inherit;
}
</style>
