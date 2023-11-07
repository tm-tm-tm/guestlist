// import { getSession } from 'next-auth/react';
// import prisma from '@/lib/prisma';

// export default async function handler(req, res) {
//     const session = await getSession({ req });

//     if (!session) {
//         return res.status(401).json({ error: 'Unauthorized. You must be authenticated to update your name.' });
//     }

//     if (req.method === 'PUT') {
//         const { name } = req.body;

//         try {
//             const updatedUser = await prisma.user.update({
//                 where: { id: session.user.id },
//                 data: { name },
//             });
//             return res.status(200).json({ user: updatedUser });
//         } catch (error) {
//             console.error('Error updating user name:', error);
//             return res.status(500).json({ error: 'Error updating user name.' });
//         }
//     } else {
//         return res.status(405).json({ error: 'Method not allowed' });
//     }
// }

import { getServerSession } from 'next-auth/react';
import prisma from '@/lib/prisma';

export default async function handler(req, res) {
    const session = await getServerSession({ req });

    if (!session) {
        return res.status(401).json({ error: 'Unauthorized. You must be authenticated to update your name.' });
    }

    if (req.method === 'PUT') {
        const { name } = req.body;

        try {
            const updatedUser = await prisma.user.update({
                where: { id: session.user.id },
                data: { name },
            });
            return res.status(200).json({ user: updatedUser });
        } catch (error) {
            console.error('Error updating user name:', error);
            return res.status(500).json({ error: 'Error updating user name.' });
        }
    } else {
        return res.status(405).json({ error: 'Method not allowed' });
    }
}
