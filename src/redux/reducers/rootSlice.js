import { createSlice } from "@reduxjs/toolkit";

export const rootReducer = createSlice({
  name: "root",
  initialState: {
    loading: true,
    userInfo: {},
    doctors: [],
    appointments: [],
    notifications: [],
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    setDoctors: (state, action) => {
      state.doctors = action.payload;
    },
    setAppointments: (state, action) => {
      state.appointments = action.payload;
    },
    setNotifications: (state, action) => {
      state.notifications = action.payload;
    },
  },
});


export const {
  setLoading,
  setUserInfo,
  setDoctors,
  setAppointments,
  setNotifications,
} = rootReducer.actions;

export default rootReducer.reducer;
