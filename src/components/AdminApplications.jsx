import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Loading from "./Loading";
import { setLoading } from "../redux/reducers/rootSlice";
import { useDispatch, useSelector } from "react-redux";
import Empty from "./Empty";
import fetchData from "../helper/apiCall";
import "../styles/user.css";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

const AdminApplications = () => {
  const [applications, setApplications] = useState([]);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.root);

  const getAllApp = async () => {
    try {
      dispatch(setLoading(true));
      const temp = await fetchData(`/doctor/getnotdoctors`);
      setApplications(temp);
      dispatch(setLoading(false));
    } catch (error) {
      toast.error("Ошибка при загрузке заявок");
    }
  };

  const acceptUser = async (userId) => {
    try {
      const confirm = window.confirm("Вы уверены, что хотите принять заявку?");
      if (confirm) {
        await toast.promise(
          axios.put(
            "/doctor/acceptdoctor",
            { id: userId },
            {
              headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`,
              },
              data: { userId },
            }
          ),
          {
            success: "Заявка принята",
            error: "Не удалось принять заявку",
            loading: "Принятие заявки...",
          }
        );
        getAllApp();
      }
    } catch (error) {
      toast.error("Произошла ошибка при принятии заявки");
    }
  };

  const deleteUser = async (userId) => {
    try {
      const confirm = window.confirm("Вы уверены, что хотите отклонить заявку?");
      if (confirm) {
        await toast.promise(
          axios.put(
            "/doctor/rejectdoctor",
            { id: userId },
            {
              headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`,
              },
              data: { userId },
            }
          ),
          {
            success: "Заявка отклонена",
            error: "Не удалось отклонить заявку",
            loading: "Отклонение заявки...",
          }
        );
        getAllApp();
      }
    } catch (error) {
      toast.error("Произошла ошибка при отклонении заявки");
    }
  };

  useEffect(() => {
    getAllApp();
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <section className="user-section">
          <h3 className="home-sub-heading">Все заявки</h3>
          {applications.length > 0 ? (
            <div className="user-container">
              <table>
                <thead>
                  <tr>
                    <th>№</th>
                    <th>Фото</th>
                    <th>Имя</th>
                    <th>Фамилия</th>
                    <th>Эл. почта</th>
                    <th>Моб. номер</th>
                    <th>Опыт</th>
                    <th>Специализация</th>
                    <th>Гонорар</th>
                    <th>Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {applications?.map((ele, i) => {
                    return (
                      <tr key={ele?._id}>
                        <td>{i + 1}</td>
                        <td>
                          <img
                            className="user-table-pic"
                            src={
                              ele?.userId?.pic ||
                              "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
                            }
                            alt={ele?.userId?.firstname}
                          />
                        </td>
                        <td>{ele?.userId?.firstname}</td>
                        <td>{ele?.userId?.lastname}</td>
                        <td>{ele?.userId?.email}</td>
                        <td>{ele?.userId?.mobile}</td>
                        <td>{ele?.experience}</td>
                        <td>{ele?.specialization}</td>
                        <td>{ele?.fees}</td>
                        <td className="select">
                          <button
                            className="btn user-btn accept-btn"
                            onClick={() => {
                              acceptUser(ele?.userId?._id);
                            }}
                          >
                            Принять
                          </button>
                          <button
                            className="btn user-btn"
                            onClick={() => {
                              deleteUser(ele?.userId?._id);
                            }}
                          >
                            Отклонить
                          </button>
                        </td>
                      </tr>
                    );
                  })}
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

export default AdminApplications;
