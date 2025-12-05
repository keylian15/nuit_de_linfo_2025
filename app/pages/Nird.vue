<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<script setup lang="ts">
import { ref } from 'vue';
import SuccessPopup from '@/../app/components/SuccessPopup.vue';

const success = ref(false);
</script>

<template>
	<div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-blue-950 dark:to-indigo-950">
		<!-- Hero Section -->
		<section class="relative overflow-hidden py-20 px-4">
			<div class="max-w-7xl mx-auto">
				<div class="text-center mb-16">
					<h1 class="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
						Bienvenue sur <span class="text-blue-600 dark:text-blue-400">NIRD</span>
					</h1>
					<p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
						Le projet <strong>Numérique Inclusif, Responsable et Durable</strong> :
						reconditionner, apprendre, partager et réduire l’impact du numérique.
					</p>
				</div>

				<!-- Actions NIRD Section -->
				<div class="mb-16">
					<div class="text-center mb-12">
						<h2 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
							Les Actions du Projet NIRD
						</h2>
						<p class="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
							Chaque action contribue à un numérique plus écologique, accessible et responsable.
						</p>
					</div>

					<!-- Grid -->
					<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
						<!-- Reconditionnement -->
						<div class="group relative bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
							<div class="absolute inset-0 bg-gradient-to-br from-green-400/20 to-emerald-600/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
							<div class="relative">
								<div class="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
									<svg
										class="w-8 h-8 text-white"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
										/>
									</svg>
								</div>
								<h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-3">
									Reconditionnement Informatique
								</h3>
								<p class="text-gray-600 dark:text-gray-300 mb-4">
									Donnez une seconde vie aux ordinateurs : nettoyage, remplacement
									de pièces, installation d'un système libre. Diminuez les déchets
									électroniques et rendez le numérique accessible à tous.
								</p>
							</div>
						</div>

						<!-- Logiciels Libres -->
						<div class="group relative bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
							<div class="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-cyan-600/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
							<div class="relative">
								<div class="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
									<svg
										class="w-8 h-8 text-white"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M13 10V3L4 14h7v7l9-11h-7z"
										/>
									</svg>
								</div>
								<h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-3">
									Promotion du Logiciel Libre
								</h3>
								<p class="text-gray-600 dark:text-gray-300 mb-4">
									Apprenez à installer et utiliser Linux, découvrez les outils libres,
									et participez à un numérique ouvert, transparent et durable.
								</p>
							</div>
						</div>

						<!-- Inclusion numérique -->
						<div class="group relative bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
							<div class="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-orange-600/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
							<div class="relative">
								<div class="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
									<svg
										class="w-8 h-8 text-white"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
										/>
									</svg>
								</div>
								<h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-3">
									Inclusion Numérique
								</h3>
								<p class="text-gray-600 dark:text-gray-300 mb-4">
									Accompagnez les personnes éloignées du numérique, expliquez
									les bases, aidez aux premières installations, et favorisez l’autonomie.
								</p>
							</div>
						</div>

						<!-- Sensibilisation -->
						<div class="group relative bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
							<div class="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-pink-600/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
							<div class="relative">
								<div class="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
									<svg
										class="w-8 h-8 text-white"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
										/>
									</svg>
								</div>
								<h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-3">
									Sensibilisation au Numérique Responsable
								</h3>
								<p class="text-gray-600 dark:text-gray-300 mb-4">
									Comprendre la consommation énergétique, l’empreinte carbone,
									les déchets électroniques, et apprendre à réduire son impact.
								</p>
							</div>
						</div>

						<!-- Réutilisation / seconde vie -->
						<div class="group relative bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
							<div class="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-teal-600/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
							<div class="relative">
								<div class="w-16 h-16 bg-cyan-500 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
									<svg
										class="w-8 h-8 text-white"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
										/>
									</svg>
								</div>
								<h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-3">
									Réutilisation & Seconde Vie
								</h3>
								<p class="text-gray-600 dark:text-gray-300 mb-4">
									Donner les machines réparées à des associations, familles ou élèves.
									Prolonger la durée de vie des appareils réduit massivement le coût écologique.
								</p>
							</div>
						</div>

						<!-- Transport écologique (optionnel, souvent fait dans NIRD) -->
						<div class="group relative bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
							<div class="absolute inset-0 bg-gradient-to-br from-lime-400/20 to-green-600/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
							<div class="relative">
								<div class="w-16 h-16 bg-lime-500 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
									<svg
										class="w-8 h-8 text-white"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
										/>
									</svg>
								</div>
								<h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-3">
									Livraisons Écologiques
								</h3>
								<p class="text-gray-600 dark:text-gray-300 mb-4">
									Certains projets NIRD livrent les ordinateurs reconditionnés à vélo :
									un geste symbolique et cohérent avec les valeurs écologiques du projet.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- Decorative blobs -->
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
</style>
