import prisma from '@/../server/lib/prisma';

export default defineEventHandler(async () => {
	return prisma.user.findMany({
		include: { games: true, successes: true },
	});
});
