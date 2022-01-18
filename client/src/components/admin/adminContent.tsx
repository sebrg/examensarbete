import React, { CSSProperties, useContext, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { FirebaseContext, FirebaseOptions } from '../../context/firebaseContext';
import marungTestBackground from "./../../assets/cartLogoDarker.png"
import AdminStart from './adminStart';
import PendingCompanies from './pendingCompanies';




export default function AdminContent() {

   



    return (
        <div id="adminContent" style={adminContent}>
            <Routes>
                <Route index element={<AdminStart />} />
                <Route path=":pendingCompanies" element={<PendingCompanies/>} />
            </Routes>
        </div>
    );
}

const adminContent: CSSProperties = {
    width: "100%",
    height: "90%",
    display: "flex"
}