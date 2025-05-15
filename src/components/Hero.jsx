import React from "react";
import image from "../images/Home1.jpg";
import "../styles/hero.css";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>
          Ваше здоровье, <br /> 
          Наша ответственность
        </h1>
        <p>
          Поддержание здоровья требует сбалансированного питания, регулярных занятий спортом, достаточного отдыха, а также профилактики заболеваний и ухода за психическим состоянием.
        </p>
      </div>
      <div className="hero-img">
        <img
          src={image}
          alt="hero"
        />
      </div>
    </section>
  );
};

export default Hero;
