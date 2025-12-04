import prisma from '@/../server/lib/prisma';

export default defineEventHandler(async (event) => {
	const user = event.context.user;

	return prisma.game.findMany({
		where: { userId: user.id },
	});
});
