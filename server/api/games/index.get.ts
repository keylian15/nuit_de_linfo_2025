import prisma from '@/../server/lib/prisma';
import { getHeader } from 'h3';
import { verifyToken } from '@/../server/utils/jwt';

export default defineEventHandler(async (event) => {
	const authHeader = getHeader(event, 'authorization');
	if (!authHeader) throw createError({ statusCode: 401, message: 'Non autorisé' });

	const token = authHeader.split(' ')[1];

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let payload: any;
	try {
		payload = verifyToken(token);
	}
	catch (err) {
		console.error('Erreur vérification token:', err);
		throw createError({ statusCode: 401, message: 'Token invalide' });
	}

	const userId = typeof payload === 'object' && 'id' in payload ? payload.id : null;
	if (!userId) throw createError({ statusCode: 401, message: 'Token invalide' });

	const games = await prisma.game.findMany({
		where: { userId },
		orderBy: { date: 'desc' },
	});

	console.log('Games trouvés pour userId', userId, ':', games);
	return games;
});
