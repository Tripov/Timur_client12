import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const AdminDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [form, setForm] = useState({
    email: "",
    firstname: "",
    lastname: "",
    password: "",
    specialization: "",
    experience: "",
    fees: "",
  });
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const token = localStorage.getItem("token");
  const config = { headers: { Authorization: `Bearer ${token}` } };

  // Загрузка списка всех врачей
  const fetchDoctors = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("/doctor/getalldoctors", config);
      if (Array.isArray(data)) {
        setDoctors(data);
        setFilteredDoctors(data);
      } else {
        console.error("Полученные данные не являются массивом:", data);
        toast.error("Ошибка загрузки данных врачей");
      }
    } catch (err) {
      console.error("Ошибка при загрузке врачей:", err);
      toast.error("Не удалось загрузить список докторов");
    } finally {
      setLoading(false);
    }
  };

  // Обработчик изменения формы
  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  // Регистрация нового доктора
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await toast.promise(
        axios.post(
          "/user/register",
          {
            email: form.email,
            password: form.password,
            firstname: form.firstname,
            lastname: form.lastname,
            role: "doctor",
          },
          config
        ),
        {
          loading: "Регистрируем пользователя…",
          success: "Пользователь создан",
          error: "Ошибка регистрации",
        }
      );

      setForm({
        email: "",
        firstname: "",
        lastname: "",
        password: "",
        specialization: "",
        experience: "",
        fees: "",
      });
      fetchDoctors();
    } catch (err) {
      console.error(err);
      toast.error("Ошибка при регистрации");
    }
  };

  // Удаление доктора
  const handleDelete = async (doctorId) => {
    if (!window.confirm("Удалить доктора?")) return;
    try {
      await toast.promise(
        axios.delete(`/doctor/${doctorId}`, config),
        {
          loading: "Удаляем…",
          success: "Доктор удалён",
          error: "Ошибка при удалении",
        }
      );
      fetchDoctors();
    } catch (err) {
      console.error(err);
      toast.error("Ошибка при удалении доктора");
    }
  };

  // Фильтрация по фамилии при вводе в поиск
  useEffect(() => {
    if (!search.trim()) {
      setFilteredDoctors(doctors);
    } else {
      setFilteredDoctors(
        doctors.filter((doc) =>
          doc.lastname.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [search, doctors]);

  useEffect(() => {
    fetchDoctors();
  }, []);

  return (
    <section style={styles.container}>
      <h2 style={styles.title}>Управление докторами</h2>

      {/* Форма создания нового доктора */}
      <form onSubmit={handleSubmit} style={styles.form}>
        <h3 style={{ marginBottom: 12 }}>Добавить доктора</h3>
        <div style={styles.formGrid}>
          {[
            ["email", "Email"],
            ["password", "Пароль"],
            ["firstname", "Имя"],
            ["lastname", "Фамилия"],
            ["specialization", "Специализация"],
            ["experience", "Опыт (лет)"],
            ["fees", "Оплата (руб)"],
          ].map(([name, placeholder]) => (
            <input
              key={name}
              name={name}
              value={form[name]}
              onChange={handleChange}
              placeholder={placeholder}
              style={styles.input}
              required
              type={name === "password" ? "password" : "text"}
            />
          ))}
        </div>
        <button type="submit" style={styles.button}>
          Создать
        </button>
      </form>

      {/* Поиск по фамилии */}
      <input
        type="text"
        placeholder="Поиск по фамилии..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={styles.searchInput}
      />

      {/* Список докторов */}
      {loading ? (
        <p style={styles.message}>Загрузка...</p>
      ) : filteredDoctors.length === 0 ? (
        <p style={styles.message}>Докторов не найдено.</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              {["Email", "Имя", "Фамилия", "Действия"].map((h) => (
                <th key={h} style={styles.th}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredDoctors.map((doc) => (
              <tr key={doc.id} style={styles.tr}>
                <td style={styles.td}>{doc.email}</td>
                <td style={styles.td}>{doc.firstname}</td>
                <td style={styles.td}>{doc.lastname}</td>
                <td style={styles.td}>
                  <button
                    onClick={() => handleDelete(doc.id)}
                    style={styles.deleteBtn}
                    title="Удалить доктора"
                  >
                    Удалить
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
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
    marginBottom: 30,
    color: "#333",
  },
  form: {
    backgroundColor: "#f9f9f9",
    padding: 20,
    borderRadius: 8,
    marginBottom: 40,
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  formGrid: {
    display: "flex",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 12,
  },
  input: {
    flex: "1 1 200px",
    padding: "10px 12px",
    borderRadius: 4,
    border: "1px solid #ccc",
    fontSize: 16,
    outline: "none",
    transition: "border-color 0.2s",
  },
  button: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "10px 20px",
    fontSize: 16,
    border: "none",
    borderRadius: 4,
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  searchInput: {
    width: "100%",
    padding: "10px 15px",
    marginBottom: 20,
    fontSize: 16,
    borderRadius: 4,
    border: "1px solid #ccc",
    outline: "none",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
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
  deleteBtn: {
    backgroundColor: "#dc3545",
    border: "none",
    color: "#fff",
    padding: "6px 12px",
    borderRadius: 4,
    cursor: "pointer",
    fontSize: 14,
  },
  message: {
    textAlign: "center",
    color: "#666",
    fontSize: 18,
  },
};

export default AdminDoctors;
