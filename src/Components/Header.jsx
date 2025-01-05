import React from 'react';

function Header() {
  return (
    <header className="bg-blue-600 text-white py-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center px-6">
        <div className="text-2xl font-bold">MyApp</div>
        <nav className="space-x-6">
          <a href="#home" className="hover:text-gray-200 transition duration-300">Home</a>
          <a href="#about" className="hover:text-gray-200 transition duration-300">About</a>
          <a href="#services" className="hover:text-gray-200 transition duration-300">Services</a>
          <a href="#contact" className="hover:text-gray-200 transition duration-300">Contact</a>
        </nav>
        
         </div>
    </header>
  );
}

export default Header;
