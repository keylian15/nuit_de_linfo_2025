import prisma from '@/../server/lib/prisma';
import bcrypt from 'bcrypt';
import { generateToken } from '@/../server/utils/jwt';
import { readBody } from 'h3';

export default defineEventHandler(async (event) => {
	const { email, password } = await readBody(event);

	if (!email || !password) {
		throw createError({ statusCode: 400, message: 'Email ou mot de passe manquant' });
	}

	const user = await prisma.user.findUnique({ where: { email } });
	if (!user) throw createError({ statusCode: 401, message: 'Utilisateur introuvable' });

	const valid = await bcrypt.compare(password, user.password);
	if (!valid) throw createError({ statusCode: 401, message: 'Mot de passe incorrect' });

	const token = generateToken({ id: user.id, email: user.email });
	return { token, user: { id: user.id, email: user.email, username: user.username } };
});
