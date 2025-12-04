import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
	state: () => ({
		token: '',
		user: null as null | { id: number; email: string; username: string },
	}),
	actions: {
		setToken(token: string) {
			this.token = token;
			if (import.meta.client) localStorage.setItem('token', token);
		},
		setUser(user: { id: number; email: string; username: string }) {
			this.user = user;
		},
		logout() {
			this.token = '';
			this.user = null;
			if (import.meta.client) localStorage.removeItem('token');
		},
		async login(email: string, password: string) {
			const data = await $fetch('/api/auth/login', {
				method: 'POST',
				body: { email, password },
			});
			this.setToken(data.token);
			this.setUser(data.user);
		},
		async register(email: string, username: string, password: string) {
			const data = await $fetch('/api/auth/register', {
				method: 'POST',
				body: { email, username, password },
			});
			this.setToken(data.token);
			this.setUser(data.user);
		},
	},
});
