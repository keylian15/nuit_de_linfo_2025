import { defineStore } from 'pinia';

interface User {
	id: number;
	email: string;
	username: string;
}

export const useAuthStore = defineStore('auth', {
	state: () => ({
		token: '',
		user: null as User | null,
	}),
	actions: {
		setToken(token: string) {
			this.token = token;
			if (import.meta.client) localStorage.setItem('token', token);
		},
		setUser(user: User) {
			this.user = user;
		},
		async login(email: string, password: string) {
			const data = await $fetch('/api/auth/login', {
				method: 'POST',
				body: { email, password },
			});
			this.setToken(data.token);
			this.setUser(data.user);
		},
		async register(email: string, password: string) {
			await $fetch('/api/auth/register', {
				method: 'POST',
				body: { email, password },
			});
		},
		logout() {
			this.token = '';
			this.user = null;
			if (import.meta.client) {
				localStorage.removeItem('token');
			}
		},
	},
	getters: {
		isAuthenticated: state => !!state.token,
	},
});
