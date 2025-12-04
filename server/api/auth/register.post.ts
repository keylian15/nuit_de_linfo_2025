import prisma from '@/../server/lib/prisma';
import { generateToken } from '@/../server/utils/jwt';
import bcrypt from 'bcrypt';
import { readBody } from 'h3';

export default defineEventHandler(async (event) => {
	const { email, username, password } = await readBody(event);

	if (!email || !password || !username) {
		throw createError({ statusCode: 400, message: 'Champs manquants' });
	}

	const exists = await prisma.user.findUnique({ where: { email } });
	if (exists) {
		throw createError({ statusCode: 400, message: 'Email déjà utilisé' });
	}

	const hashedPassword = await bcrypt.hash(password, 10);

	const user = await prisma.user.create({
		data: { email, username, password: hashedPassword },
	});

	const token = generateToken({ id: user.id, email: user.email });

	return { user: { id: user.id, email: user.email, username: user.username }, token };
});
