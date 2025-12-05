<template>
	<div class="defis-page">
		<!-- Blobs décoratifs animés -->
		<div
			class="decorative-blob animate-blob"
			style="top: 10%; left: 5%; width: 300px; height: 300px; background-color: rgba(144, 238, 144, 0.3);"
		/>
		<div
			class="decorative-blob animate-blob animation-delay-2000"
			style="top: 50%; right: 10%; width: 250px; height: 250px; background-color: rgba(255, 107, 107, 0.3);"
		/>
		<div
			class="decorative-blob animate-blob animation-delay-4000"
			style="bottom: 15%; left: 50%; width: 280px; height: 280px; background-color: rgba(96, 165, 250, 0.3);"
		/>

		<div class="header animate-fadeIn">
			<h1 class="text-shadow">
				🔥 Les défis relevés
			</h1>
			<div class="badge-national backdrop-blur-glass">
				On relève le <span class="highlight">défi national</span> :-)
			</div>
		</div>

		<div class="content card-hover animate-fadeIn animation-delay-200">
			<p class="subtitle">
				Les autres défis que nous relevons (5 max):
			</p>

			<ol class="defis-list">
				<li class="defi-item card-subtle-hover animate-slideInLeft animation-delay-200">
					<div class="defi-location">
						📍 Page formulaire
					</div>
					<div class="defi-content">
						<span class="defi-number">1.</span>
						<span class="defi-text">L'ergonomie : simplifier pour mieux vivre.</span>
					</div>
				</li>
				<li class="defi-item card-subtle-hover animate-slideInLeft animation-delay-400">
					<div class="defi-location">
						📍 Jeu Lasergame
					</div>
					<div class="defi-content">
						<span class="defi-number">2.</span>
						<span class="defi-text">
							On veut du gros pixel ! 🕹️ 🎮 👾 👻
						</span>
					</div>
				</li>
				<li class="defi-item card-subtle-hover animate-slideInLeft animation-delay-600">
					<div class="defi-location">
						📍 Tuer une pomme dans le jeu Lasergame
					</div>
					<div class="defi-content">
						<span class="defi-number">3.</span>
						<span class="defi-text">
							Hidden Snake 🐍
						</span>
					</div>
				</li>
				<li class="defi-item card-subtle-hover animate-slideInLeft animation-delay-1000">
					<div class="defi-location">
						📍 Page Principale
					</div>
					<div class="defi-content">
						<span class="defi-number">4.</span>
						<span class="defi-text">Podium de concours</span>
					</div>
				</li>
				<li class="defi-item card-subtle-hover animate-slideInLeft animation-delay-1000">
					<div class="defi-location">
						📍 Partie Lasergame
					</div>
					<div class="defi-content">
						<span class="defi-number">5.</span>
						<span class="defi-text">La zerguém de la nuit</span>
					</div>
				</li>
			</ol>

			<!-- Section Équipe -->
			<div class="team-section animate-fadeIn animation-delay-1000">
				<h3 class="defi-text">
					🎯 L'équipe derrière les défis
				</h3>
				<p class="defi-text">
					Les défis ont été réalisés par <strong>Turbé Keylian</strong>, <strong>Gabriel David</strong>,
					<strong>Guilmain Leny</strong>, <strong>Le Pallec Hippolyte</strong>, <strong>Siame Romain</strong>,
					<strong>Senicourt Florian</strong>, <strong>Delambre Aëryn</strong>, <strong>Mouronval
						Camille</strong>
					et <strong>Martel Léa</strong>.
				</p>
				<!-- Easter egg caché -->
				<div
					class="defi-text"
					title="Tu m'as trouvé ! 🎉"
				>
					<span class="defi-text">Fourny Valentin</span>
				</div>
			</div>

			<div class="footer-links animate-fadeIn animation-delay-1000">
				<a
					href="https://www.nuitdelinfo.com/inscription/defis/liste"
					target="_blank"
					rel="noopener"
					class="btn-primary icon-scale-hover focus-ring"
				>
					🔥 Liste des défis 2025 🔥
				</a>
			</div>
		</div>
	</div>
</template>

<style scoped>
/* ========================================
   KEYFRAMES LOCALES
   ======================================== */
@keyframes blob {

	0%,
	100% {
		transform: translate(0, 0) scale(1);
	}

	33% {
		transform: translate(30px, -50px) scale(1.1);
	}

	66% {
		transform: translate(-20px, 20px) scale(0.9);
	}
}

@keyframes fadeIn {
	from {
		opacity: 0;
		transform: translateY(20px);
	}

	to {
		opacity: 1;
		transform: translateY(0);
	}
}

@keyframes slideInLeft {
	from {
		opacity: 0;
		transform: translateX(-30px);
	}

	to {
		opacity: 1;
		transform: translateX(0);
	}
}

