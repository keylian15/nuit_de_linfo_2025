import prisma from '@/../server/lib/prisma';
import bcrypt from 'bcrypt';
import { readBody } from 'h3';

export default defineEventHandler(async (event) => {
	const { email, password } = await readBody(event);

	if (!email || !password) {
		throw createError({ statusCode: 400, message: 'Email et mot de passe requis' });
	}

	// Vérifier si l'utilisateur existe déjà
	const existingUser = await prisma.user.findUnique({ where: { email } });
	if (existingUser) {
		throw createError({ statusCode: 409, message: 'Cet email est déjà utilisé' });
	}

	// Hasher le mot de passe
	const hashedPassword = await bcrypt.hash(password, 10);

	// Créer l'utilisateur
	const user = await prisma.user.create({
		data: {
			email,
			password: hashedPassword,
			username: email.split('@')[0], // Utilise la partie avant @ comme username
		},
	});

	return {
		message: 'Utilisateur créé avec succès',
		userId: user.id,
	};
});
