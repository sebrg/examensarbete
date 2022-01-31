import React, { CSSProperties, useContext, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import DashForCompany from './companyDash/dashForCompany';
import DashOldOrders from './dashOldOrders';
import DashRegisterCompany from './companyDash/dashRegisterCompany';
import DashUserInfo from './dashUserInfo';
import ReqCompanyAuth from '../functions/reqCompanyAuth';
import { Company } from '../../models';


type Props = {
    currentCompany: Pick<Company, "name" | "id"> | undefined
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
                                    <DashForCompany currentCompany={props.currentCompany}/>
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
    padding: "0px 0.5em 0px 0px ",
    overflow: "auto"
}

const userDashContentStyle: CSSProperties = {
    backgroundColor: "rgb(131 159 105)",
    width: "100%",
    height: "100%",
    //borderRadius: "10px",
    color: "white"
}
