import React, { useState } from "react";
import "../styles/contact.css";

const Contact = () => {
  const [formDetails, setFormDetails] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [successMessage, setSuccessMessage] = useState(""); // Сообщение об успешной отправке

  const inputChange = (e) => {
    const { name, value } = e.target;
    setFormDetails({
      ...formDetails,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Предотвращаем стандартное поведение формы
    setSuccessMessage("Ваше сообщение успешно отправлено! Спасибо за обращение.");
    setFormDetails({ name: "", email: "", message: "" }); // Очищаем форму
  };

  return (
    <section className="contact-section flex-center" id="contact">
      <div className="contact-container flex-center">
        <h2 className="form-heading">Связаться с нами</h2>
        <p className="form-subheading">Мы будем рады услышать ваше мнение!</p>
        {successMessage && <p className="success-message">{successMessage}</p>}
        <form onSubmit={handleSubmit} className="contact-form">
          <input
            type="text"
            name="name"
            className="form-input"
            placeholder="Ваше Имя"
            value={formDetails.name}
            onChange={inputChange}
            required
          />
          <input
            type="email"
            name="email"
            className="form-input"
            placeholder="Ваш email"
            value={formDetails.email}
            onChange={inputChange}
            required
          />
          <textarea
            name="message"
            className="form-input textarea"
            placeholder="Введите ваше сообщение"
            value={formDetails.message}
            onChange={inputChange}
            rows="6"
            required
          ></textarea>
          <button type="submit" className="btn form-btn">
            Отправить
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
