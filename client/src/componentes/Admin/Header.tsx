import React, { useState } from "react";
import logo from "../../assets/logoHenryBlack.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [deploy, setDeploy] = useState(false);
  const [categoryDeploy, setCategoryDeploy] = useState(false);
  const navigate = useNavigate();
  const routeChangeToHome = () => {
    let path = `/`;
    navigate(path);
  };
  return (
    <nav className="flex flex-col sticky w-screen">
      <div className=" h-20 p-2 pl-2 pr-4 bg-yellow flex justify-between items-center ">
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
        <div
          id="divDeployNavbar"
          className="bg-yellow h-auto pb-4 w-full origin-top animate-open-menu duration-300"
        >
          <div className="p-4 flex flex-col text-left justify-start select-none">
            <h5
              onClick={() => routeChangeToHome()}
              className="pl-2 hover:pl-4 hover:delay-300 duration-300 font-bold hover:cursor-pointer"
            >
              Volver al home
            </h5>
            <h5
              onClick={() => setCategoryDeploy(!categoryDeploy)}
              className="font-bold mt-4  hover:delay-300 hover:cursor-pointer pl-2 hover:pl-4 duration-300"
            >
              Categorias
            </h5>
            {/* {categoryDeploy && (
              <div className="animate-open-menu origin-top">
                <h6 className="pl-4 hover:pl-6 duration-300 hover:duration-300 hover:cursor-pointer">
                  Tazas
                </h6>
                <h6 className="pl-4 hover:pl-6 duration-300 hover:duration-300 hover:cursor-pointer">
                  Mates
                </h6>
                <h6 className="pl-4 hover:pl-6 duration-300 hover:duration-300 hover:cursor-pointer">
                  Remeras
                </h6>
              </div>
            )} */}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
