import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Bars3Icon, ChevronDoubleUpIcon } from "@heroicons/react/16/solid";

const NavBar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isSticky, setSticky] = useState(false);

  const navItems = [
    { link: "Home", path: "/" },
    { link: "Add Meal", path: "/add-meal" },
    { link: "Recipe Book", path: "/recipe-book" },
    { link: "Explore", path: "/explore" },
  ];

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.addEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <header className="w-full bg-transparent fixed top-0 left-0 right-0 transition-all ease-in duration-300">
        <nav
          className={`py-4 lg:px-24 px-4 ${
            isSticky ? "stick top-0 left-0 right-0 bg-blue-300" : ""
          }`}
        >
          <div className="flex justify-between items-center text-base gap-8">
            {/* INSERT LOGO image */}
            <Link to="/" className="text-2xl font-bold flex items-center gap-2">
              LOGO
            </Link>

            {/* Lg Device Nav */}
            <ul className="md:flex space-x-12 hidden">
              {navItems.map(({ link, path }) => (
                <Link
                  key={path}
                  to={path}
                  className="block text-base text-white uppercase cursor-pointer hover:text-blue-700"
                >
                  {link}
                </Link>
              ))}
            </ul>

            {/* Mobile Device Menu Btn */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="text-black focus:outline-none"
              >
                {isMenuOpen ? (
                  <ChevronDoubleUpIcon className="h-5 w-5 text-black" />
                ) : (
                  <Bars3Icon className="h-5 w-5 text-black" />
                )}
              </button>
            </div>
          </div>

          <div
            className={`space-y-4 px-4 mt-16 py-7 bg-indigo-800 ${
              isMenuOpen ? "block fixed top-0 right-0 left-0" : "hidden"
            }`}
          >
            {navItems.map(({ link, path }) => (
              <Link
                key={path}
                to={path}
                className="block text-base text-white uppercase cursor-pointer hover:text-blue-700"
              >
                {link}
              </Link>
            ))}
          </div>
        </nav>
      </header>
    </div>
  );
};

export default NavBar;
