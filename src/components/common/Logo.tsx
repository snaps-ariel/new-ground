'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import LogoImage from '../../../public/dev-admin-logo.svg';

interface IStyleProps {
  styleProps?: React.CSSProperties;
}
export default function Logo({ styleProps }: IStyleProps) {
  return (
    <Link href={'/'}>
      <Image
        src={LogoImage}
        alt={'logo'}
        priority={true}
        style={{
          paddingBottom: '60px',
          margin: '0 auto',
          ...styleProps,
        }}
      />
    </Link>
  );
}
