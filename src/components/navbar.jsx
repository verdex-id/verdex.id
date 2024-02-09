import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-8 bg-[#000017]">
      <div className="flex items-center mr-4">
        <Image src="/logo/verdex.svg" alt="Logo" width={40} height={40} className="ml-20" />
      </div>
      
      <ul className="flex space-x-6">
        <li>
          <Link href="#" className="text-white">
            Home
          </Link>
        </li>
        <li>
          <Link href="#" className="text-gray-500">
            Course
          </Link>
        </li>
        <li>
          <Link href="#" className="text-gray-500">
            Our Team
          </Link>
        </li>
      </ul>
      
      <button className="flex items-center bg-white hover:bg-gray-200 text-black py-4 px-10 rounded-full mr-20">
        <span className="text-sm mr-2">Login</span>
        <Image src="/icons/passkey.svg" alt="Icon" width={24} height={24} />
      </button>
    </nav>
  );
}
