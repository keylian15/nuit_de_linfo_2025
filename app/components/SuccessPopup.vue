<template>
	<!-- Toast container -->
	<div
		v-if="show"
		class="fixed bottom-6 right-6 z-50 flex items-center gap-3
			bg-white dark:bg-slate-900 border border-green-300 dark:border-green-700
			shadow-xl rounded-xl px-4 py-3 w-64
			transform opacity-0 animate-toast"
	>
		<!-- Icône succès -->
		<div class="flex items-center justify-center w-10 h-10 rounded-full bg-green-500">
			<svg
				class="w-6 h-6 text-white"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M5 13l4 4L19 7"
				/>
			</svg>
		</div>

		<!-- Message -->
		<div class="text-sm font-medium text-gray-800 dark:text-gray-200">
			{{ message }}
		</div>
	</div>
</template>

<script setup>
import { watch } from 'vue';

const props = defineProps({
	show: { type: Boolean, default: false },
	message: { type: String, default: 'Action effectuée avec succès !' },
	duration: { type: Number, default: 2500 }, // plus court, style toast
});

const emit = defineEmits(['update:show']);

function close() {
	emit('update:show', false);
}

watch(
	() => props.show,
	(value) => {
		if (value && props.duration > 0) {
			setTimeout(() => close(), props.duration);
		}
	},
);
</script>

<style scoped>
@keyframes toast {
	0% {
		opacity: 0;
		transform: translateY(20px) scale(0.95);
	}
	100% {
		opacity: 1;
		transform: translateY(0) scale(1);
	}
}

.animate-toast {
	animation: toast 0.25s ease-out forwards;
}
</style>
