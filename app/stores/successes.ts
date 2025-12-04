import { defineStore } from 'pinia';

export const useSuccessesStore = defineStore('successes', {
	state: () => ({
		list: [] as Array<{ id: number; name: string; description: string; date: string }>,
	}),
	actions: {
		async fetchSuccesses() {
			const data = await $fetch('/api/success');
			this.list = data;
		},
		async addSuccess(success: { name: string; description: string; date: string }) {
			const newSuccess = await $fetch('/api/success', {
				method: 'POST',
				body: success,
			});
			this.list.push(newSuccess);
		},
	},
});
