import React, { CSSProperties, useContext, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import DashForCompany from './companyDash/dashForCompany';
import DashOldOrders from './dashOldOrders';
import DashRegisterCompany from './companyDash/dashRegisterCompany';
import DashUserInfo from './dashUserInfo';
import ReqCompanyAuth from '../functions/reqCompanyAuth';

type CurrentCompany = {
    name: string
    id: string

}
type Props = {
    currentCompany: CurrentCompany | undefined
    companyLoaded: boolean
}

export default function DashContent(props: Props) {



    return (
        <div id="userDashFrame" style={userDashFrameStyle}>
            <div id="userDashContent" style={userDashContentStyle}>
                <Routes>
                        <Route index element={<DashUserInfo currentCompany={props.currentCompany}/>} />
                        <Route path="/oldOrders" element={<DashOldOrders/>} />
                        <Route path="/registerCompany" element={<DashRegisterCompany/>} />
                        
                        <Route 
                            path="/:companyId/*" 
                            element={
                                <ReqCompanyAuth currentCompany={props.currentCompany} companyLoaded={props.companyLoaded}>
                                    <DashForCompany/>
                                </ReqCompanyAuth>
                            } 
                        />
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
