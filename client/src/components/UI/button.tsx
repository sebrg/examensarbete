import React, { CSSProperties, ReactElement } from 'react';
import "../../animations.css"
import { Link } from 'react-router-dom';

type Props = {
    buttonText?: string
    bgColor?: string
    width?: string
    minWidth?: string
    height?: string
    onClick?: any
    linkTo?: any
    color?: string
    margin?: string
    id?: string
    backgroundPosition?: string,
    icon?: ReactElement
    iconMargin?: string
    border?: string
}


export default function Button(props: Props) {

 
    return (
        props.linkTo?
            <Link to={props.linkTo} style={LinkStyle}>
                <div 
                    className="customBtn" 
                    id={props.id} 
                    onClick={props.onClick} 
                    style={{
                        ...buttonStyle, 
                        backgroundColor: props.bgColor, 
                        width: props.width, 
                        minWidth: props.minWidth,
                        height: props.height, 
                        color: props.color, 
                        margin: props.margin,
                        backgroundPosition: props.backgroundPosition,
                        justifyContent: "center",
                        border: props.border,
                    }}
                >

                    <p style={centerText}>
                        {props.buttonText}
                    </p>

                    {
                        props.icon?
                            <p style={{margin: props.iconMargin, display: "flex", justifyContent: "center", alignItems: "center"}}>
                                {props.icon}
                            </p>
                        :
                            null
                    }

                </div>
            </Link>
            :
            <div 
                className="customBtn" 
                id={props.id} 
                onClick={props.onClick} 
                style={{
                    ...buttonStyle, 
                    backgroundColor: props.bgColor, 
                    width: props.width, 
                    minWidth: props.minWidth,
                    height: props.height, 
                    color: props.color, 
                    margin: props.margin,
                    backgroundPosition: props.backgroundPosition,
                    justifyContent: "center",
                    border: props.border
                }}
            >

                <p style={centerText}>
                    {props.buttonText}
                </p>

                {
                    props.icon?
                        <p style={{margin: props.iconMargin, display: "flex", justifyContent: "center", alignItems: "center"}}>
                            {props.icon}
                        </p>
                    :
                        null
                }


            </div>
    );
}

const buttonStyle: CSSProperties = {
    padding: "0.5em",
    //border: "1px solid black",
    borderRadius: "5px",
    fontSize: "1.2em",
    display: "flex",
    cursor: "pointer",
    alignItems: "center"
}

const LinkStyle: CSSProperties = {
    display: "flex", 
    textDecoration: "none",
}

const centerText: CSSProperties = {
    textAlign: 'center', 
    fontSize: "0.8em"
}

