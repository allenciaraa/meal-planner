import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-[#CECEFB] border-b-2">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-5">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl">Home</h1>
        </Link>
        <ul className="flex gap-4">
          <Link to="/">
            <li className="hidden sm:inline hover:underline">Meal Plan</li>
          </Link>
          <Link to="/recipe-book">
            <li className="hidden sm:inline hover:underline">Recipe Book</li>
          </Link>
        </ul>
      </div>
    </header>
  );
};

export default Header;
