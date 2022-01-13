import { DocumentData } from 'firebase/firestore';
import React, { CSSProperties, useContext, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { FirebaseContext, FirebaseOptions } from '../../../context/firebaseContext';
import DashCompanyNav from './dashCompanyNav';
import DashForCompanyProducts from './dashForCompanyProducts';
import DashForCompanySettings from './dashForCompanySettings';
import DashForCompanyStart from './dashForCompanyStart';




export default function DashForCompany() {

    const fbFuncs: FirebaseOptions = useContext(FirebaseContext)
    const [testState, setTestState] = useState<DocumentData[]>()

/*     const setArr = async () => {
        let test = await fbFuncs.getCurrentUserCompany()
        console.log(test[0].id)
        setTestState(test)
    }

    useEffect(() => {
        setArr()
    }, []) 

    useEffect(() => {
        console.log("state = ", testState)
    }, [testState])
*/
    return (
        <div id="dashContentForCompany" style={{width: "100%", height: "100%"}}>
            <DashCompanyNav />    
            <Routes>
                <Route index element={<DashForCompanyStart/>} />
                <Route path="/settings" element={<DashForCompanySettings/>} />
                <Route path="/products" element={<DashForCompanyProducts/>} />
                
            </Routes>
        </div>
    );
}

