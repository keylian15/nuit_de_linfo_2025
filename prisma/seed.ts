import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
	await prisma.user.deleteMany({});

	const user1 = await prisma.user.create({
		data: {
			email: 'test@example.com',
			name: 'Test_user',
		},
	});

	console.log('Seed done!');
	console.log({ user1 });
}

main()
	.catch((e) => {
		console.error('Error when running seed', e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
