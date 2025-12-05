import { defineStore } from 'pinia';
import { useAuthStore } from './auth';

export const useGamesStore = defineStore('games', {
	state: () => ({
		list: [] as Array<{ id: number; title: string; timer: number; date: string }>,
	}),
	actions: {
		async fetchGames() {
			const auth = useAuthStore();
			if (!auth.token) return;

			const data = await $fetch('/api/games', {
				headers: { Authorization: `Bearer ${auth.token}` },
			});
			this.list = data;
		},
		async addGame(game: { title: string; timer: number }) {
			const auth = useAuthStore();
			if (!auth.token) throw new Error('Non authentifié');

			const newGame = await $fetch('/api/games', {
				method: 'POST',
				headers: { Authorization: `Bearer ${auth.token}` },
				body: game,
			});
			this.list.push(newGame);
			return newGame;
		},
	},
});
