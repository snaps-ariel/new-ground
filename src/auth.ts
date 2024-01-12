import { NextRequest, NextResponse } from 'next/server';

function validateUser(request: NextRequest): Promise<Response> {
  const getUserToken = request.cookies.get('OH_PRINT_ME_GROUND_USER_TOKEN')
    ?.value;

  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/account/user/`, {
    method: 'GET',
    headers: {
      'X-SNAPS-CHANNEL': 'DA_WEB',
      'X-SNAPS-TOKEN': getUserToken || 'X',
    },
    mode: 'cors',
  });
}

export async function auth(request: NextRequest) {
  const response = await validateUser(request);
  if (response.status === 200) {
    console.log('response', response);
    return NextResponse.redirect(new URL('/home', request.nextUrl.origin));
  }
  return NextResponse.redirect(new URL('/login', request.nextUrl.origin));
}
