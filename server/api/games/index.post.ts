import prisma from '@/../server/lib/prisma';
import { readBody } from 'h3';

export default defineEventHandler(async (event) => {
	const user = event.context.user;
	const { title, timer } = await readBody(event);

	if (!title || !timer) {
		throw createError({ statusCode: 400, message: 'Titre et timer requis' });
	}

	return prisma.game.create({
		data: {
			title,
			timer,
			date: new Date(), // Date générée côté serveur
			userId: user.id,
		},
	});
});
