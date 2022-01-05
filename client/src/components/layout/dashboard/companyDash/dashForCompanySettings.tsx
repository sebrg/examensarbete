import React, { CSSProperties, useContext, useEffect, useState } from 'react';
import { FirebaseContext, FirebaseOptions } from '../../../../context/firebaseContext';




export default function DashForCompanySettings() {

    const fbFuncs: FirebaseOptions = useContext(FirebaseContext)



    return (
        <p>this is DashForCompanySettings</p>
    );
}

