import React, { useContext, useState, useEffect } from "react";

import { Link } from "react-router-dom";
/// Scroll

import { Dropdown } from "react-bootstrap";
import { urlBackend } from "../../config";
/// Image
import profile from "../../../assets/images/profile/pic1.jpg";
import avatar from "../../../assets/images/avatar/1.jpg";

import LogoutPage from './Logout';
import { ThemeContext } from "../../../context/ThemeContext";



const Header = ({ onNote }) => {

  const [country, setCountry] = useState('ENGLISH');
  const [getUsuario, setUsuario] = useState([]);
  const { background, changeBackground } = useContext(ThemeContext);
  function ThemeChange() {
    if (background.value == "light") {
      changeBackground({ value: "dark" });
    } else {
      changeBackground({ value: "light" })
    }
  }
  useEffect(() => {
    const normal = JSON.parse(localStorage.getItem('userDetails'))
    setUsuario(normal)
  }, []);
  return (
    <div className="header">
      <div className="header-content">
        <nav className="navbar navbar-expand">
          <div className="collapse navbar-collapse justify-content-between">
            <div className="header-left">
            </div>
            <ul className="navbar-nav header-right main-notification">
              <Dropdown as="li" className="nav-item dropdown header-profile">
                <Dropdown.Toggle variant="" as="a" className="nav-link i-false c-pointer"
                  role="button" data-toggle="dropdown"
                >
                  <div className="header-info me-3">
                    <span className="fs-16 font-w600 ">{getUsuario.email}</span>
                    <small className="text-end fs-14 font-w400">{getUsuario.usuario?.rol.nombre}</small>
                  </div>
                  

                  {getUsuario.usuario && getUsuario.usuario.imagen ? (
                    <img
                      src={`${urlBackend}/api/v1/core/usuario/imagen-resize/?imagen=${getUsuario.usuario.imagen}`}
                      width={20}
                      alt="User Image"
                    />
                  ) : (
                    <img src={profile} width={20} alt="" />
                  )}


                </Dropdown.Toggle>
                <Dropdown.Menu align="end" className="mt-0 dropdown-menu-end">
                  <Link to="/app-profile" className="dropdown-item ai-icon">
                    <svg
                      id="icon-user1" xmlns="http://www.w3.org/2000/svg" className="text-primary"
                      width={18} height={18} viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
                    >
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx={12} cy={7} r={4} />
                    </svg>
                    <span className="ms-2">Profile </span>
                  </Link>
                  <Link to="/email-inbox" className="dropdown-item ai-icon">
                    <svg id="icon-inbox" xmlns="http://www.w3.org/2000/svg" className="text-success"
                      width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor"
                      strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
                    >
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                    <span className="ms-2">Inbox </span>
                  </Link>
                  <LogoutPage />
                </Dropdown.Menu>
              </Dropdown>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Header;
