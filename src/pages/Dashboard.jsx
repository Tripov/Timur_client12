import React from "react";
import { NavLink, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Users from "../components/Users";
import AdminDoctors from "../components/AdminDoctors";
import AdminApplications from "../components/AdminDoctorApplications";
import AdminAppointments from "../components/AdminAppointments";

import "../styles/sidebar.css"; // ваши стили

const Dashboard = () => {
  const navigate = useNavigate();

  // Функция выхода из системы
  const handleLogout = () => {
    localStorage.removeItem("token"); // Удаляем токен из localStorage
    navigate("/login"); // Перенаправляем на страницу входа
  };

  return (
    <section className="layout-section">
      <div className="layout-container">
        {/* Верхняя панель с кнопкой выхода */}
        <header className="header-container">
          <button className="logout-button" onClick={handleLogout}>
            Выйти
          </button>
        </header>

        {/* Sidebar */}
        <aside className="sidebar-container">
          <ul>
            <li><NavLink to="users">Пользователи</NavLink></li>
            <li><NavLink to="doctors">Врачи</NavLink></li>
            <li><NavLink to="applications">Заявки</NavLink></li>
            <li><NavLink to="appointments">Записи</NavLink></li>
          </ul>
        </aside>

        {/* Основная область */}
        <main className="content-area">
          <Routes>
            <Route path="users" element={<Users />} />
            <Route path="doctors" element={<AdminDoctors />} />
            <Route path="applications" element={<AdminApplications />} />
            <Route path="appointments" element={<AdminAppointments />} />
            {/* если ни один путь не подошёл — редирект на заявки */}
            <Route path="" element={<Navigate to="applications" replace />} />
          </Routes>
        </main>
      </div>
    </section>
  );
};

export default Dashboard;
