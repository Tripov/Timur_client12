import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const PublicDoctorsList = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  const token = localStorage.getItem("token");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const fetchDoctors = async () => {
    setLoading(true);
    try {
      // Обновлённый путь: /api/user/doctors
      const { data } = await axios.get("http://localhost:7000/api/user/doctors", config);

      // Поддерживаем оба варианта ответа
      const list = Array.isArray(data)
        ? data
        : Array.isArray(data.doctors)
        ? data.doctors
        : [];

      if (list.length === 0) {
        setError("Доктора не найдены");
      } else {
        setDoctors(list);
      }
    } catch (err) {
      console.error("Ошибка при загрузке докторов:", err);
      toast.error("Не удалось загрузить список докторов");
      setError("Ошибка при загрузке данных");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      setError("Пожалуйста, авторизуйтесь");
      setLoading(false);
    } else {
      fetchDoctors();
    }
  }, []);

  if (loading) return <p>Загрузка...</p>;
  if (error)   return <p style={{ color: "red" }}>{error}</p>;

  return (
    <section style={styles.container}>
      <h2 style={styles.title}>Наши доктора</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            {["Имя", "Фамилия", "Почта", "Возраст", "Телефон"].map((hdr) => (
              <th key={hdr} style={styles.th}>{hdr}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {doctors.map(({ id, firstname, lastname, email, age, mobile }) => (
            <tr key={id} style={styles.tr}>
              <td style={styles.td}>{firstname}</td>
              <td style={styles.td}>{lastname}</td>
              <td style={styles.td}>{email}</td>
              <td style={styles.td}>{age ?? "Не указан"}</td>
              <td style={styles.td}>{mobile ?? "Не указан"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

const styles = {
  container: {
    padding: 20,
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    maxWidth: 900,
    margin: "0 auto",
  },
  title: {
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  th: {
    borderBottom: "2px solid #ddd",
    padding: 12,
    textAlign: "left",
    backgroundColor: "#f4f6f8",
    color: "#555",
  },
  tr: {
    transition: "background-color 0.15s",
  },
  td: {
    borderBottom: "1px solid #eee",
    padding: 12,
    color: "#444",
  },
};

export default PublicDoctorsList;
