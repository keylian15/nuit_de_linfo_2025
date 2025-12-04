<template>
	<div class="app-layout">
		<header class="app-header">
			<nav class="navigation">
				<NuxtLink
					to="/"
					class="nav-link"
				>
					🏠 Accueil
				</NuxtLink>
				<NuxtLink
					to="/snake"
					class="nav-link"
				>
					🐍 Snake
				</NuxtLink>
			</nav>
		</header>

		<main class="main-content">
			<slot />
		</main>
	</div>
</template>

<style scoped>
.app-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-header {
  background: linear-gradient(90deg, #0f2027 0%, #203a43 50%, #2c5364 100%);
  padding: 1rem 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  position: sticky;
  top: 0;
  z-index: 100;
}

.navigation {
  display: flex;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.nav-link {
  color: white;
  text-decoration: none;
  font-size: 1.2rem;
  font-weight: 600;
  padding: 0.5rem 1.5rem;
  border-radius: 25px;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid transparent;
}

.nav-link:hover {
  background: rgba(0, 255, 136, 0.2);
  border-color: #00ff88;
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(0, 255, 136, 0.3);
}

.nav-link.router-link-active {
  background: linear-gradient(45deg, #00ff88, #00ccff);
  box-shadow: 0 4px 15px rgba(0, 255, 136, 0.4);
}

.main-content {
  flex: 1;
}
</style>
