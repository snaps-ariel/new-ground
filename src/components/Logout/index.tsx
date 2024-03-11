'use client';
import { useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

import { useLogout } from '@/api/login';

export default function Logout() {
  const router = useRouter();
  const { data: logoutData, trigger: logout, error: logoutError } = useLogout();

  const submitLogout = useCallback(() => {
    return logout();
  }, [logout]);

  useEffect(() => {
    submitLogout();
    return;
  }, [submitLogout]);

  // 로그아웃 성공
  useEffect(() => {
    if (logoutData) {
      const { status } = logoutData;
      if (status === '200') {
        Cookies.remove('OH_PRINT_ME_GROUND_USER_TOKEN');
        router.push('/login');
      }
    }
  }, [logoutData, router]);

  // 로그아웃 실패
  useEffect(() => {
    if (logoutError) {
      return alert('로그아웃에 실패했습니다. 다시 시도해주세요.');
    }
  }, [logoutError]);

  return <></>;
}
