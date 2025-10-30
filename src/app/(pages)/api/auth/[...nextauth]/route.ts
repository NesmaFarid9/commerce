import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"


const handler = NextAuth({
    providers:[
        CredentialsProvider({
            name:"Nesma",
            credentials:{
                email:{type: 'email', placeholder: 'nesma@gmail.com'},
                password:{}
            },
            async authorize(credentials, req) {
                const response = await fetch(`${process.env.NEXT_API}/auth/signin`,{
                    method: "POST",
                    body: JSON.stringify({
                        email: credentials?.email,
                        password: credentials?.password
                    }),
                    headers:{
                        "Content-Type": "application/json"
                    }
                });
                const payload = await response.json();
                if(payload.message == 'success'){
                    return {
                        user: payload.user,
                        token: payload.token,
                        id: payload.user.email
                    };
                }
                else{
                    throw new Error(payload.message);
                }
                
            },
        })
    ],
    pages:{
        signIn: '/login',
        error: '/login'
    },
    secret: process.env.AUTH_SECRET,
    callbacks: {
        jwt:({token, user}) => {
            if(user){
                token.user = user.user;
                token.token = user.token;
            }
            return token;
        },
        session:({session, token}) => {
            session.user = token.user;
            return session;
        }
    }    
})

export { handler as GET, handler as POST }