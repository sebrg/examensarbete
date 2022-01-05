import React, { CSSProperties } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function SimpleSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    className: 'sliderInnerDiv',
    autoplay: true,
    arrows: false
   
  };
  return (
    <Slider {...settings}>
      <div>
        <h3 style={regUF}>Registrera ditt UF Företag idag</h3>
      </div>
      <div>
        <h3 style={regUF}>2</h3>
      </div>
      <div>
        <h3 style={regUF}>3</h3>
      </div>
      <div>
        <h3 style={regUF}>4</h3>
      </div>
      <div>
        <h3 style={regUF}>5</h3>
      </div>
    </Slider>
  );

}

const regUF: CSSProperties = {
    textAlign: 'center',
    fontSize: '36px',
    lineHeight: '100px',
    padding: '2%',
    margin: '10px',
    backgroundColor: '#5f9ea0',
    border: '1px solid black',
    borderRadius: '5px'

}




