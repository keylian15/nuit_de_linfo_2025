/* eslint-disable @typescript-eslint/no-explicit-any */
import prisma from '@/../server/lib/prisma';
import { getHeader } from 'h3';
import { parse } from 'url';
import pkg from 'jsonwebtoken';

const { verify } = pkg;

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export default defineEventHandler(async (event) => {
	const authHeader = getHeader(event, 'authorization');
	if (!authHeader) throw createError({ statusCode: 401, message: 'Non autorisé' });

	const token = authHeader.split(' ')[1];
	let payload: any;
	try {
		payload = verify(token, JWT_SECRET);
	}
	catch {
		throw createError({ statusCode: 401, message: 'Token invalide' });
	}

	const userId = typeof payload === 'object' && 'id' in payload ? payload.id : null;
	if (!userId) throw createError({ statusCode: 401, message: 'Token invalide' });

	const url = parse(event.node.req.url || '', true);
	const id = Number(url.pathname?.split('/').pop());
	if (!id) throw createError({ statusCode: 400, message: 'ID manquant' });

	const body = await readBody(event);
	const { title, timer, date } = body;

	const updatedGame = await prisma.game.updateMany({
		where: { id, userId }, // sécurité : on ne peut modifier que ses propres jeux
		data: {
			title,
			timer,
			date: date ? new Date(date) : undefined,
		},
	});

	if (updatedGame.count === 0) throw createError({ statusCode: 404, message: 'Jeu non trouvé ou non autorisé' });

	// Récupérer le jeu mis à jour
	const game = await prisma.game.findUnique({ where: { id } });
	return game;
});
