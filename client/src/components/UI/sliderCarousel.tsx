import React, { CSSProperties, useState } from 'react';
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa';

type Props = {
  slides: string[]
}


export default function ImageSlider(props: Props) { 


  const [current, setCurrent] = useState(0);
  
  const length = props.slides.length;
  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(props.slides) || props.slides.length <= 0) {
    return null;
  }

    return (
        <div style={sliderDiv}>
            <FaArrowAltCircleLeft id='left-arrow' style={leftArrow} onClick={prevSlide} />
                {props.slides.map((slide: any, index: number) => {
                    return (   
                          <div
                          className={index === current ? 'slide active' : 'slide'}
                          key={index}
                          >
                          {index === current && (
                              <img id='img-slide' style={img} src={slide} alt='Bilden kunde inte ladda..' />
                              )}
                        </div>   
                    );
                })}
            <FaArrowAltCircleRight id='right-arrow' style={rightArrow} onClick={nextSlide} />
        </div>
    );
};

const sliderDiv: CSSProperties = {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
}

const img: CSSProperties = {
    width: '30vw',
    height: '100%',
    position: 'absolute',
    objectFit: 'contain',
    border: '2px solid black',
    borderRadius: '5px',
    backgroundColor: 'rgb(152, 150, 164)'
}

const leftArrow: CSSProperties = {
    color: 'black',
    /* position: 'relative', */
    top: '50%',
    zIndex: 10,
    right: '30%',
    cursor: 'pointer',
    fontSize: '48px',
    /* marginTop: '6em' */
}

const rightArrow: CSSProperties = {
    color: 'black',
   /*  position: 'relative', */
    top: '50%',
    zIndex: 10,
    left: '30%',
    cursor: 'pointer',
    fontSize: '48px',
    /* marginTop: '6em' */
}
