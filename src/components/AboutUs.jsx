import React from "react";
import image from "../images/aboutimg.jpg";

const AboutUs = () => {
  return (
    <>
      <section className="container">
        <h2 className="page-heading about-heading">Больше о нас</h2>
        <div className="about">
          <div className="hero-img">
            <img
              src={image}
              alt="hero"
            />
          </div>
          <div className="hero-content">
            <p>
              Детский оздоровительный центр «Пойду сам» расположен в Самаре на проспекте Ленина, 3, рядом со станцией метро «Алабинская». Основанный в 2013 году, центр специализируется на реабилитации детей с двигательными, речевыми и ментальными нарушениями, включая ДЦП. Основной методикой является авторская программа врача-реабилитолога Дмитрия Сергеевича Муромова.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutUs;
