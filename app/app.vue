<template>
	<header>
		<img
			src="../assets/logo.png"
			alt="Logo"
		>
		<h1> Nom site </h1>
		<li><a href="/accueil"> Accueil </a></li>
		<li><a href="/nird"> Nird </a></li>
		<li><a href="/lasergame"> Lasergame </a></li>
	</header>
  	<div>
		<NuxtPage />
	</div>
</template>

<script setup>
</script>

<style>
header {
	display: flex;
	align-items: center;
	justify-content: space-around;
	padding: 10px;
}
</style>
