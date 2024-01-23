'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import Logo from '@/components/common/Logo';
import Dropdown from '@/components/Sidebar/Dropdown';

import {
  ArrowDownIcon,
  BannerOrderIcon,
  EventsIcon,
  PromotionBannerIcon,
  InvalidateIcon,
  UploadIcon,
} from '@/components/Sidebar/Icons';

const menuData = [
  {
    serviceName: 'OPM',
    menus: [
      {
        id: 0,
        icon: <EventsIcon />,
        title: '이벤트',
        link: '/opm/events',
        subMenu: [
          {
            id: 0,
            title: '이미지맵 등록',
            link: '/opm/events/image-map',
          },
        ],
      },
      {
        id: 1,
        icon: <BannerOrderIcon />,
        title: '배너 순서 조정',
        link: '/opm/bannerlist',
      },
      {
        id: 2,
        icon: <PromotionBannerIcon />,
        title: '프로모션 배너',
        link: '/opm/promotion-banner',
        subMenu: [
          {
            id: 0,
            title: '옵션 상단 배너',
            link: '/opm/promotion-banner/top-banner',
          },
          {
            id: 1,
            title: '상세페이지 배너',
            link: '/opm/promotion-banner/detail-banner',
          },
        ],
      },
    ],
  },
  {
    serviceName: 'SNAPS',
    menus: [
      { id: 0, icon: <EventsIcon />, title: '이벤트', link: '/snaps/events' },
      {
        id: 1,
        icon: <BannerOrderIcon />,
        title: '배너 순서 조정',
        link: '/snaps/bannerlist',
      },
    ],
  },
  {
    serviceName: '개발자용',
    menus: [
      {
        id: 0,
        icon: <InvalidateIcon />,
        title: 'CLOUDFRONT 무효화',
        link: '/developer/invalidation',
      },
      {
        id: 1,
        icon: <UploadIcon />,
        title: 'S3 업로드',
        link: '/developer/upload',
      },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [openedDropdown, setOpenedDropdown] = useState<null | string>(null);

  const handleMenuClick = (
    e: React.MouseEvent<HTMLLIElement>,
    link: string,
    isDropdown?: boolean,
  ) => {
    e.stopPropagation();

    if (!isDropdown) {
      if (openedDropdown && !link.includes(openedDropdown)) {
        setOpenedDropdown(null);
      }
      return;
    }

    if (isDropdown) {
      link === openedDropdown
        ? setOpenedDropdown(null)
        : setOpenedDropdown(link);
    }
  };

  return (
    <aside
      id="default-sidebar"
      className="fixed top-0 left-0 z-40 w-72 h-screen"
      aria-label="Sidebar"
    >
      <div className="h-full px-8 py-6 overflow-y-auto bg-gray-800 text-white relative">
        <Logo styleProps={{ padding: '10px 15px', marginBottom: '50px' }} />
        {menuData.map(({ serviceName, menus }, idx) => (
          <div key={`${serviceName}-${idx}`} className="pb-5">
            <h5 id="sidebar" className="text-lg font-semibold uppercase ">
              {serviceName}
            </h5>
            <div className="py-4 overflow-y-auto">
              <ul className="space-y-2 font-medium">
                {menus.map(({ id, icon, title, link, subMenu }) => (
                  <li
                    key={`${id}-${icon}`}
                    onClick={(e) => handleMenuClick(e, link, !!subMenu)}
                  >
                    <Link
                      href={`${link}`}
                      className={`flex items-center p-2 rounded-lg ${
                        pathname === link ? 'text-opmyellow' : 'text-white'
                      } hover:bg-gray-700 group`}
                    >
                      {icon}
                      <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                        {title}
                      </span>
                      {subMenu && (
                        <div>
                          <ArrowDownIcon />
                        </div>
                      )}
                    </Link>
                    {subMenu && openedDropdown?.includes(link) && (
                      <Dropdown
                        key={`${id}-${subMenu}`}
                        subMenu={subMenu}
                        onClick={handleMenuClick}
                      />
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
