import { relative } from 'node:path/win32';
import React, { CSSProperties, useContext } from 'react';
import { IoMdRemoveCircleOutline } from 'react-icons/io';
import { AiOutlineFileImage } from 'react-icons/ai';
type Props = {
    imgArr: any[] | undefined
    removeFunc: any
}

export default function ImgPreview(props: Props) {
    

    const renderImgPreview = (imgArr: any) => {

        return imgArr.map((img: any, i: number) => {
            let previewSrc = URL.createObjectURL(img)
            return (
                <div key={i} id="uploadPreviewImgWrap" style={{...uploadPreviewImgWrapStyle, }}>
                    <img className='previewImg' style={imgStyle} src={previewSrc} />
                    <span onClick={() => props.removeFunc(img)} style={removeIconStyle} >    
                         <IoMdRemoveCircleOutline /> 
                    </span>
                    {/* <IoMdRemoveCircleOutline onClick={() => props.removeFunc(img)} style={closeIconStyle} /> */}
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
            <div className='noImgPrev' style={{...imgPreviewStyle }}>
                <div className="imgPlaceholder" style={imgPlaceholderStyle}>
                    <AiOutlineFileImage fontSize={"4em"}/>
                </div>
            </div>   
    );
}

const imgPreviewStyle: CSSProperties = {
    height: "100%",
    width: "80%",
    display: "flex"
}

const imgStyle: CSSProperties = {
    height: "100%",
    width: "100%",
    objectFit: "contain"
}

const removeIconStyle: CSSProperties = {
    position: "absolute",
    zIndex: "10",
    right: 5,
    fontSize: "1.5em",
    cursor: "pointer"
}

const uploadPreviewImgWrapStyle: CSSProperties = {
    position: "relative",
    backgroundColor: "rgb(146, 168, 209)",
    borderRadius: "10px",
    width: "25%"
}

const imgPlaceholderStyle: CSSProperties = {
    height: "100%", 
    width: "25%", 
    display: "flex", 
    alignItems: "center", 
    justifyContent: "center", 
    backgroundColor: "rgb(146, 168, 209)", 
    borderRadius: "10px",
    opacity: 0.8
}
