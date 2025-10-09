// import { UserResponse } from "@/interfaces/login"
// import { JWT } from "next-auth/jwt"

// import NextAuth, { User } from "next-auth"

// declare module "next-auth" {
//     interface User{
//         user: UserResponse,
//         token: string
//     }

//     interface Session {
//         user: UserResponse
//     }
// }


// declare module "next-auth/jwt" {
//     interface JWT extends User{}
// }
import { UserResponse } from "@/interfaces/login"
import { DefaultSession, DefaultUser } from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
  interface User extends DefaultUser {
    user: UserResponse
    token: string
  }

  interface Session extends DefaultSession {
    user: UserResponse
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: UserResponse
    token: string
  }
}
