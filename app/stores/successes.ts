import { defineStore } from 'pinia';
import { useAuthStore } from './auth';

export const useSuccessesStore = defineStore('successes', {
	state: () => ({
		list: [] as Array<{ id: number; name: string; description: string; date: string }>,
	}),
	actions: {
		async fetchSuccesses() {
			const auth = useAuthStore();
			if (!auth.token) return;

			const data = await $fetch('/api/success', {
				headers: { Authorization: `Bearer ${auth.token}` },
			});
			this.list = data;
		},
		async addSuccess(success: { name: string; description: string }) {
			const auth = useAuthStore();
			if (!auth.token) throw new Error('Non authentifié');

			const newSuccess = await $fetch('/api/success', {
				method: 'POST',
				headers: { Authorization: `Bearer ${auth.token}` },
				body: success,
			});
			this.list.push(newSuccess);
			return newSuccess;
		},
	},
});
