import React, { useEffect, useState } from "react";
import "../styles/profile.css";
import axios from "axios";
import toast from "react-hot-toast";
import { setLoading } from "../redux/reducers/rootSlice";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/Loading";
import jwt_decode from "jwt-decode";
import { FaArrowLeft  } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

function Profile() {
  const { userId } = jwt_decode(localStorage.getItem("token"));
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.root);
  const [file, setFile] = useState("");
  const [formDetails, setFormDetails] = useState({
    firstname: "",
    lastname: "",
    email: "",
    age: "",
    mobile: "",
    gender: "neither",
    address: "",
    password: "",
    confpassword: "",
  });

  // Получаем данные пользователя при монтировании компонента
  const getUser = async () => {
    try {
      dispatch(setLoading(true));
      const { data } = await axios.get(`/user/getuser/${userId}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setFormDetails({
        ...data,
        password: "",
        confpassword: "",
        mobile: data.mobile || "",
        age: data.age || "",
      });
      setFile(data.pic || "/default-profile-pic.jpg"); // Стандартное изображение, если pic не найдено
      dispatch(setLoading(false));
    } catch (error) {
      toast.error("Ошибка при получении данных пользователя");
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    getUser();
  }, [dispatch]);

  // Обработчик изменения данных в форме
  const inputChange = (e) => {
    const { name, value } = e.target;
    setFormDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  // Обработчик загрузки файла
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(URL.createObjectURL(file)); // Для отображения превью на фронте
    }
  };

  // Обработчик отправки формы для обновления данных
  const formSubmit = async (e) => {
    e.preventDefault();
    const {
      firstname,
      lastname,
      email,
      age,
      mobile,
      address,
      gender,
      password,
      confpassword,
    } = formDetails;

    // Валидация данных
    if (!email) {
      return toast.error("Электронная почта не может быть пустой");
    } else if (firstname.length < 3) {
      return toast.error("Имя должно быть не менее 3 символов");
    } else if (lastname.length < 3) {
      return toast.error("Фамилия должна быть не менее 3 символов");
    } else if (password.length < 5) {
      return toast.error("Пароль должен быть не менее 5 символов");
    } else if (password !== confpassword) {
      return toast.error("Пароли не совпадают");
    }

    // Отправка данных на сервер для обновления
    try {
      await toast.promise(
        axios.put(
          "/user/updateprofile",
          {
            firstname,
            lastname,
            email,
            age,
            mobile,
            address,
            gender,
            password,
            pic: file, // Добавляем аватарку в данные
          },
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        ),
        {
          pending: "Обновление профиля...",
          success: "Профиль успешно обновлен",
          error: "Не удалось обновить профиль",
        }
      );

      // Очистка пароля после успешного обновления
      setFormDetails({ ...formDetails, password: "", confpassword: "" });
    } catch (error) {
      toast.error("Ошибка при обновлении профиля");
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <section className="register-section flex-center">
          <NavLink to="/" className="back-arrow">
            <FaArrowLeft  size={30} />
          </NavLink>
          <div className="profile-container flex-center">
            <h2 className="form-heading">Профиль</h2>
            <div className="profile-pic-container">
              <img src={file} alt="профиль" className="profile-pic" />
              <label className="profile-pic-upload">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="file-input"
                />
                Изменить фото
              </label>
            </div>
            <form onSubmit={formSubmit} className="register-form">
              <div className="form-same-row">
                <input
                  type="text"
                  name="firstname"
                  className="form-input"
                  placeholder="Введите ваше имя"
                  value={formDetails.firstname}
                  onChange={inputChange}
                />
                <input
                  type="text"
                  name="lastname"
                  className="form-input"
                  placeholder="Введите вашу фамилию"
                  value={formDetails.lastname}
                  onChange={inputChange}
                />
              </div>
              <div className="form-same-row">
                <input
                  type="email"
                  name="email"
                  className="form-input"
                  placeholder="Введите ваш email"
                  value={formDetails.email}
                  onChange={inputChange}
                />
                <select
                  name="gender"
                  value={formDetails.gender}
                  className="form-input"
                  id="gender"
                  onChange={inputChange}
                >
                  <option value="neither">Предпочитаю не указывать</option>
                  <option value="male">Мужской</option>
                  <option value="female">Женский</option>
                </select>
              </div>
              <div className="form-same-row">
                <input
                  type="text"
                  name="age"
                  className="form-input"
                  placeholder="Введите ваш возраст"
                  value={formDetails.age}
                  onChange={inputChange}
                />
                <input
                  type="text"
                  name="mobile"
                  className="form-input"
                  placeholder="Введите ваш номер телефона"
                  value={formDetails?.mobile}
                  onChange={inputChange}
                />
              </div>
              <textarea
                name="address"
                className="form-input"
                placeholder="Введите ваш адрес"
                value={formDetails.address}
                onChange={inputChange}
                rows="2"
              ></textarea>
              <div className="form-same-row">
                <input
                  type="password"
                  name="password"
                  className="form-input"
                  placeholder="Введите ваш пароль"
                  value={formDetails.password}
                  onChange={inputChange}
                />
                <input
                  type="password"
                  name="confpassword"
                  className="form-input"
                  placeholder="Подтвердите ваш пароль"
                  value={formDetails.confpassword}
                  onChange={inputChange}
                />
              </div>
              <button type="submit" className="btn form-btn">
                Обновить
              </button>
            </form>
          </div>
        </section>
      )}
    </>
  );
}

export default Profile;
