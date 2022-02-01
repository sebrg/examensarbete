import { DocumentData } from 'firebase/firestore';
import React, { CSSProperties, useContext, useEffect, useState } from 'react';
import { FirebaseContext, FirebaseOptions } from '../../context/firebaseContext';
import  CompanyList  from '../company/companyList'
import Button from '../UI/button';
import Slider from '../UI/slider'



export default function Start() {

    const fbFuncs: FirebaseOptions = useContext(FirebaseContext)

   

    
    return (
        <div id="startContentWrapp" className='noScrollBar' style={startContentWrapp}>
   

          <CompanyList/>
        </div>
    );
}

const startContentWrapp: CSSProperties = {
    width: "100%",
    height: "100%",
    overflow: "auto",
}