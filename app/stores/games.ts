import { defineStore } from 'pinia';

export const useGamesStore = defineStore('games', {
	state: () => ({
		list: [] as Array<{ id: number; title: string; timer: number; date: string }>,
	}),
	actions: {
		async fetchGames() {
			const data = await $fetch('/api/games');
			this.list = data;
		},
		async addGame(game: { title: string; timer: number; date: string }) {
			const newGame = await $fetch('/api/games', {
				method: 'POST',
				body: game,
			});
			this.list.push(newGame);
		},
	},
});
