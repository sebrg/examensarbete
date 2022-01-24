import React, { CSSProperties, useContext, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Company } from '../../models';
import Button from '../UI/button';
import * as spinners from "react-spinners";
type Props = {
    currentCompany: Pick<Company, "name" | "id"> | undefined
}


export default function DashUserInfo(props: Props) {

   
    


    return (
        <div>
            {props.currentCompany?
                null//<spinners.CircleLoader/>
                : 
                props.currentCompany === undefined?
                    <Button buttonText="Ansök om att registrera ditt företag" linkTo={"registerCompany"} />
                    : 
                    null
            }
        </div>
    );
}

