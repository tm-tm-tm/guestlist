// import { PrismaClient } from '@prisma/client'
// const prisma = new PrismaClient()

import prisma from '@/lib/prisma.js'
import { getSession } from "next-auth/react"
import Guestlist from '@/components/Guestlist/Guestlist.js'

// export default async function handler(req, res) {
//   if (req.method === 'POST') {
//     return await addGuest(req, res)
//   } else if (req.method === 'GET') {
//     return await readGuestlist(req, res)
//   } else if (req.method === 'PUT') {
//     return await updateGuestAccess(req, res)
//   } else if (req.method === 'DELETE') {
//     return await deleteGuest(req, res)
//   } else {
//     return res.status(405).json({ message: 'Method not allowed', success: false })
//   }
// }

export default async function handler(req, res) {
  const session = await getSession({ req })

  if (session) {
    const userId = session.user
    console.log('User ID:', userId)
  } else {
    console.log('No session found')
  }

  let response
  switch (req.method) {
    case 'POST':
      response = await addGuest(req, res, session)
      break
    case 'GET':
      response = await readGuestlist(req, res)
      break
    case 'PUT':
      response = await updateGuestAccess(req, res)
      break
    case 'DELETE':
      response = await deleteGuest(req, res)
      break
    default:
      response = res.status(405).json({ message: 'Method not allowed', success: false })
  }
  return response
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

// const addGuest = async (req, res) => {
//   const body = req.body

//   try {
//     const newEntry = await prisma.guestlist.create({
//       data: {
//         firstName: body.firstName,
//         lastName: body.lastName,
//         instagram: body.instagram      
//       }
//     })

//     return res.status(200).json(newEntry, { success: true })
//   } catch (error) {
//     console.error('Request error', error)
//     res.status(500).json({ error: 'Error adding guest', success: false })
//   }
// }

// const addGuest = async (req, res, session) => {
//   const body = req.body

//   return prisma.guestlist.create({
//     data: {
//       firstName: body.firstName,
//       lastName: body.lastName,
//       instagram: body.instagram,
//       userId: session.user.id
//     }
//   })
//     .then(newEntry => {
//       return res.status(200).json(newEntry, { success: true })
//     })
//     .catch(error => {
//       console.error('Request error', error)
//       return res.status(500).json({ error: 'Error adding guest', success: false })
//     })
// }

const addGuest = async (req, res, session) => {
  const body = req.body

  const data = {
    firstName: body.firstName,
    lastName: body.lastName,
    instagram: body.instagram,
    email: body.email
  }

  if (session) {
    data.userId = session.user.id
  }

  return prisma.guestlist.create({
    data: data
  })
    .then(newEntry => {
      return res.status(200).json(newEntry, { success: true })
    })
    .catch(error => {
      console.error('Request error', error)
      return res.status(500).json({ error: 'Error adding guest', success: false })
    })
}

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
    return res.status(500).json({ error: "Error updating guest", success: false })
  }
}

const readInstagram = async (req, res) => {
  if (req.method === "GET") {
    try {
      const guestlists = await prisma.guestlist.findMany({
        select: {
          access: true,
        },
      });

      res.status(200).json(guestlists);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}


const updateUsername = async (req, res) => {
  const session = await getSession({ req })

    if (!session) {
        return res.status(401).end('Not authenticated')
    }

    if (req.method === 'POST') {
        const { newUsername } = req.body

        // Update the username in your database using a query
        try {
            await prisma.user.update({
                where: { id: session.user.id },
                data: { username: newUsername },
            })

            res.status(200).end('Username updated successfully')
        } catch (error) {
            res.status(500).end('Error updating username')
        }
    } else {
        res.status(405).end('Method not allowed')
    }
}
