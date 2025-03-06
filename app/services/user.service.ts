import { prisma } from "prisma/prisma.service"


export async function createUser() {
  //todo
}

export async function getUser(email: string) {
  const user = await prisma.user.findUnique({
    where: { email }
  });

  if (!user) {
    return new Error('Could not find user');
  }
}