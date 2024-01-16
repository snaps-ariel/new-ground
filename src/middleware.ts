import type { NextRequest } from 'next/server';
import { auth } from './auth';

export async function middleware(request: NextRequest) {
  const getUserInfo = request.cookies.get('OH_PRINT_ME_GROUND_USER_TOKEN');

  if (request.url.includes('/login') && getUserInfo) {
    // 로그인 시 -> /home 진입
    return await auth(request);
  }
  if (!request.url.includes('/login') && !getUserInfo) {
    // 미로그인 시 -> /login 진입
    return await auth(request);
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
