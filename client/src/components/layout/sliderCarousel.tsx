import React, { CSSProperties, useState } from 'react';
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa';
import { IndexInfo, IndexType } from 'typescript';




export default function ImageSlider() { 

    const slides = [
        {
            image:
              'https://images.unsplash.com/photo-1546768292-fb12f6c92568?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
          },
          {
            image:
              'https://images.unsplash.com/photo-1501446529957-6226bd447c46?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1489&q=80'
          },
          {
            image:
              'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80'
          },
          {
            image:
              'https://images.unsplash.com/photo-1475189778702-5ec9941484ae?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1351&q=80'
          },
          {
            image:
              'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80'
          }
    ]

    console.log(slides)
  const [current, setCurrent] = useState(0);
  
  const length = slides.length;
  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }

    return (
        <div style={sliderDiv}>
            <FaArrowAltCircleLeft style={leftArrow} onClick={prevSlide} />
                {slides.map((slide: any, index: number) => {
                    return (
                        <div
                        className={index === current ? 'slide active' : 'slide'}
                        key={index}
                        >
                        {index === current && (
                            <img style={img} src={slide.image} alt='travel image' />
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
    objectFit: 'cover',
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
