import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../styles/notification.css";
import Empty from "../components/Empty";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import axios from "axios";
import toast from "react-hot-toast";
import { setLoading } from "../redux/reducers/rootSlice";
import Loading from "../components/Loading";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.root);

  const getAllNotif = async () => {
    try {
      dispatch(setLoading(true));

      // Получение уведомлений с сервера
      const { data } = await axios.get("/notification/getallnotifs", {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`, // Передача токена авторизации
        },
      });

      setNotifications(data.notifications || []); // Предполагается, что сервер возвращает объект с массивом уведомлений
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      toast.error("Не удалось загрузить уведомления.");
    }
  };

  useEffect(() => {
    getAllNotif();
  }, []);

  return (
    <>
      <Navbar />
      {loading ? (
        <Loading />
      ) : (
        <section className="container notif-section">
          <h2 className="page-heading">Ваши уведомления</h2>

          {notifications.length > 0 ? (
            <div className="notifications">
              <table>
                <thead>
                  <tr>
                    <th>№</th>
                    <th>Содержание</th>
                    <th>Дата</th>
                    <th>Время</th>
                  </tr>
                </thead>
                <tbody>
                  {notifications.map((ele, i) => (
                    <tr key={ele?._id}>
                      <td>{i + 1}</td>
                      <td>{ele?.content}</td>
                      <td>{ele?.updatedAt.split("T")[0]}</td>
                      <td>{ele?.updatedAt.split("T")[1].split(".")[0]}</td>
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
      <Footer />
    </>
  );
};

export default Notifications;
