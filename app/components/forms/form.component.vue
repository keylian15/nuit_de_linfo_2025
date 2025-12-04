<template>
	<div class="form-container">
		<form @submit.prevent="handleSubmit">
			<div class="field-row">
				<div class="flex-field">
					<UFormField
						label="Nom *"
						:required="true"
					>
						<UInput
							v-model="nom"
							placeholder="Entrez votre nom de famille"
							@blur="validateNom"
						/>
					</UFormField>
					<p
						v-if="nomError"
						class="custom-error-message"
					>
						{{ nomError }}
					</p>
				</div>

				<div class="flex-field">
					<UFormField
						label="Année *"
						:required="true"
					>
						<select
							v-model="annee"
							class="native-select"
							@change="validateAnnee"
						>
							<option
								value=""
								disabled
								selected
							>
								Sélectionner une année
							</option>
							<option
								v-for="year in anneesDisponibles"
								:key="year"
								:value="year"
							>
								{{ year }}
							</option>
						</select>
					</UFormField>
					<p
						v-if="anneeError"
						class="custom-error-message"
					>
						{{ anneeError }}
					</p>
				</div>
			</div>

			<UDivider class="my-6" />

			<div class="field-row">
				<div class="flex-field">
					<UFormField
						label="Sexe *"
						:required="true"
					>
						<div class="sexe-options">
							<UCheckbox
								v-model="sexeFemme"
								label="Femme"
								class="custom-square-checkbox"
								@change="handleSexeChange('femme')"
							/>
							<UCheckbox
								v-model="sexeHomme"
								label="Homme"
								class="custom-square-checkbox"
								@change="handleSexeChange('homme')"
							/>
							<UCheckbox
								v-model="sexeNonBinaire"
								label="Non-binaire"
								class="custom-square-checkbox"
								@change="handleSexeChange('nonbinaire')"
							/>
						</div>
					</UFormField>
					<p
						v-if="sexeError"
						class="custom-error-message"
					>
						{{ sexeError }}
					</p>
				</div>

				<div class="flex-field">
					<UFormField
						label="Adresse Mail *"
						:required="true"
					>
						<UInput
							v-model="email"
							type="email"
							placeholder="exemple@domaine.fr"
							@blur="validateEmail"
						/>
					</UFormField>
					<p
						v-if="emailError"
						class="custom-error-message"
					>
						{{ emailError }}
					</p>
				</div>
			</div>

			<div class="submit-button-wrapper">
				<UButton
					type="submit"
					label="Valider"
					block
					color="primary"
				/>
			</div>
		</form>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// --- GÉNÉRATION DES ANNÉES (Inchagé) ---
