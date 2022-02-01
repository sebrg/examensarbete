import React, { CSSProperties, useContext, useEffect, useState } from 'react';
import { AiOutlineFileAdd } from 'react-icons/ai';
import ImgPreview from './imgPreview';

type Props = {
    style: CSSProperties
    imgArr: string[] | Blob[] | MediaSource[] | object[] | undefined
    setImgArr: (newArr: string[] | Blob[] | MediaSource[] | object[] | undefined) => void
}

export default function ImgUpload(props: Props) {
 
    const updateProductImg = (event: any) => {
        console.log("running updateProductImg function")
        let arr: any[] = []
        if(props.imgArr) {
            arr = [...props.imgArr]
        }
        let files = Object.values(event.target.files)
        files.forEach((file: any) => {
            arr.push(file)
        })        
        props.setImgArr(arr)
    }

    const removeImgFromArr = (img: string | Blob | MediaSource | object) => { 
        if(props.imgArr && props.imgArr.length > 1) {
            let originalArray = [...props.imgArr]
          
            let filteredArray = originalArray.filter(i => i !== img)

            
         
            props.setImgArr(filteredArray as string[] | Blob[] | MediaSource[] | object[] | undefined)
        }
        else {
            props.setImgArr(undefined)
        }
        
        
    }

    return (
        <div id="imgUploadInput" style={props.style}>

            <label style={{position: "relative", minWidth: "20%", height: "100%"}}>
                <div className="uploadBtnDiv" style={uploadBtn}>
                    <AiOutlineFileAdd fontSize={"4em"}/>
                </div>
                <input 
                    style={uploadInputStyle}
                    //placeholder='Ladda upp bild'
                    type="file"
                    accept="image/*"
                    multiple={false}
                    onChange={(event) => updateProductImg(event)}
                />
            </label>

            <ImgPreview imgArr={props.imgArr} removeFunc={removeImgFromArr} />
        </div>
    );
}

const uploadBtn: CSSProperties = {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: "100%",
    backgroundColor: "rgb(146 209 170)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "10px",
}

const uploadInputStyle: CSSProperties = {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    opacity: 0,
    width: "100%",
    cursor: "pointer",
}


