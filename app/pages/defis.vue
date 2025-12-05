<template>
	<div class="defis-page">
		<div class="header">
			<h1>🔥 Les défis relevés</h1>
			<div class="badge-national">
				On relève le <span class="highlight">défi national</span> :-)
			</div>
		</div>

		<div class="content">
			<p class="subtitle">
				Les autres défis que nous relevons (5 max):
			</p>

			<ol class="defis-list">
				<li class="defi-item">
					<div class="defi-location">
						📍 Page formulaire
					</div>
					<span class="defi-number">1.</span>
					<span class="defi-text">L'ergonomie : simplifier pour mieux vivre.</span>
				</li>
				<li class="defi-item">
					<div class="defi-location">
						📍 Jeu Lasergame
					</div>
					<span class="defi-number">2.</span>
					<span class="defi-text">
						On veut du gros pixel ! 🕹️ 🎮 👾 👻
					</span>
				</li>
				<li class="defi-item">
					<div class="defi-location">
						📍 Tuer une pomme dans le jeu Lasergame
					</div>
					<span class="defi-number">3.</span>
					<span class="defi-text">
						Hidden Snake 🐍
					</span>
				</li>
				<li class="defi-item">
					<div class="defi-location">
						📍 Page Principale
					</div>
					<span class="defi-number">4.</span>
					<span class="defi-text">Podium de concours</span>
				</li>
				<li class="defi-item">
					<div class="defi-location">
						📍 Partie Lasergame
					</div>
					<span class="defi-number">5.</span>
					<span class="defi-text">La zerguém de la nuit</span>
				</li>
			</ol>

			<div class="footer-links">
				<button class="btn-primary">
					🔥 Liste des défis 2025 🔥
				</button>
			</div>
		</div>
	</div>
</template>

<style scoped>
.defis-page {
	min-height: 100vh;
	background: linear-gradient(135deg, #1e3c72 0%, #2a5298 50%, #7e8ba3 100%);
	padding: 2rem;
	font-family: 'Arial', sans-serif;
}

.header {
	text-align: center;
	margin-bottom: 2rem;
}

.header h1 {
	color: white;
	font-size: 2.5rem;
	margin-bottom: 1rem;
	text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.badge-national {
	display: inline-block;
	background: rgba(144, 238, 144, 0.3);
	border: 2px solid #90EE90;
	color: white;
	padding: 0.5rem 1.5rem;
	border-radius: 25px;
	font-size: 1rem;
	backdrop-filter: blur(10px);
}

.badge-national .highlight {
	color: #90EE90;
	font-weight: bold;
}

.content {
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
	counter-reset: defi-counter;
}

.defi-item {
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	margin-bottom: 1.5rem;
	padding: 0.75rem;
	border-radius: 10px;
}

.defi-location {
	color: #1e3c72;
	font-size: 0.85rem;
	font-style: italic;
	margin-bottom: 0.25rem;
	opacity: 0.8;
}

.defi-number {
	color: #1e3c72;
	font-weight: bold;
	font-size: 1.1rem;
	min-width: 25px;
	display: inline;
}

.defi-text {
	color: #2a5298;
	font-size: 1rem;
	flex: 1;
	display: inline;
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
	transform: translateY(-2px);
	box-shadow: 0 8px 30px rgba(255, 107, 107, 0.5);
}

.btn-primary:active {
	transform: translateY(0);
}
</style>
