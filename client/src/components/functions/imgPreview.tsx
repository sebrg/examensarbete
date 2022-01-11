import { relative } from 'node:path/win32';
import React, { CSSProperties, useContext } from 'react';

type Props = {
    imgArr: any[] | undefined
    removeFunc: any
}

export default function ImgPreview(props: Props) {
    

    const renderImgPreview = (imgArr: any) => {

        return imgArr.map((img: any, i: number) => {
            let previewSrc = URL.createObjectURL(img)
            return (
                <div key={i} style={{position: "relative", border: "1px solid black"}}>
                    <img className='previewImg' style={imgStyle} src={previewSrc} />
                    <span onClick={() => props.removeFunc(img)} style={closeIconStyle} > X </span>
                </div>
            )
        })
    }

    return (
 
        props.imgArr?
            <div id="imgPreview" style={imgPreviewStyle}>
                {renderImgPreview(props.imgArr)}
            </div>
            :
            <p>Ingen förhandsvisning tillgänglig..</p>    
    );
}

const imgPreviewStyle: CSSProperties = {
    height: "35%",
    width: "100%",
    display: "flex"
}

const imgStyle: CSSProperties = {
    height: "100%"
}

const closeIconStyle: CSSProperties = {
    position: "absolute",
    zIndex: "10",
    right: 5,
    fontSize: "1.5em",
    cursor: "pointer"
}