import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/navbar.css";
import { HashLink } from "react-router-hash-link";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../redux/reducers/rootSlice";
import { FiMenu } from "react-icons/fi";
import { RxCross1 } from "react-icons/rx";
import jwt_decode from "jwt-decode";

const Navbar = () => {
  const [iconActive, setIconActive] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [user, setUser] = useState(
    localStorage.getItem("token")
      ? jwt_decode(localStorage.getItem("token"))
      : ""
  );

  const logoutFunc = () => {
    dispatch(setUserInfo({}));
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Закрытие меню при выборе пункта
  const handleNavLinkClick = () => {
    setIconActive(false);
  };

  return (
    <header>
      <nav className={iconActive ? "nav-active" : ""}>
        <h2 className="nav-logo">
          <NavLink to={"/"}>ПойдуСам</NavLink>
        </h2>
        <ul className="nav-links">
          <li>
            <NavLink to={"/"} onClick={handleNavLinkClick}>
              Главная
            </NavLink>
          </li>
          <li>
            <NavLink to={"/doctors"} onClick={handleNavLinkClick}>
              Врачи
            </NavLink>
          </li>
          {token && user.isAdmin && (
            <li>
              <NavLink to={"/dashboard/users"} onClick={handleNavLinkClick}>
                Dashboard
              </NavLink>
            </li>
          )}
          {token && !user.isAdmin && (
            <>
              <li>
                <NavLink to={"/appointments"} onClick={handleNavLinkClick}>
                  Записи
                </NavLink>
              </li>
              <li>
                <NavLink to={"/notifications"} onClick={handleNavLinkClick}>
                  Уведомления
                </NavLink>
              </li>
              <li>
                <NavLink to={"/applyfordoctor"} onClick={handleNavLinkClick}>
                  Работа
                </NavLink>
              </li>
              <li>
                <HashLink to={"/#contact"} onClick={handleNavLinkClick}>
                  Связаться с нами
                </HashLink>
              </li>
              <li>
                <NavLink to={"/profile"} onClick={handleNavLinkClick}>
                  Профиль
                </NavLink>
              </li>
            </>
          )}
          {!token ? (
            <>
              <li>
                <NavLink className="btn" to={"/login"} onClick={handleNavLinkClick}>
                  Вход
                </NavLink>
              </li>
              <li>
                <NavLink className="btn" to={"/register"} onClick={handleNavLinkClick}>
                  Регистрация
                </NavLink>
              </li>
            </>
          ) : (
            <li>
              <span className="btn" onClick={logoutFunc}>
                Выход
              </span>
            </li>
          )}
        </ul>
      </nav>
      <div className="menu-icons">
        {!iconActive && (
          <FiMenu
            className="menu-open"
            onClick={() => {
              setIconActive(true);
            }}
          />
        )}
        {iconActive && (
          <RxCross1
            className="menu-close"
            onClick={() => {
              setIconActive(false);
            }}
          />
        )}
      </div>
    </header>
  );
};

export default Navbar;
