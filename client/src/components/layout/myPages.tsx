import { getAuth } from 'firebase/auth';
import React, { CSSProperties, useContext, useEffect, useState } from 'react';
import { useMatch, useNavigate } from 'react-router-dom';
import DashContent from '../dashboard/dashContent';
import DashNav from '../dashboard/dashNav';




export default function MyPages() {


    return (
        <div id="myPagesWrapper" style={myPagesWrapperStyle}>
            
            <DashContent />
            <DashNav />
        </div>
    );
}

const myPagesWrapperStyle: CSSProperties = {
    width: "100%",
    height: "100%",
    display: "flex",
}


