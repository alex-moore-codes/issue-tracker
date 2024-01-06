import Link from 'next/link';
import React from 'react';
import { AiFillBug } from 'react-icons/ai';

export default function NavBar() {
  const links = [
    {
      label: 'Dashboard',
      href: '/',
    },
    {
      label: 'Issues',
      href: '/issues',
    },
  ];

  return (
    <nav className="flex mx-auto space-x-6 h-16 border-b mb-5 px-5 items-center">
      <Link href={'/'}>
        <AiFillBug />
      </Link>
      <ul className="flex space-x-6">
        {links.map((link, index: number) => (
          <Link
            className="text-zinc-500 hover:text-zinc-800 transition-colors"
            key={index}
            href={link.href}
          >
            {link.label}
          </Link>
        ))}
      </ul>
    </nav>
  );
}
