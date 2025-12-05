<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useGamesStore } from '@/stores/games';
import { useSuccessesStore } from '@/stores/successes';

const auth = useAuthStore();
const games = useGamesStore();
const successes = useSuccessesStore();

const testResults = ref<Array<{ test: string; status: 'success' | 'error' | 'pending'; message: string }>>([]);
const isRunning = ref(false);

// Vérification d'authentification au montage du composant
onBeforeMount(() => {
	if (!auth.token) {
		navigateTo('/login');
	}
});

function addResult(test: string, status: 'success' | 'error' | 'pending', message: string) {
	testResults.value.push({ test, status, message });
}

async function runAllTests() {
	testResults.value = [];
	isRunning.value = true;

	try {
		// Test 2 : Fetch Games
		addResult('Test 2', 'pending', 'Récupération des jeux...');
		try {
			await games.fetchGames();
			if (games.list.length > 0) {
				addResult('Test 2', 'success', `${games.list.length} jeu(x) récupéré(s) : ${games.list.map(g => g.title).join(', ')}`);
			}
			else {
				addResult('Test 2', 'error', 'Aucun jeu trouvé (la liste est vide)');
			}
		}
		catch (err: any) {
			addResult('Test 2', 'error', `Erreur lors de la récupération des jeux : ${err.message || err}`);
		}

		// Test 3 : Fetch Successes
		addResult('Test 3', 'pending', 'Récupération des succès...');
		try {
			await successes.fetchSuccesses();
			if (successes.list.length > 0) {
				addResult('Test 3', 'success', `${successes.list.length} succès récupéré(s) : ${successes.list.map(s => s.name).join(', ')}`);
			}
			else {
				addResult('Test 3', 'error', 'Aucun succès trouvé (la liste est vide)');
			}
		}
		catch (err: any) {
			addResult('Test 3', 'error', `Erreur lors de la récupération des succès : ${err.message || err}`);
		}

		// Test 4 : Vérifier le localStorage
		addResult('Test 4', 'pending', 'Vérification du localStorage...');
		try {
			const storedToken = localStorage.getItem('token');
			if (storedToken === auth.token) {
				addResult('Test 4', 'success', `Token correctement sauvegardé dans localStorage`);
			}
			else {
				addResult('Test 4', 'error', `Token localStorage (${storedToken?.substring(0, 20)}...) différent du store`);
			}
		}
		catch (err: any) {
			addResult('Test 4', 'error', `Erreur localStorage : ${err.message || err}`);
		}

		// Test 5 : Ajouter un succès
		addResult('Test 5', 'pending', 'Ajout d\'un nouveau succès...');
		try {
			const newSuccess = {
				name: 'Test Success',
				description: 'Succès créé lors du test',
			};
			await successes.addSuccess(newSuccess);
			addResult('Test 5', 'success', `Nouveau succès ajouté ! Total : ${successes.list.length}`);
		}
		catch (err: any) {
			addResult('Test 5', 'error', `Erreur lors de l'ajout du succès : ${err.message || err}`);
		}

		// Test 6 : Ajouter un jeu
		addResult('Test 6', 'pending', 'Ajout d\'un nouveau jeu...');
		try {
			const newGame = {
				title: 'Test Game',
				timer: 3600,
			};
			await games.addGame(newGame);
			addResult('Test 6', 'success', `Nouveau jeu ajouté ! Total : ${games.list.length}`);
		}
		catch (err: any) {
			addResult('Test 6', 'error', `Erreur lors de l'ajout du jeu : ${err.message || err}`);
		}
	}
	finally {
		isRunning.value = false;
	}
}

function clearTests() {
	testResults.value = [];
}

function logout() {
	auth.logout(); // Utilise la méthode du store
	games.list = [];
	successes.list = [];
	addResult('Logout', 'success', 'Déconnexion réussie');
	navigateTo('/login');
}
</script>

