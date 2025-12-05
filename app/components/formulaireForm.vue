<template>
	<div class="form-container">
		<form @submit.prevent="handleSubmit">
			<div class="field-row">
				<div class="flex-field">
					<UFormField
						label="Nom"
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
						label="Année"
						:required="true"
					>
						<div class="year-container">
							<div class="year-inputs">
								<input
									v-for="(digit, index) in yearDigits"
									:key="index"
									type="number"
									:value="digit"
									class="year-digit-input"
									:class="{ animating: isAnimating }"
									readonly
									min="0"
									max="9"
								>
							</div>
							<button
								type="button"
								class="spin-btn"
								:disabled="isAnimating"
								@click="animateYear"
							>
								🎲
							</button>
						</div>
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
						label="Sexe"
						:required="true"
					>
						<div class="sexe-options">
							<UCheckbox
								v-model="sexeFemme"
								label="Femme"
								class="custom-square-checkbox"
								@change="handleSexeChange()"
							/>
							<UCheckbox
								v-model="sexeHomme"
								label="Homme"
								class="custom-square-checkbox"
								@change="handleSexeChange()"
							/>
							<UCheckbox
								v-model="sexeNonBinaire"
								label="Non-binaire"
								class="custom-square-checkbox"
								@change="handleSexeChange()"
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
						label="Adresse Mail"
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

			<div class="field-row">
				<div class="flex-field">
					<UFormField
						label="Prénom"
						:required="true"
					>
						<UInput
							v-model="prenom"
							placeholder="Entrez votre prénom"
							@blur="validatePrenom"
						/>
					</UFormField>
					<p
						v-if="prenomError"
						class="custom-error-message"
					>
						{{ prenomError }}
					</p>
				</div>
				<div class="flex-field">
					<UFormField
						label="Âge"
						:required="true"
					>
						<UInput
							v-model="age"
							placeholder="âge en mois"
							@blur="validateAge"
						/>
					</UFormField>
					<p
						v-if="ageError"
						class="custom-error-message"
					>
						{{ ageError }}
					</p>
				</div>
			</div>

			<div class="field-row">
				<div class="flex-field">
					<UFormField
						label="Mot de passe"
						:required="true"
					>
						<UInput
							v-model="mdp"
							placeholder="mot de passe"
							@blur="validateMdp"
						/>
					</UFormField>
					<p
						v-if="mdpError"
						class="custom-error-message"
					>
						{{ mdpError }}
					</p>
				</div>
				<div class="flex-field">
					<UFormField
						label="Verification mot de passe"
						:required="true"
					>
						<UInput
							v-model="mdp_verif"
							placeholder="essap ed tom"
							@blur="validateMdp_verif"
						/>
					</UFormField>
					<p
						v-if="mdp_verifError"
						class="custom-error-message"
					>
						{{ mdp_verifError }}
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
import { ref, onMounted } from 'vue';

const MIN_YEAR = 1700;
const MAX_YEAR = 2025;