const MIN_YEAR = 1950;
const MAX_YEAR = 2025;
const COUNT = 5;
function getRandomInt(min: number, max: number): number {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
function generateRandomYears(count: number): string[] {
	const years = new Set<number>();
	while (years.size < count) {
		years.add(getRandomInt(MIN_YEAR, MAX_YEAR));
	}
	return Array.from(years).map(year => String(year)).sort((a, b) => b.localeCompare(a));
}

const anneesDisponibles = ref<string[]>(generateRandomYears(COUNT));

// --- DATA DU FORMULAIRE ---
const nom = ref('');
const annee = ref<string>('');
const email = ref('');

// --- DATA Sexe (Checkboxes) ---
const sexeFemme = ref(false);
const sexeHomme = ref(false);
const sexeNonBinaire = ref(false);

// --- ÉTATS D'ERREUR ---
const nomError = ref<string | undefined>(undefined);
const anneeError = ref<string | undefined>(undefined);
const sexeError = ref<string | undefined>(undefined);
const emailError = ref<string | undefined>(undefined);

const requiredMessage = 'Ce champ est obligatoire.';

// --- LOGIQUE SPÉCIFIQUE DES CHECKBOXES SEXE (Radio Button Simulation) ---
type SexeType = 'femme' | 'homme' | 'nonbinaire';

function handleSexeChange(changed: SexeType) {
	// Si l'utilisateur coche une case, on décoche les autres
	if (changed === 'femme' && sexeFemme.value) {
		sexeHomme.value = false;
		sexeNonBinaire.value = false;
	}
	else if (changed === 'homme' && sexeHomme.value) {
		sexeFemme.value = false;
		sexeNonBinaire.value = false;
	}
	else if (changed === 'nonbinaire' && sexeNonBinaire.value) {
		sexeFemme.value = false;
		sexeHomme.value = false;
	}
	validateSexe();
}

// --- LOGIQUE DE VALIDATION ---

function validateNom() {
	nomError.value = nom.value.trim() === '' ? requiredMessage : undefined;
}

function validateAnnee() {
	anneeError.value = annee.value === '' ? requiredMessage : undefined;
}

function validateSexe() {
	const isChecked = sexeFemme.value || sexeHomme.value || sexeNonBinaire.value;
	sexeError.value = !isChecked ? 'Veuillez sélectionner une option.' : undefined;
}

function validateEmail() {
	if (email.value.trim() === '') {
		emailError.value = requiredMessage;
		return;
	}
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!emailRegex.test(email.value)) {
		emailError.value = 'Veuillez entrer une adresse e-mail valide.';
		return;
	}
	emailError.value = undefined;
}

function validateAll(): boolean {
	validateNom();
	validateAnnee();
	validateSexe();
	validateEmail();

	return !nomError.value && !anneeError.value && !sexeError.value && !emailError.value;
}

function handleSubmit() {
	if (validateAll()) {
		const sexe = sexeFemme.value ? 'Femme' : sexeHomme.value ? 'Homme' : 'Non-binaire';
		console.log('Formulaire valide. Données :', { nom: nom.value, annee: annee.value, sexe: sexe, email: email.value });
		alert('Formulaire envoyé avec succès!');
	}
	else {
		console.error('Veuillez corriger les erreurs.');
	}
}
</script>

<style scoped>
/*
 * Nouvelle approche CSS pour garantir un carré parfait en forçant la taille.
 */

/* 🚨 STYLE CRITIQUE POUR LES CASES CARRÉES */
.custom-square-checkbox :deep(.ring-gray-300),
.custom-square-checkbox :deep(.ring-primary-500),
.custom-square-checkbox :deep(.bg-white) { /* Ajout du ciblage du fond blanc si existant */
    /* Force le carré et supprime le rayon */
    width: 1rem !important;
    height: 1rem !important;
    border-radius: 0 !important;
    border: 1px solid #d1d5db !important;
    /* Assurez-vous que le fond est blanc lorsqu'il n'est PAS coché */
    background-color: white !important;
}

/* 🚨 Cache l'icône de coche par défaut lorsque la case est cochée (si elle est l'élément qui chevauche) */
.custom-square-checkbox :deep(.w-3.h-3) {
    /* Cache l'icône pour que seul le fond coloré du carré soit visible si coché */
    display: none !important;
}

/* --- Styles Généraux (Inchangés) --- */
.form-container {
    max-width: 600px;
    margin: 40px auto;
    padding: 24px;
    background-color: #ffffff;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.custom-error-message {
    color: #16a34a !important;
    font-size: 0.875rem;
    margin-top: 0.25rem;
}

.native-select {
    width: 100%;
    padding: 0.5rem 0.75rem;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    background-color: white;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    cursor: pointer;
    color: #1f2937;
    height: 2.5rem;
}

.field-row {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
    align-items: flex-start;
    margin-bottom: 16px;
}

.flex-field {
    flex: 1;
    min-width: 150px;
}

.sexe-options {
    display: flex;
    gap: 16px;
    margin-top: 0.5rem;
}

.submit-button-wrapper {
    flex-basis: 100%;
    margin-top: 20px;
}

@media (max-width: 480px) {
    .field-row {
        flex-direction: column;
        gap: 0;
    }
}
</style>
