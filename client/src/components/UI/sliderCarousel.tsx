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
            <FaArrowAltCircleLeft style={leftArrow} onClick={prevSlide} />
                {props.slides.map((slide: any, index: number) => {
                    return (
                        <div
                        className={index === current ? 'slide active' : 'slide'}
                        key={index}
                        >
                        {index === current && (
                            <img style={img} src={slide} alt='Bilden kunde inte ladda..' />
                            )}
                    </div>
                    );
                })}
            <FaArrowAltCircleRight style={rightArrow} onClick={nextSlide} />
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
    height: '50vh',
    position: 'absolute',
    objectFit: 'contain',
    border: '1px solid black',
    borderRadius: '5px'
}

const leftArrow: CSSProperties = {
    color: 'white',
    position: 'relative',
    top: '50%',
    zIndex: 99,
    right: '30%',
    cursor: 'pointer',
    fontSize: '48px',
    marginTop: '8em'
}

const rightArrow: CSSProperties = {
    color: 'white',
    position: 'relative',
    top: '50%',
    zIndex: 99,
    left: '30%',
    cursor: 'pointer',
    fontSize: '48px',
    marginTop: '8em'
}
