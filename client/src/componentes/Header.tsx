import React from "react";
import logo from "../assets/logoHenryBlack.png";
import { GiHamburgerMenu } from "react-icons/gi";

const Header = () => {
  return (
    <header className="fixed w-full h-24 bg-yellow flex justify-between items-center">
      <img src={logo} alt="Logo de Henry" className="h-full" />
      <GiHamburgerMenu className="h-12 w-auto mr-2 cursor-pointer" />
    </header>
  );
};

export default Header;
