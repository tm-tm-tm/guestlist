import prisma from '@/lib/prisma.js';
import { getSession } from "next-auth/react"

export default async function handler(req, res) {
    const session = await getSession({ req });

    if (session) {
        const userId = session.user;
        console.log('User ID:', userId);
    } else {
        console.log('No session found');
    }

    let response;
    switch (req.method) {
        case 'POST':
            response = await updateQRCode(req, res);
            break;
        case 'PUT':
            response = await updateCheckIn(req, res);
            break;
        default:
            response = res.status(405).json({ message: 'Method not allowed', success: false });
    }

    return response;
}

export const updateQRCode = async (req, res) => {
    const { id, qrCodeData } = req.body;

    try {
        // Check if the guest exists
        const guest = await prisma.guestlist.findUnique({
            where: { id },
            select: { qrCode: true },
        });

        if (!guest) {
            return res.status(404).json({ error: "Guest not found", success: false });
        }

        // Update the QR code
        const updatedQRCode = await prisma.guestlist.update({
            where: { id },
            data: { 'qrCode': qrCodeData },
        });

        return res.status(200).json(updatedQRCode);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error updating guest QR Code", success: false });
    }
};

// export const updateCheckIn = async (req, res) => {
//     const { id } = req.body;

//     try {

//         const guest = await prisma.guestlist.findUnique({
//             where: { id },
//             select: { checkedIn: true },
//         });

//         const updatedCheckIn = await prisma.guestlist.update({
//             where: { id },
//             data: { checkedIn: !guest.checkedIn },
//         });

//         return res.status(200).json(updatedCheckIn);
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({ error: "Error updating guest check-in status", success: false });
//     }
// };


// export const updateCheckIn = async (req, res) => {
//     if (req.method !== 'PUT') {
//         return res.status(405).json({ message: 'Method not allowed', success: false });
//     }

//     const { id } = req.body;

//     try {
//         // Convert the ID to an integer
//         const guestId = parseInt(id, 10);

//         // Update the user's checkedIn status in the database to true
//         const updatedCheckIn = await prisma.guestlist.update({
//             where: { id: guestId },
//             data: { checkIn: true },
//         });

//         return res.status(200).json({ success: true, updatedCheckIn });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ error: 'Error updating check-in status', success: false });
//     }
// };

export const updateCheckIn = async (req, res) => {
    if (req.method !== 'PUT') {
        return res.status(405).json({ message: 'Method not allowed', success: false });
    }

    const { id } = req.body;

    try {
        // Convert the ID to an integer
        const guestId = parseInt(id, 10);

        // Get the current timestamp
        const currentTimestamp = new Date();

        // Update the user's checkedIn status and checkInTime in the database
        const updatedCheckIn = await prisma.guestlist.update({
            where: { id: guestId },
            data: {
                checkIn: true,
                checkInTime: currentTimestamp,
            },
        });

        return res.status(200).json({ success: true, updatedCheckIn });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error updating check-in status', success: false });
    }
};
