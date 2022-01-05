import React, { CSSProperties, useContext, useEffect, useState } from 'react';
import { FirebaseContext, FirebaseOptions } from '../../context/firebaseContext';
import Slider from './slider'



export default function Start() {

   



    return (
        <div style={sliderHolder}>
        <Slider></Slider>
        </div>
    );
}

const sliderHolder: CSSProperties = {
    width: "100%", 
    height: "30%",
    backgroundColor: 'none'

}