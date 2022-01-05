import React, { CSSProperties, useContext, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import DashForCompany from './companyDash/dashForCompany';
import DashOldOrders from './dashOldOrders';
import DashRegisterCompany from './companyDash/dashRegisterCompany';
import DashUserInfo from './dashUserInfo';




export default function DashContent() {



    return (
        <div id="userDashFrame" style={userDashFrameStyle}>
            <div id="userDashContent" style={userDashContentStyle}>
                <Routes>
                        <Route index element={<DashUserInfo/>} />
                        <Route path="/oldOrders" element={<DashOldOrders/>} />
                        <Route path="/dashForCompany/*" element={<DashForCompany/>} />
                        <Route path="/registerCompany" element={<DashRegisterCompany/>} />
                </Routes>
            </div>
        </div>
    );
}

const userDashFrameStyle: CSSProperties = {
    width: "80%",
    height: "100%",
    padding: "1em",
}

const userDashContentStyle: CSSProperties = {
    backgroundColor: "rgb(131 159 105)",
    width: "100%",
    height: "100%",
    borderRadius: "10px",
    color: "white"
}
