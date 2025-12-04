import prisma from '@/../server/lib/prisma';
import { readBody } from 'h3';

export default defineEventHandler(async (event) => {
	const user = event.context.user;
	const { title, timer } = await readBody(event);

	return prisma.game.create({
		data: {
			title,
			timer,
			date: new Date(),
			userId: user.id,
		},
	});
});
