// src/pages/Login.jsx
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/register.css";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../redux/reducers/rootSlice";
import jwt_decode from "jwt-decode";
import fetchData from "../helper/apiCall";
import { FaArrowLeft } from "react-icons/fa";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

function Login() {
  const dispatch = useDispatch();
  const [formDetails, setFormDetails] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const inputChange = (e) => {
    setFormDetails({ ...formDetails, [e.target.name]: e.target.value });
  };

  const formSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formDetails;
    if (!email || !password) {
      return toast.error("Поля не должны быть пустыми");
    }
    if (password.length < 5) {
      return toast.error("Пароль минимум 5 символов");
    }

    try {
      const { data } = await toast.promise(
        axios.post("/user/login", { email, password }),
        {
          pending: "Входим...",
          success: "Успешный вход",
          error: "Не удалось войти",
        }
      );

      // Сохраняем токен и роль
      const decoded = jwt_decode(data.token);
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", decoded.role);

      // Сразу в Redux сохраняем полные данные пользователя
      const user = await fetchData(`/user/getuser/${decoded.userId}`);
      dispatch(setUserInfo(user));

      // Редиректим по роли
      if (decoded.role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      // toast.promise уже показал ошибку
    }
  };

  return (
    <section className="register-section flex-center">
      <div className="register-container flex-center">
        <NavLink to="/" className="back-arrow">
          <FaArrowLeft size={30} />
        </NavLink>
        <h2 className="form-heading">Вход</h2>
        <form onSubmit={formSubmit} className="register-form">
          <input
            type="email"
            name="email"
            className="form-input"
            placeholder="Введите ваш email"
            value={formDetails.email}
            onChange={inputChange}
          />
          <input
            type="password"
            name="password"
            className="form-input"
            placeholder="Введите пароль"
            value={formDetails.password}
            onChange={inputChange}
          />
          <button type="submit" className="btn form-btn">
            Войти
          </button>
        </form>
        <p>
          Ещё нет аккаунта?{" "}
          <NavLink className="login-link" to={"/register"}>
            Зарегистрироваться
          </NavLink>
        </p>
      </div>
    </section>
  );
}

export default Login;