function getRandomInt(min: number, max: number): number {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function inverser(inputString: string) {
	const reversedString = inputString.split('').reverse().join('');
	console.log(reversedString);
	return reversedString;
}

const yearDigits = ref<number[]>([0, 0, 0, 0]);
const isAnimating = ref(false);
const annee = ref<string>('');

function animateYear() {
	isAnimating.value = true;
	const targetYear = getRandomInt(MIN_YEAR, MAX_YEAR);
	const targetDigits = String(targetYear)
		.split('')
		.map(d => parseInt(d));

	let frame = 0;
	const totalFrames = 30;

	const interval = setInterval(() => {
		if (frame >= totalFrames) {
			yearDigits.value = targetDigits;
			annee.value = String(targetYear);
			isAnimating.value = false;
			validateAnnee();
			clearInterval(interval);
		}
		else {
			yearDigits.value = yearDigits.value.map(() => getRandomInt(0, 9));
			frame++;
		}
	}, 50);
}

onMounted(() => {
	animateYear();
});

const nom = ref('');
const prenom = ref('');
const age = ref('');
const email = ref('');
const mdp = ref('');
const mdp_verif = ref('');

const sexeFemme = ref(false);
const sexeHomme = ref(false);
const sexeNonBinaire = ref(false);

const nomError = ref<string | undefined>(undefined);
const ageError = ref<string | undefined>(undefined);
const prenomError = ref<string | undefined>(undefined);
const anneeError = ref<string | undefined>(undefined);
const sexeError = ref<string | undefined>(undefined);
const emailError = ref<string | undefined>(undefined);
const mdpError = ref<string | undefined>(undefined);
const mdp_verifError = ref<string | undefined>(undefined);

const requiredMessage = 'Ce champ est obligatoire.';

function handleSexeChange() {
	// Comportement aléatoire frustrant : 1/3 de chance pour chaque option
	const randomChoice = Math.floor(Math.random() * 3);

	if (randomChoice === 0) {
		// Sélectionne Femme
		sexeFemme.value = true;
		sexeHomme.value = false;
		sexeNonBinaire.value = false;
	}
	else if (randomChoice === 1) {
		// Sélectionne Homme
		sexeFemme.value = false;
		sexeHomme.value = true;
		sexeNonBinaire.value = false;
	}
	else {
		// Sélectionne Non-binaire
		sexeFemme.value = false;
		sexeHomme.value = false;
		sexeNonBinaire.value = true;
	}
	validateSexe();
}

function validateNom() {
	nomError.value = nom.value.trim() === '' ? requiredMessage : undefined;
	if (nom.value.trim() == 'snake') {
		const route = useRoute();
		route.path.startsWith('/snake');
	}
}

function validateAge() {
	ageError.value = age.value.trim() === '' ? requiredMessage : undefined;
}

function validateMdp() {
	mdpError.value = mdp.value.trim() === '' ? requiredMessage : undefined;
}

function validatePrenom() {
	prenomError.value
		= prenom.value.trim() === '' ? requiredMessage : undefined;
}

function validateMdp_verif() {
	mdp_verifError.value
		= mdp_verif.value.trim() === '' ? requiredMessage : undefined;
	const valeur = inverser(mdp_verif.value);
	if (valeur != mdp.value) {
		mdp_verifError.value = 'Le mot de passe n\'est pas le même';
	}
}

function validateAnnee() {
	anneeError.value = annee.value === '' ? requiredMessage : undefined;
}

function validateSexe() {
	const isChecked
		= sexeFemme.value || sexeHomme.value || sexeNonBinaire.value;
	sexeError.value = !isChecked
		? 'Veuillez sélectionner une option.'
		: undefined;
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
	validateMdp();
	validatePrenom();
	validateAge();
	validateMdp_verif();

	return (
		!nomError.value
		&& !anneeError.value
		&& !sexeError.value
		&& !emailError.value
	);
}

function handleSubmit() {
	if (validateAll()) {
		const sexe = sexeFemme.value
			? 'Femme'
			: sexeHomme.value
				? 'Homme'
				: 'Non-binaire';
		console.log('Formulaire valide. Données :', {
			nom: nom.value,
			annee: annee.value,
			sexe: sexe,
			email: email.value,
		});
		alert('Formulaire envoyé avec succès!');
	}
	else {
		console.error('Veuillez corriger les erreurs.');
	}
}
</script>

<style scoped>
.year-container {
	display: flex;
	gap: 8px;
	align-items: center;
}

.year-inputs {
	display: flex;
	gap: 8px;
	flex: 1;
}

.year-digit-input {
	width: 50px;
	height: 40px;
	text-align: center;
	font-size: 1.25rem;
	font-weight: bold;
	border: 1px solid #d1d5db;
	border-radius: 0.375rem;
	background-color: white;
	color: #000000;
	cursor: default;
	transition: all 0.3s ease;
}

.year-digit-input.animating {
	animation: digitSpin 0.1s ease-in-out infinite;
	background-color: #f3f4f6;
	color: #000000;
}

.spin-btn {
	width: 40px;
	height: 40px;
	font-size: 1.25rem;
	background-color: #3b82f6;
	color: white;
	border: none;
	border-radius: 0.375rem;
	cursor: pointer;
	transition: all 0.2s;
	display: flex;
	align-items: center;
	justify-content: center;
}

.spin-btn:hover:not(:disabled) {
	background-color: #2563eb;
	transform: scale(1.05);
}

.spin-btn:active:not(:disabled) {
	transform: scale(0.95);
}

.spin-btn:disabled {
	opacity: 0.5;
	cursor: not-allowed;
}

@keyframes digitSpin {

	0%,
	100% {
		transform: translateY(0);
	}

	50% {
		transform: translateY(-3px);
	}
}

.year-digit-input::-webkit-outer-spin-button,
.year-digit-input::-webkit-inner-spin-button {
	-webkit-appearance: none;
	margin: 0;
}

.year-digit-input[type='number'] {
	-moz-appearance: textfield;
}

.custom-square-checkbox :deep(.ring-gray-300),
.custom-square-checkbox :deep(.ring-primary-500),
.custom-square-checkbox :deep(.bg-white) {
	width: 1rem !important;
	height: 1rem !important;
	border-radius: 0 !important;
	border: 1px solid #d1d5db !important;
	background-color: white !important;
}

.custom-square-checkbox :deep(.w-3.h-3) {
	display: none !important;
}

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
