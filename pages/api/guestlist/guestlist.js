// import { PrismaClient } from '@prisma/client'
// const prisma = new PrismaClient()

import prisma from '@/lib/prisma.js'
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
      response = await addGuest(req, res, session);
      break;
    case 'GET':
      response = await readGuestlist(req, res);
      break;
    case 'PUT':
        response = await updateGuestAccess(req, res);
   break;
    case 'DELETE':
      response = await deleteGuest(req, res);
      break;
    default:
      response = res.status(405).json({ message: 'Method not allowed', success: false });
  }

  return response;
}

const readGuestlist = async (req, res) => {
  const body = req.body

  try {
    const guests = await prisma.guestlist.findMany()

    return res.status(200).json(guests, { success: true })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'Error reading from database', success: false })
  }
}

// WITH EMAIL CHECK
const addGuest = async (req, res) => {
  const body = req.body
  const email = body.email

  // Check if the email already exists in the database
  const existingGuest = await prisma.guestlist.findFirst({
    where: { email: email },
  })

  if (existingGuest) {
    return res.status(400).json({ message: 'Email already exists', success: false })
  }

  const data = {
    firstName: body.firstName,
    lastName: body.lastName,
    email: email,
    userId: body.userId,
  }

  try {
    const newEntry = await prisma.guestlist.create({
      data: data,
    })

    res.status(200).json({ success: true, data: newEntry })
  } catch (error) {
    console.error('Request error', error)
    res.status(500).json({ error: 'Error adding guest', success: false })
  }
}

// LIMIT TO ONE GUESTLIST ENTRY PER USER
// const addGuest = async (req, res, session) => {
//   const body = req.body;

//   // Check if the user already has an entry in the guestlist
//   const existingEntry = await prisma.guestlist.findUnique({
//     where: {
//       userId: session.user.id,
//     },
//   });

//   if (existingEntry) {
//     // User already has an entry, so prevent creating a new one
//     return res.status(400).json({ error: 'User already has a guestlist entry', success: false });
//   }

//   const data = {
//     firstName: body.firstName,
//     lastName: body.lastName,
//     email: body.email,
//     userId: session.user.id,
//   };

//   try {
//     const newEntry = await prisma.guestlist.create({
//       data: data,
//     });

//     res.status(200).json({ success: true, data: newEntry });
//   } catch (error) {
//     console.error('Request error', error);
//     res.status(500).json({ error: 'Error adding guest', success: false });
//   }
// };


const deleteGuest = async (req, res) => {
  const { id } = req.body;

  try {
    await prisma.guestlist.delete({
      where: { id }
    });

    return res.status(200).json({ message: 'Guest deleted successfully' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Error deleting guest' });
  }
}

const updateGuestAccess = async (req, res) => {
  const { id } = req.body;

  try {
    const guest = await prisma.guestlist.findUnique({
      where: { id },
      select: { access: true },
    })

    const updatedAccess = await prisma.guestlist.update({
      where: { id },
      data: { access: !guest.access },
    })

    return res.status(200).json(updatedAccess);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error updating guest access status", success: false })
  }
}

