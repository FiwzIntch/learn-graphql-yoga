import { JwtPayload } from "jsonwebtoken"

export interface JwtUserPayload extends JwtPayload {
  userId: string
  email: string
}

export interface LoginResult {
  accessToken: string
}