<template>
	<div v-if="auth.token">
		<div style="padding: 2rem; font-family: system-ui;">
			<h1>🧪 Tests des Stores</h1>

			<div style="margin: 2rem 0; display: flex; gap: 1rem;">
				<button
					:disabled="isRunning"
					style="padding: 0.75rem 1.5rem; background: #4CAF50; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 1rem;"
					:style="{ opacity: isRunning ? 0.5 : 1 }"
					@click="runAllTests"
				>
					{{ isRunning ? '⏳ Tests en cours...' : '▶️ Lancer tous les tests' }}
				</button>

				<button
					style="padding: 0.75rem 1.5rem; background: #2196F3; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 1rem;"
					@click="clearTests"
				>
					🗑️ Effacer les résultats
				</button>

				<button
					style="padding: 0.75rem 1.5rem; background: #f44336; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 1rem;"
					@click="logout"
				>
					🚪 Logout
				</button>
			</div>

			<!-- Résultats des tests -->
			<div
				v-if="testResults.length"
				style="margin-top: 2rem;"
			>
				<h2>📊 Résultats</h2>
				<div
					v-for="(result, index) in testResults"
					:key="index"
					style="padding: 1rem; margin: 0.5rem 0; border-radius: 4px; border-left: 4px solid;"
					:style="{
						backgroundColor: result.status === 'success' ? '#e8f5e9' : result.status === 'error' ? '#ffebee' : '#fff3e0',
						borderColor: result.status === 'success' ? '#4CAF50' : result.status === 'error' ? '#f44336' : '#ff9800',
					}"
				>
					<strong>{{ result.test }}</strong>
					<span
						style="margin-left: 1rem; padding: 0.25rem 0.5rem; border-radius: 3px; font-size: 0.875rem;"
						:style="{
							backgroundColor: result.status === 'success' ? '#4CAF50' : result.status === 'error' ? '#f44336' : '#ff9800',
							color: 'white',
						}"
					>
						{{ result.status === 'success' ? '✅ SUCCESS' : result.status === 'error' ? '❌ ERROR' : '⏳ PENDING' }}
					</span>
					<p style="margin: 0.5rem 0 0 0; color: #666;">
						{{ result.message }}
					</p>
				</div>
			</div>

			<!-- État actuel des stores -->
			<div style="margin-top: 3rem; display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem;">
				<!-- Auth Store -->
				<div style="padding: 1.5rem; background: #f5f5f5; border-radius: 8px;">
					<h3>👤 Auth Store</h3>
					<p><strong>Token:</strong> {{ auth.token ? auth.token.substring(0, 30) + '...' : '❌ Non connecté' }}</p>
					<p><strong>User:</strong> {{ auth.user?.username || '❌ Aucun' }}</p>
					<p><strong>Email:</strong> {{ auth.user?.email || '❌ Aucun' }}</p>
				</div>

				<!-- Games Store -->
				<div style="padding: 1.5rem; background: #f5f5f5; border-radius: 8px;">
					<h3>🎮 Games Store</h3>
					<p><strong>Nombre de jeux:</strong> {{ games.list.length }}</p>
					<ul style="margin: 0.5rem 0; padding-left: 1.5rem;">
						<li
							v-for="game in games.list"
							:key="game.id"
						>
							{{ game.title }} ({{ game.timer }}s)
						</li>
					</ul>
				</div>

				<!-- Successes Store -->
				<div style="padding: 1.5rem; background: #f5f5f5; border-radius: 8px;">
					<h3>🏆 Successes Store</h3>
					<p><strong>Nombre de succès:</strong> {{ successes.list.length }}</p>
					<ul style="margin: 0.5rem 0; padding-left: 1.5rem;">
						<li
							v-for="success in successes.list"
							:key="success.id"
						>
							{{ success.name }}
						</li>
					</ul>
				</div>
			</div>

			<!-- Instructions -->
			<div style="margin-top: 3rem; padding: 1.5rem; background: #e3f2fd; border-radius: 8px; border-left: 4px solid #2196F3;">
				<h3>📝 Instructions</h3>
				<ol>
					<li>Assure-toi que ton serveur est lancé (<code>npm run dev</code>)</li>
					<li>Vérifie que ton fichier <code>.env</code> contient <code>JWT_SECRET</code></li>
					<li>Exécute le seed : <code>npm run seed</code></li>
					<li>Clique sur "Lancer tous les tests"</li>
					<li>Vérifie les résultats ci-dessus</li>
				</ol>
			</div>
		</div>
	</div>
	<div v-else>
		<p style="margin: 2rem; text-align: center; font-size: 1.25rem;">
			Vous devez être connecté pour accéder à cette page.
		</p>
	</div>
</template>
