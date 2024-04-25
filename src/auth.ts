import { PrismaClient, User } from "@prisma/client";
import { JwtUserPayload } from "./interface/auth.interface";
import { verify } from "jsonwebtoken";
import { APP_SECRET } from "./constant";

export async function authenticateUser(prisma: PrismaClient, request: Request): Promise<User | null> {
  const header = request.headers.get('authorization')

  if (header !== null) {
    const token = header.split(' ')[1]

    const payload = verify(token, APP_SECRET) as JwtUserPayload

    return await prisma.user.findUnique({
      where: {
        id: payload.userId
      }
    })
  }
  return null
}