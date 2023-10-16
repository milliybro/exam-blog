import { useState } from "react";
import request from "../../server";

import "./category.scss";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "swiper/css/pagination";

// import { IMG } from "../../const";
import Slider from "react-slick";
import { NavLink} from "react-router-dom";

const CategoryCard = () => {
  const [data, setData] = useState([]);
  const getPopular = async () => {
    try {
      const {
        data: { data },
      } = await request.get("category");
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };
  getPopular();


  var settings = {
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2500,
    autoplaySpeed: 2500,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 850,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="">
      <Slider {...settings} className="categories">
        {data.map((card) => (
          <div
            
            key={card?._id}
            className="catecard"
          >
            <NavLink to={`/category/${card._id}`}>


            <div className="real-card">
              <div className="img_category">
                <img src=""
                  // src={`${IMG + card.photo._id}.${
                  //   card?.photo?.name.split(".")[1]
                  // }`}
                />
              </div>
              <div className="category-text">
                <h3>{card.name}</h3>
                <p className="popular_text">{card.description}</p>
              </div>
            </div>

            </NavLink>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CategoryCard;
