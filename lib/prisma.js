import { PrismaClient } from '@prisma/client'

let prisma

if (process.env.NODE_ENV === 'development') {
  // In development, create a new Prisma client for each request to avoid connection leaks.
  prisma = new PrismaClient()
} else {
  // In production or other environments, create a single Prisma client instance.
  if (!prisma) {
    prisma = new PrismaClient()
  }
}

export default prisma


// import { PrismaClient } from '@prisma/client'

// const prisma = global.prisma || new PrismaClient()

// if (process.env.NODE_ENV === 'development') global.prisma = prisma

// export default prisma