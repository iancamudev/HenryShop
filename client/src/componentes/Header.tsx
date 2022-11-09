import React, { useState } from "react";
import logo from "../assets/logoHenryBlack.png";
import { GiHamburgerMenu } from "react-icons/gi";
import Searchbar from "./Searchbar";

const Header = () => {
  const [deploy, setDeploy] = useState(false);
  return (
    <nav className="flex flex-col sticky w-full">
      <div className=" h-20 p-2 pl-2 pr-4 bg-yellow flex justify-between items-center">
        <img src={logo} alt="Logo de Henry" className="h-full select-none" />
        <GiHamburgerMenu
          onClick={() => {
            setDeploy(!deploy);
          }}
          className={
            deploy
              ? "-rotate-90 h-10 w-auto cursor-pointer duration-300"
              : "h-10 w-auto cursor-pointer duration-300"
          }
        />
      </div>
      {deploy && (
        <div id="divDeployNavbar" className="bg-yellow h-32 w-full">
          <div className="select-none">
            <h3 className="">Desplegado</h3>
          </div>
          <Searchbar />
        </div>
      )}
    </nav>
  );
};

export default Header;