/* ========================================
   CLASSES UTILITAIRES
   ======================================== */
.animate-blob {
	animation: blob 7s infinite;
}

.animate-fadeIn {
	animation: fadeIn 0.6s ease-out;
}

.animate-slideInLeft {
	animation: slideInLeft 0.6s ease-out;
}

.animation-delay-200 {
	animation-delay: 0.2s;
}

.animation-delay-400 {
	animation-delay: 0.4s;
}

.animation-delay-600 {
	animation-delay: 0.6s;
}

.animation-delay-1000 {
	animation-delay: 1s;
}

.animation-delay-2000 {
	animation-delay: 2s;
}

.animation-delay-4000 {
	animation-delay: 4s;
}

.card-hover {
	transition: all 0.3s ease-in-out;
}

.card-subtle-hover {
	transition: all 0.3s ease-in-out;
}

.card-subtle-hover:hover {
	transform: translateY(-4px);
	box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
		0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.decorative-blob {
	position: absolute;
	border-radius: 9999px;
	mix-blend-mode: multiply;
	filter: blur(64px);
	opacity: 0.2;
	pointer-events: none;
}

.backdrop-blur-glass {
	backdrop-filter: blur(10px);
}

.text-shadow {
	text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.icon-scale-hover {
	transition: transform 0.3s ease-in-out;
}

.focus-ring:focus-visible {
	outline: 2px solid rgba(144, 238, 144, 0.8);
	outline-offset: 2px;
	border-radius: 50px;
}

/* ========================================
   STYLES DE LA PAGE
   ======================================== */
.defis-page {
	position: relative;
	min-height: 100vh;
	padding: 2rem;
	font-family: 'Arial', sans-serif;
	overflow: hidden;
}

.header {
	position: relative;
	z-index: 10;
	text-align: center;
	margin-bottom: 2rem;
}

.header h1 {
	color: white;
	font-size: 2.5rem;
	margin-bottom: 1rem;
}

.badge-national {
	display: inline-block;
	background: rgba(144, 238, 144, 0.3);
	border: 2px solid #90EE90;
	color: white;
	padding: 0.5rem 1.5rem;
	border-radius: 25px;
	font-size: 1rem;
}

.badge-national .highlight {
	color: #90EE90;
	font-weight: bold;
}

.content {
	position: relative;
	z-index: 10;
	max-width: 800px;
	margin: 0 auto;
	background: rgba(255, 255, 255, 0.95);
	border-radius: 20px;
	padding: 2rem;
	box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
}

.subtitle {
	color: #333;
	font-size: 1rem;
	margin-bottom: 1.5rem;
}

.defis-list {
	list-style: none;
	padding: 0;
	margin: 0;
}

.defi-item {
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	margin-bottom: 1.5rem;
	padding: 1rem;
	border-radius: 10px;
	background: rgba(30, 60, 114, 0.03);
	border-left: 4px solid #2a5298;
}

.defi-location {
	color: #1e3c72;
	font-size: 0.85rem;
	font-style: italic;
	opacity: 0.8;
}

.defi-content {
	display: flex;
	align-items: baseline;
	gap: 0.5rem;
}

.defi-number {
	color: #1e3c72;
	font-weight: bold;
	font-size: 1.1rem;
	min-width: 25px;
}

.defi-text {
	color: #2a5298;
	font-size: 1rem;
	flex: 1;
}

.footer-links {
	text-align: center;
	margin-top: 2rem;
	padding-top: 2rem;
	border-top: 2px solid rgba(30, 60, 114, 0.1);
}

.btn-primary {
	background: linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%);
	color: white;
	border: none;
	padding: 1rem 2rem;
	font-size: 1.1rem;
	font-weight: bold;
	border-radius: 50px;
	cursor: pointer;
	box-shadow: 0 5px 20px rgba(255, 107, 107, 0.3);
	transition: all 0.3s ease;
}

.btn-primary:hover {
	transform: translateY(-2px) scale(1.05);
	box-shadow: 0 8px 30px rgba(255, 107, 107, 0.5);
}

.btn-primary:active {
	transform: translateY(0) scale(1);
}

/* ========================================
   RESPONSIVE
   ======================================== */
@media (max-width: 768px) {
	.header h1 {
		font-size: 2rem;
	}

	.defis-page {
		padding: 1rem;
	}

	.content {
		padding: 1.5rem;
	}

	.decorative-blob {
		display: none;
		/* Masquer les blobs sur mobile pour les performances */
	}
}

@media (prefers-reduced-motion: reduce) {

	*,
	*::before,
	*::after {
		animation-duration: 0.01ms !important;
		animation-iteration-count: 1 !important;
		transition-duration: 0.01ms !important;
	}

	.decorative-blob {
		animation: none;
	}
}
</style>
