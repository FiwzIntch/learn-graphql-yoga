import { compare } from "bcryptjs"
import { GraphQLContext } from "../../context"
import { sign } from "jsonwebtoken"
import { APP_SECRET, EXPIRATION_TIME } from "../../constant"
import { JwtUserPayload, LoginResult } from "../../interface/auth.interface"

export default {
  async login(parent: unknown, { email, password }: { email: string, password: string }, context: GraphQLContext)
    : Promise<LoginResult> {

    const user = await context.prisma.user.findUnique({
      where: {
        email: email
      }
    })

    if (!user) {
      throw new Error('User not found')
    }

    const valid = await compare(password, user.password)

    if (!valid) {
      throw new Error('Invalid password')
    }

    const payload: JwtUserPayload = {
      userId: user.id,
      email: user.email,
    }

    const token = sign(payload, APP_SECRET, { expiresIn: EXPIRATION_TIME })

    return {
      accessToken: token
    }
  }
}