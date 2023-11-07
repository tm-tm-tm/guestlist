import prisma from '@/lib/prisma.js';

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).end(); // Method not allowed
    }

    const userId = req.query.userId;
    const authenticatedUserId = req.query.authenticatedUserId;

    try {
        const userGuestlist = await prisma.guestlist.findMany({
            where: {
                userId: userId,
            },
        });

        const authenticatedUserGuestlist = await prisma.guestlist.findMany({
            where: {
                userId: authenticatedUserId,
            },
        });

        res.status(200).json({ userGuestlist, authenticatedUserGuestlist });
    } catch (error) {
        console.error('Error fetching user guestlist information', error);
        res.status(500).end('Internal Server Error');
    }
}
