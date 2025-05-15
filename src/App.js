import "./styles/app.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Protected, Public, Admin } from "./middleware/route";
import React, { lazy, Suspense } from "react";
import Loading from "./components/Loading";
import ErrorBoundary from "./components/ErrorBoundary"; // ваш компонент

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Doctors = lazy(() => import("./pages/Doctors"));
const Appointments = lazy(() => import("./pages/Appointments"));
const Notifications = lazy(() => import("./pages/Notifications"));
const ApplyDoctor = lazy(() => import("./pages/ApplyDoctor"));
const Profile = lazy(() => import("./pages/Profile"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Error = lazy(() => import("./pages/Error"));

function App() {
  return (
    <Router>
      <Toaster />
      <ErrorBoundary>
        <Suspense fallback={<Loading />}>
          <Routes>
            {/* публичные */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={
              <Public><Register /></Public>
            } />

            {/* защищённые обычные */}
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/appointments" element={
              <Protected><Appointments /></Protected>
            } />
            <Route path="/notifications" element={
              <Protected><Notifications /></Protected>
            } />
            <Route path="/applyfordoctor" element={
              <Protected><ApplyDoctor /></Protected>
            } />
            <Route path="/profile" element={
              <Protected><Profile /></Protected>
            } />

            {/* админ-панель: один общий маршрут */}
            <Route path="/dashboard/*" element={
              <Admin><Dashboard /></Admin>
            } />

            {/* всё остальное — страница ошибки */}
            <Route path="*" element={<Error />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
