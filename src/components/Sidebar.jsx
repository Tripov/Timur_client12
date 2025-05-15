import React from "react";
import {
  FaHome,
  FaList,
  FaUser,
  FaUserMd,
  FaUsers,
  FaEnvelope,
} from "react-icons/fa";
import "../styles/sidebar.css";
import { NavLink, useNavigate } from "react-router-dom";
import { MdLogout } from "react-icons/md";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../redux/reducers/rootSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userRole = localStorage.getItem("role"); // Извлекаем роль пользователя из localStorage

  const sidebar = [
    {
      name: "Home",
      path: "/",
      icon: <FaHome />,
    },
    {
      name: "Users",
      path: "/dashboard/users",
      icon: <FaUsers />,
    },
    {
      name: "Doctors",
      path: "/dashboard/doctors",
      icon: <FaUserMd />,
    },
    {
      name: "Appointments",
      path: "/dashboard/appointments",
      icon: <FaList />,
    },
    {
      name: "Applications",
      path: "/dashboard/applications",
      icon: <FaEnvelope />,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: <FaUser />,
    },
  ];

  const logoutFunc = () => {
    dispatch(setUserInfo({}));
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <section className="sidebar-section flex-center">
      <div className="sidebar-container">
        <ul>
          {sidebar.map((ele, i) => {
            // Показывать только те элементы, которые доступны администратору
            if (ele.name === "Users" || ele.name === "Doctors" || ele.name === "Appointments" || ele.name === "Applications" || ele.name === "Profile") {
              return (
                <li key={i}>
                  {ele.icon}
                  <NavLink to={ele.path}>{ele.name}</NavLink>
                </li>
              );
            }
            return null;
          })}
        </ul>
        <div className="logout-container">
          <MdLogout />
          <p onClick={logoutFunc}>Logout</p>
        </div>
      </div>
    </section>
  );
};

export default Sidebar;
