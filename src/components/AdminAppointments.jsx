import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const AdminDoctorApplications = () => {
  const [applications, setApplications] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");
  const config = { headers: { Authorization: `Bearer ${token}` } };

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("/api/doctorApplications", config);
      setApplications(data);
    } catch {
      toast.error("Ошибка при загрузке заявок");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!search.trim()) {
      fetchApplications();
      return;
    }
    setLoading(true);
    try {
      const { data } = await axios.get(
        `/api/doctorApplications/search?specialization=${encodeURIComponent(search)}`,
        config
      );
      setApplications(data);
    } catch {
      toast.error("Ошибка при поиске заявок");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Вы действительно хотите удалить эту заявку?")) return;

    try {
      await toast.promise(axios.delete(`/api/doctorApplications/${id}`, config), {
        loading: "Удаление заявки...",
        success: "Заявка успешно удалена",
        error: "Ошибка при удалении заявки",
      });
      fetchApplications();
    } catch {}
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  return (
    <section style={styles.container}>
      <h2 style={styles.title}>Заявки на врачей</h2>

      <div style={styles.searchContainer}>
        <input
          type="text"
          placeholder="Поиск по специализации"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleSearch} style={styles.button}>
          Поиск
        </button>
        <button
          onClick={() => {
            setSearch("");
            fetchApplications();
          }}
          style={{ ...styles.button, backgroundColor: "#777" }}
        >
          Сбросить
        </button>
      </div>

      {loading ? (
        <p style={styles.message}>Загрузка...</p>
      ) : applications.length === 0 ? (
        <p style={styles.message}>Заявок не найдено.</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>ID</th>
              <th style={styles.th}>Специализация</th>
              <th style={styles.th}>Опыт (лет)</th>
              <th style={styles.th}>Оплата (руб)</th>
              <th style={styles.th}>Действия</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app.id} style={styles.tr}>
                <td style={styles.td}>{app.id}</td>
                <td style={styles.td}>{app.specialization}</td>
                <td style={styles.td}>{app.experience}</td>
                <td style={styles.td}>{app.fees}</td>
                <td style={styles.td}>
                  <button
                    onClick={() => handleDelete(app.id)}
                    style={styles.deleteButton}
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
    maxWidth: 900,
    margin: "40px auto",
    padding: "0 20px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: "#333",
  },
  title: {
    textAlign: "center",
    marginBottom: 30,
    fontSize: "28px",
  },
  searchContainer: {
    display: "flex",
    justifyContent: "center",
    marginBottom: 25,
    gap: 12,
    flexWrap: "wrap",
  },
  input: {
    padding: "10px 15px",
    fontSize: "16px",
    width: 300,
    borderRadius: 5,
    border: "1px solid #ccc",
    outline: "none",
    transition: "border-color 0.3s",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    borderRadius: 5,
    border: "none",
    backgroundColor: "#1976d2",
    color: "white",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  message: {
    textAlign: "center",
    fontSize: "18px",
    color: "#555",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  th: {
    borderBottom: "2px solid #1976d2",
    textAlign: "left",
    padding: "12px 15px",
    backgroundColor: "#e3f2fd",
    fontWeight: "600",
  },
  tr: {
    borderBottom: "1px solid #ddd",
  },
  td: {
    padding: "12px 15px",
    verticalAlign: "middle",
  },
  deleteButton: {
    backgroundColor: "#d32f2f",
    color: "white",
    border: "none",
    borderRadius: 4,
    padding: "6px 14px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
};

export default AdminDoctorApplications;
