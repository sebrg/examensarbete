import { relative } from 'node:path/win32';
import React, { CSSProperties, useContext } from 'react';
import { IoMdRemoveCircleOutline } from 'react-icons/io';
import { AiOutlineFileImage } from 'react-icons/ai';
type Props = {
    imgArr: string[] | Blob[] | MediaSource[] | object[] | undefined
    removeFunc: any
}

export default function ImgPreview(props: Props) {
    

    const renderImgPreview = (imgArr: string[] | Blob[] | MediaSource[] | object[]) => {

        return imgArr.map((img: string | Blob | MediaSource | object, i: number) => {
            let previewSrc
            if(typeof(img) === "string") {
                previewSrc = img
            } else {
                previewSrc = URL.createObjectURL(img as Blob)
            }

            return (
                <div key={i} id="uploadPreviewImgWrap" style={{...uploadPreviewImgWrapStyle, }}>
                    <img className='previewImg' style={imgStyle} src={previewSrc as string} />
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
