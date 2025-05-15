import React, { useState } from "react";
import "../styles/applyDoctor.css";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

const ApplyDoctor = () => {
  const navigate = useNavigate();
  const [formDetails, setFormDetails] = useState({
    specialization: "",
    experience: "",
    fees: "",
  });

  const inputChange = (e) => {
    const { name, value } = e.target;
    setFormDetails({
      ...formDetails,
      [name]: value,
    });
  };

  const btnClick = async (e) => {
    e.preventDefault();
    try {
      await toast.promise(
        axios.post(
          "/doctorApplications", // Убедитесь, что путь совпадает с серверным
          formDetails, // Отправляем данные напрямую
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`, // Добавлены кавычки
            },
          }
        ),
        {
          success: "Заявка отправлена успешно",
          error: "Не удалось отправить заявку",
          loading: "Отправка заявки...",
        }
      );
      navigate("/"); // Перенаправление на главную страницу
    } catch (error) {
      console.error("Ошибка при отправке заявки:", error);
    }
  };

  return (
    <>
      <Navbar />
      <section className="apply-doctor-section flex-center" id="apply-doctor">
        <div className="apply-doctor-container flex-center">
          <h2 className="form-heading">Подать заявку на врача</h2>
          <p className="form-subheading">Заполните форму ниже, чтобы отправить заявку.</p>
          <form className="apply-doctor-form" onSubmit={btnClick}>
            <input
              type="text"
              name="specialization"
              className="form-input"
              placeholder="Введите свою специализацию"
              value={formDetails.specialization}
              onChange={inputChange}
              required
            />
            <input
              type="number"
              name="experience"
              className="form-input"
              placeholder="Введите свой опыт (в годах)"
              value={formDetails.experience}
              onChange={inputChange}
              required
            />
            <input
              type="text" // Изменён тип ввода для номера телефона
              name="fees"
              className="form-input"
              placeholder="Введите номер телефона"
              value={formDetails.fees}
              onChange={inputChange}
              required
            />
            <button type="submit" className="btn form-btn">
              Отправить
            </button>
          </form>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ApplyDoctor;
