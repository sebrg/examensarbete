import React, { CSSProperties, useContext, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Button from '../UI/button';

type CurrentCompany = {
    name: string
    id: string
}
type Props = {
    currentCompany: CurrentCompany | undefined
}


export default function DashUserInfo(props: Props) {

   
    


    return (
        <div>
            {props.currentCompany === undefined?
                <Button buttonText="Ansök om att registrera ditt företag" linkTo={"registerCompany"} />
                : 
                null
            }
        </div>
    );
}

