import { NextResponse } from 'next/server'
import DecodeJwtTokenPayload from '../utils/jwtDecoder'
 
// This function can be marked `async` if using `await` inside
export async function middleware(request) { 
    const cookie = request.headers.get("cookie")
        if (!cookie) {
            return NextResponse.redirect(new URL('/signin', request.url))
        } 

        const token = cookie
        .split('; ')
        .find(row => row.startsWith('token='))
        ?.split('=')[1];

        if (!token) {
            return NextResponse.redirect(new URL('/signin', request.url))
        } 

        const decodedJwtToken = await DecodeJwtTokenPayload(token)
        console.log(decodedJwtToken);
        const currentTimestampInSeconds = Math.floor(Date.now() / 1000); // Convertit l'heure actuelle en secondes
        if (decodedJwtToken.exp < currentTimestampInSeconds) {
            return NextResponse.redirect(new URL('/signin', request.url))
        }
    
}
 
// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/profile/:path*', '/infringement/:path*', '//:path*'],
  }
