import React from "react";

function DoctorApply() {
  return (
    <section
      style={{
        minHeight: "60vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px 20px",
        backgroundColor: "#f9faff",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: 500,
          backgroundColor: "#ffffff",
          padding: "30px 25px",
          borderRadius: 12,
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
          textAlign: "center",
          color: "#333",
          lineHeight: 1.5,
        }}
      >
        <h2
          style={{
            marginBottom: 20,
            color: "#2c3e50",
            fontWeight: "700",
            fontSize: "1.8rem",
          }}
        >
          Запись недоступна
        </h2>
        <p style={{ fontSize: "1.1rem", marginBottom: 10 }}>
          Приносим свои извинения за предоставленные неудобства, на данный момент
          запись доступна только по звонку.
        </p>
        <p
          style={{
            fontWeight: "600",
            fontSize: "1.2rem",
            color: "#2980b9",
            userSelect: "text",
          }}
        >
          Телефон: <a href="tel:+79171130240" style={{ color: "#2980b9", textDecoration: "none" }}>89171130240</a>
        </p>
      </div>
    </section>
  );
}

export default DoctorApply;
