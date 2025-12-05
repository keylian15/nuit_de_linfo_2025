import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
	await prisma.user.deleteMany({});

	const hashed = await bcrypt.hash('password', 10);

	const user1 = await prisma.user.create({
		data: {
			email: 'test@example.com',
			password: hashed,
			username: 'Test_user',
		},
	});

	const game1 = await prisma.game.create({
		data: {
			userId: user1.id,
			title: 'Adventure Quest',
			timer: 1600,
			date: new Date('2025-10-31T20:00:00Z'),
		},
	});

	const success1 = await prisma.success.create({
		data: {
			userId: user1.id,
			name: 'First Blood',
			description: 'Achieved first victory in the game.',
			date: new Date('2025-10-31T21:00:00Z'),
		},
	});

	console.log('Seed done!');
	console.log({ user1 });
	console.log({ success1 });
	console.log({ game1 });
}

main()
	.catch((e) => {
		console.error('Error when running seed', e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
