import { configureStore } from "@reduxjs/toolkit";
import rootReducer, { setUserInfo } from "../redux/reducers/rootSlice";  // Импортируем setUserInfo

const store = configureStore({
  reducer: {
    root: rootReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

const loginSuccess = (user, dispatch) => {
  localStorage.setItem("role", user.role); // Сохраняем роль в localStorage
  localStorage.setItem("token", user.token); // Сохраняем токен
  dispatch(setUserInfo(user)); // Сохраняем роль в Redux
};

export { loginSuccess };
export default store;  // Экспортируем store по умолчанию
