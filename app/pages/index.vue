<template>
	<div class="home-page">
		<h1>Page d'accueil</h1>
		<nav class="nav-links">
			<NuxtLink
				to="/snake"
				class="snake-link"
			>
				🐍 Jouer au Snake
			</NuxtLink>
		</nav>
	</div>
</template>

<style scoped>
.home-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding: 2rem;
}

h1 {
    font-size: 2.5rem;
    margin-bottom: 2rem;
}

.nav-links {
    display: flex;
    gap: 1rem;
}

.snake-link {
    padding: 1rem 2rem;
    font-size: 1.5rem;
    background: linear-gradient(45deg, #00ff88, #00ccff);
    color: white;
    text-decoration: none;
    border-radius: 50px;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px 0 rgba(0, 255, 136, 0.3);
}

.snake-link:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px 0 rgba(0, 255, 136, 0.5);
}
</style>
