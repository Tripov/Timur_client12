import React from "react";
import "../styles/doctorcard.css";

const DoctorCard = ({ ele }) => {
  return (
    <div className="card">
      <div className="card-img flex-center">
        <img
          src={
            ele.pic ||
            "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
          }
          alt="profile"
        />
      </div>
      <h3 className="card-name">
        Dr. {ele.firstname} {ele.lastname}
      </h3>
      <p className="email">
        <strong>Email: </strong> {ele.email}
      </p>
      <p className="phone">
        <strong>Телефон: </strong> {ele.mobile || "Не указан"}
      </p>
    </div>
  );
};

export default DoctorCard;
