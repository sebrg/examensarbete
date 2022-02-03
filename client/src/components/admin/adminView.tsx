import React, { CSSProperties, useContext, useEffect, useState } from 'react';
import { UserContext, UserOptions } from '../../context/users/userContext';
import AdminContent from './adminContent';
import AdminNav from './adminNav';




export default function AdminView() {

    const userContext: UserOptions = useContext(UserContext)

    const checkAuth = () => {

    }

    useEffect(() => {
        checkAuth()
    }, [])

    return (
        <div id="adminContentWrapper" style={adminContentWrapper}>
            <AdminNav />
            <AdminContent />
        </div>
    );
}

const adminContentWrapper: CSSProperties = {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    textAlign: "center"
}