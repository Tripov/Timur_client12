import axios from "axios";

// Установка базового URL из .env
axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

// Общая функция API-запросов
const apiCall = async (url, options = {}) => {
  try {
    const token = localStorage.getItem("token"); // Получение токена из localStorage

    const headers = {
      Authorization: `Bearer ${token}`,
      ...options.headers, // Добавить дополнительные заголовки, если нужны
    };

    // Выполнение API-запроса
    const response = await axios({
      url,
      method: options.method || "GET", // По умолчанию метод GET
      headers,
      data: options.data || {}, // Для POST/PUT запросов
      params: options.params || {}, // Для GET с query params
    });

    return response.data; // Возвращаем только данные
  } catch (error) {
    console.error("API Call Error:", error);
    throw error.response?.data || error.message; // Бросаем ошибку дальше
  }
};

// Готовые функции для эндпоинтов

export const userAPI = {
  login: (credentials) => apiCall("/user/login", { method: "POST", data: credentials }),
  register: (userData) => apiCall("/user/register", { method: "POST", data: userData }),
  getProfile: () => apiCall("/user/profile"),
};

export const doctorAPI = {
  getAll: () => apiCall("/doctor"),
  add: (doctorData) => apiCall("/doctor/add", { method: "POST", data: doctorData }),
  update: (doctorData) => apiCall("/doctor/update", { method: "PUT", data: doctorData }),
  delete: (doctorId) => apiCall(`/doctor/delete/${doctorId}`, { method: "DELETE" }),
};

export const appointmentAPI = {
  getAll: () => apiCall("/appointment"),
  create: (appointmentData) => apiCall("/appointment/create", { method: "POST", data: appointmentData }),
  updateStatus: (appointmentId, status) =>
    apiCall(`/appointment/update/${appointmentId}`, { method: "PUT", data: { status } }),
};

export const notificationAPI = {
  getAll: () => apiCall("/notification"),
  markAsRead: (notificationId) =>
    apiCall(`/notification/read/${notificationId}`, { method: "PUT" }),
};

export default apiCall;
