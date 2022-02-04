import React, { CSSProperties, useContext, useEffect } from 'react';
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
                    <img className='previewImg' style={imgStyle} src={previewSrc as string} alt='Gick inte att hämta bilden..' />
                    <span onClick={() => props.removeFunc(img)} style={removeIconStyle} >    
                         <IoMdRemoveCircleOutline /> 
                    </span>
                </div>
            )
        })
    }

    const renderImgPlaceholders = () => {
        const nrOfImages = props.imgArr === undefined? 0 : props.imgArr.length
        const totalNrOfPlaceholders = [ 1, 2, 3, 4]

        for (let index = 0; index < nrOfImages; index++) {
            totalNrOfPlaceholders.pop()
        }
  
    
        return totalNrOfPlaceholders.map((placeholder) => {
            return (
                <div key={placeholder} className="imgPlaceholder" style={imgPlaceholderStyle}>
                    <AiOutlineFileImage fontSize={"4em"}/>
                </div>
            )
        })

    }

    useEffect(() => {
        
    }, [props.imgArr])

    return (
        
        props.imgArr?
            <div id="imgPreview" style={imgPreviewStyle}>
                {renderImgPreview(props.imgArr)}
                {renderImgPlaceholders()}
            </div>
            :
            <div className='noImgPrev' style={{...imgPreviewStyle }}>
                {renderImgPlaceholders()}
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
