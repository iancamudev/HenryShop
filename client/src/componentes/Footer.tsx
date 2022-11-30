import { useEffect, useState } from "react";
import { BiCopyright } from "react-icons/bi";
import logoMobile from "../assets/hernyLogoSmall.png";
import { GiHamburgerMenu } from "react-icons/gi";
import {
  GrFacebookOption,
  GrInstagram,
  GrYoutube,
  GrTwitter,
} from "react-icons/gr";
import { FaUserAlt } from "react-icons/fa";
import Searchbar from "./Searchbar";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks";
import { setFiltersAction } from "../redux/slices/FiltersSlice/filtersActions";
import { useShoppingCart } from "./ShoppingCart/ContextShoppingCart";
import { Button } from "react-bootstrap";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import getObjectSession from "../funciones/getObjectSession";
import {
  setUserData,
  clearUserData,
} from "../redux/slices/UserSlice/UserActions";
import axios from "axios";
import axiosGetCall from "../funciones/axiosGetCall";
import NewsLetter from "./newsletter";
import HeaderLink from "./HeaderLink";
import white from "../assets/SH-white2.png";

const widht = window.innerWidth;

const Footer = () => {
  return (
    <div className="py-5 w-full">
      {widht > 800 ? (
        <div className="h-32 bg-yellow flex justify-around items-center">
          <div className="pl-10 text-5xl text-left font-bold">
            CLUB<p>HENRY</p>
          </div>
          <p className="text-left max-w-[600px] pr-2 pl-6">
            ¿Deseas conocer más de nosotros, ser el primero en enterarse de
            nuestros nuevos productos, promociones y mucho más? Déjanos tu
            e-mail...
          </p>
          <NewsLetter />
        </div>
      ) : (
        <div className="pt-4 pb-4  h-auto bg-yellow flex flex-col justify-around items-center gap-2">
          <div className="text-5xl text-left font-bold ">
            CLUB<p>HENRY</p>
          </div>

          <p className="w-52">
            Dejanos tu mail y enterate de ofertas y descuentos!
          </p>
          <NewsLetter />
        </div>
      )}
      <div className="h-40 bg-slate-700 flex flex-col items-center">
        <div className="flex w-full">
          <div className="ml-10 w-2/5 h-5 border-b border-white"></div>
          <div className="w-1/5 mt-3 justify-center flex text-white space-x-10">
            <GrFacebookOption />
            <GrInstagram />
            <GrYoutube />
            <GrTwitter />
          </div>
          <div className="mr-10 w-2/5 h-5 border-b border-white"></div>
        </div>
        <img src={white} className="aboslute h-20 w-48 " />
        <p className="absolute pt-24 flex text-xs text-white">
          Copyright <BiCopyright className="mx-1 mt-0.5" />
          Henry Shop 2022
        </p>
        <div className="flex mt-5 text-sm text-white space-x-5 items-center">
          <div>Acerca de nosotros</div>
          <div className="border-l pl-5 border-white">
            Politica de devoluciones
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
