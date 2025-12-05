<template>
	<div class="flex flex-col min-h-screen">
		<header-bar />
		<main class="flex-1">
			<slot />
		</main>
		<footer-bar />
	</div>
</template>
