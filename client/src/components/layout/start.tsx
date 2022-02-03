import React, { CSSProperties, useContext, useEffect, useState } from 'react';
import { FirebaseContext, FirebaseOptions } from '../../context/firebaseContext';
import  CompanyList  from '../company/companyList'
import { Helmet } from 'react-helmet-async';



export default function Start() {

    const fbFuncs: FirebaseOptions = useContext(FirebaseContext)

   

    
    return (
        <div id="startContentWrapp" className='noScrollBar' style={startContentWrapp}>
            <Helmet>
                <title>Marung</title>
                <meta name="description" content="Marung, Marknadsplatsen för unga företagare" />
            </Helmet>

            <CompanyList/>
        </div>
    );
}

const startContentWrapp: CSSProperties = {
    width: "100%",
    height: "100%",
    overflow: "auto",
}