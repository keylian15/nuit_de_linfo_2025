import prisma from '@/../server/lib/prisma';

export default defineEventHandler(async (event) => {
	const id = Number(event.context.params?.id ?? 0);

	return prisma.user.findUnique({
		where: { id },
		include: { games: true, successes: true },
	});
});
