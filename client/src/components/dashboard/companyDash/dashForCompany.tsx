import { DocumentData } from 'firebase/firestore';
import React, { CSSProperties, useContext, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { FirebaseContext, FirebaseOptions } from '../../../context/firebaseContext';
import { Company } from '../../../models';
import DashCompanyNav from './dashCompanyNav';
import DashForCompanyOrders from './dashForCompanyOrders';
import DashForCompanyProducts from './dashForCompanyProducts';
import DashForCompanySettings from './dashForCompanySettings';
import DashForCompanyShippedOrders from './dashForCompanyShippedOrders';
import DashForCompanyStart from './dashForCompanyStart';

type Props = {
    currentCompany: Pick<Company, "name" | "id"> | undefined
}

export default function DashForCompany(props: Props) {

    //const fbFuncs: FirebaseOptions = useContext(FirebaseContext)
    //const [testState, setTestState] = useState<DocumentData[]>()


    return (
        <div id="dashContentForCompany" style={{width: "100%", height: "100%"}}>
            <DashCompanyNav />    
            <Routes>
                <Route index element={<DashForCompanyStart/>} />
                <Route path="settings" element={<DashForCompanySettings/>} />
                <Route path="products" element={<DashForCompanyProducts currentCompany={props.currentCompany}/>} />
                <Route path="companyOrders" element={<DashForCompanyOrders/>} />
                <Route path="shippedOrders" element={<DashForCompanyShippedOrders/>} />
                
                
            </Routes>
        </div>
    );
}

