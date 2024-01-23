import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface ISubMenuProps {
  subMenu: subMenu[];
  onClick: (e: React.MouseEvent<HTMLLIElement>, link: string) => void;
}

type subMenu = {
  id: number;
  title: string;
  link: string;
};
export default function SubMenu({ subMenu, onClick }: ISubMenuProps) {
  const pathname = usePathname();

  return (
    <ul className="py-2 space-y-2">
      {subMenu.map(({ id, title, link }, idx) => (
        <li key={`${id}-${idx}`} value={link} onClick={(e) => onClick(e, link)}>
          <Link
            href={link}
            className={`flex items-center w-full p-2 transition duration-75 rounded-lg pl-11 group ${
              pathname === link ? 'text-opmyellow' : 'text-white'
            } hover:bg-gray-700`}
          >
            {title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
