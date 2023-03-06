import { NextResponse } from 'next/server'
import * as jose from 'jose'

const secret = new TextEncoder().encode(`${process.env.JWT_SECRET}`)

export default async function middleware(request) {
  const jwtToken = request.cookies.get('TOKEN')

  const url = request.url

  if (url.includes('/sign-in')) {
    if (jwtToken) {
      try {
        const { payload: DATA } = await jose.jwtVerify(jwtToken.value, secret)
        if (DATA) {
          if (DATA.userRoles === 'admin') {
            return NextResponse.redirect(new URL('/admin', request.url))
          } else {
            return NextResponse.redirect(new URL('/member/questions', request.url))
          }
        }
      } catch (e) {
        return NextResponse.next()
      }
    }
  }

  //for subscribers
  if (url.includes('/member')) {
    if (jwtToken === undefined) {
      return NextResponse.redirect(new URL('/sign-in', request.url))
    }

    try {
      const { payload: DATA } = await jose.jwtVerify(jwtToken.value, secret)
      if (!DATA || DATA.userRoles === 'admin') {
        return NextResponse.redirect(new URL('/sign-in', request.url))
      }
      return NextResponse.next()
    } catch (e) {
      return NextResponse.redirect(new URL('/sign-in', request.url))
    }
  }

  //for admins
  if (url.includes('/admin')) {
    if (jwtToken === undefined) {
      return NextResponse.redirect(new URL('/sign-in', request.url))
    }

    try {
      const { payload: DATA } = await jose.jwtVerify(jwtToken.value, secret)

      if (!DATA || DATA.userRoles === 'subscriber') {
        return NextResponse.redirect(new URL('/sign-in', request.url))
      }
      return NextResponse.next()
    } catch (e) {
      return NextResponse.redirect(new URL('/sign-in', request.url))
    }
  }

  return NextResponse.next()
}
export const config = {
  matcher: ['/:path*', '/member/:path*', '/admin/:path*'],
}
