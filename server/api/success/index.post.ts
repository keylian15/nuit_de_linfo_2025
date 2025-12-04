import prisma from '@/../server/lib/prisma';
import { readBody } from 'h3';

export default defineEventHandler(async (event) => {
	const user = event.context.user;
	const { name, description } = await readBody(event);

	return prisma.success.create({
		data: {
			name,
			description,
			date: new Date(),
			userId: user.id,
		},
	});
});
