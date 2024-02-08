import React from 'react';

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-8" style={{ backgroundColor: '#000017' }}>
      <div className="flex items-center mr-4">
        <img src="/logo/verdex.svg" alt="Logo" className="h-8 w-auto ml-20" />
      </div>
      
      <ul className="flex space-x-6">
        <li><a href="#" style={{ color: '#FFFFFF' }}>Home</a></li>
        <li><a href="#" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>Course</a></li>
        <li><a href="#" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>Our Team</a></li>
      </ul>
      
      <button className="flex items-center bg-white hover:bg-gray-200 text-black py-4 px-10 rounded-full mr-20">
        <span className="text-sm mr-2">Login</span>
        <img src="/icons/passkey.svg" alt="Icon" className="h-6 w-auto inline" />
      </button>
    </nav>
  );
}
