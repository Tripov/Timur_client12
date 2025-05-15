import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Loading from "./Loading";
import { setLoading } from "../redux/reducers/rootSlice";
import { useDispatch, useSelector } from "react-redux";
import Empty from "./Empty";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

const Users = () => {
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.root);

  const getAllUsers = async () => {
    try {
      dispatch(setLoading(true));
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Вы не авторизованы. Войдите снова.");
        return;
      }
      const { data } = await axios.get("/user/getallusers", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(data);
      dispatch(setLoading(false));
    } catch (error) {
      console.error("Ошибка при получении пользователей:", error);
      if (error.response?.status === 403) {
        toast.error("Сессия истекла. Войдите снова.");
        localStorage.removeItem("token");
      } else {
        toast.error("Не удалось загрузить список пользователей.");
      }
      dispatch(setLoading(false));
    }
  };

  const deleteUser = async (userId) => {
    try {
      const confirm = window.confirm("Вы уверены, что хотите удалить?");
      if (confirm) {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("Вы не авторизованы. Войдите снова.");
          return;
        }
        await toast.promise(
          axios.delete("/user/deleteuser", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            data: { userId },
          }),
          {
            pending: "Удаление...",
            success: "Пользователь успешно удалён",
            error: "Не удалось удалить пользователя",
          }
        );
        getAllUsers();
      }
    } catch (error) {
      console.error("Ошибка при удалении пользователя:", error);
      toast.error("Не удалось удалить пользователя.");
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <section className="user-section">
          <h3 className="home-sub-heading">Все пользователи</h3>
          {users.length > 0 ? (
            <div className="user-container">
              <table>
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Фото</th>
                    <th>Имя</th>
                    <th>Фамилия</th>
                    <th>Email</th>
                    <th>Мобильный</th>
                    <th>Возраст</th>
                    <th>Пол</th>
                    <th>Доктор</th>
                    <th>Удалить</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((ele, i) => (
                    <tr key={ele?.id}>
                      <td>{i + 1}</td>
                      <td>
                        <img
                          className="user-table-pic"
                          src={ele?.pic || "default-image-url.jpg"}
                          alt={ele?.firstname || "User"}
                        />
                      </td>
                      <td>{ele?.firstname}</td>
                      <td>{ele?.lastname}</td>
                      <td>{ele?.email}</td>
                      <td>{ele?.mobile}</td>
                      <td>{ele?.age}</td>
                      <td>{ele?.gender}</td>
                      <td>{ele?.isDoctor ? "Да" : "Нет"}</td>
                      <td>
                        <button
                          className="btn user-btn"
                          onClick={() => deleteUser(ele?.id)}
                        >
                          Удалить
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <Empty />
          )}
        </section>
      )}
    </>
  );
};

export default Users;
