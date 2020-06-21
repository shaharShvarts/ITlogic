import React, { useEffect, useState } from "react";
import Slider from "react-slick";

// import Card from "./Card";
import CardData from "./card.json";
import tableData from "./tableData.json";

import PhiStock from "../PhiStock";

// Css
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Dashboard.css";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [active, setActive] = useState("laptop");
  const [table, setTable] = useState([]);

  const buildRow = () => {
    let tableRow = [];

    tableData.forEach((user) => {
      let info = {
        id: user.id,
        fullName: user.fullName,
        class: user.class,
      };

      if (typeof user[active] === "object") {
        if (Object.keys(user[active]).length > 1) {
          user[active].forEach((item) => {
            tableRow.push({
              ...info,
              category: {
                primary: item.primary,
                model: item.model,
                sn: item.sn,
              },
            });
          });
        } else {
          tableRow.push({
            ...info,
            category: {
              primary: user[active][0].primary,
              model: user[active][0].model,
              sn: user[active][0].sn,
            },
          });
        }
      }
    });
    setTable(tableRow);
  };

  useEffect(() => {
    buildRow();
  }, [active]);

  useEffect(() => {
    setData(CardData);
    buildRow();
  }, [data]);

  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    cssEase: "linear",
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1441,
        settings: {
          dots: true,
          infinite: true,
          speed: 500,
          slidesToShow: 5,
          slidesToScroll: 5,
          cssEase: "linear",
          initialSlide: 0,
        },
      },
      {
        breakpoint: 1281,
        settings: {
          dots: true,
          infinite: true,
          speed: 500,
          slidesToShow: 3,
          slidesToScroll: 3,
          cssEase: "linear",
          initialSlide: 0,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          dots: false,
          infinite: true,
          speed: 500,
          slidesToShow: 3,
          slidesToScroll: 3,
          cssEase: "linear",
          initialSlide: 0,
        },
      },
      {
        breakpoint: 600,
        settings: {
          dots: true,
          infinite: true,
          speed: 500,
          slidesToShow: 2,
          slidesToScroll: 2,
          cssEase: "linear",
          initialSlide: 0,
        },
      },
      {
        breakpoint: 480,
        settings: {
          dots: true,
          infinite: true,
          speed: 500,
          slidesToShow: 1,
          slidesToScroll: 1,
          cssEase: "linear",
          initialSlide: 0,
        },
      },
    ],
  };

  return (
    <div className="dashboard">
      <div className="slider-wrap">
        <ul>
          <Slider {...settings}>
            {data.map((card, index) => (
              <div key={index}>
                <li
                  className={active === card.alt ? "card active" : "card"}
                  onClick={() => setActive(card.alt)}
                >
                  <img src={card.img} alt={card.alt} />
                  <h1>{card.title}</h1>
                </li>
              </div>
            ))}
          </Slider>
        </ul>
      </div>
      <PhiStock table={table} />
    </div>
  );
};

export default Dashboard;
