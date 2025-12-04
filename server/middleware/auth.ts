import { verifyToken } from '@/../server/utils/jwt';

export default defineEventHandler((event) => {
	const protectedRoutes = ['/api/games', '/api/success'];

	const url = event.node.req.url || '';
	const isProtected = protectedRoutes.some(r => url.startsWith(r));

	if (!isProtected) return;

	const authHeader = event.node.req.headers.authorization;
	if (!authHeader) {
		throw createError({ statusCode: 401, message: 'Token manquant' });
	}

	const token = authHeader.split(' ')[1];

	try {
		const decoded = verifyToken(token);
		event.context.user = decoded;
	}
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	catch (err) {
		throw createError({ statusCode: 401, message: 'Token invalide' });
	}
});
