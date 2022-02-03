import { AiOutlineMenu } from 'react-icons/ai';
import { CSSProperties } from "react";

type Props = {
    children?: JSX.Element
    setNavToggle: any
    navToggle: boolean
    dropDownRef: React.MutableRefObject<HTMLInputElement>
}
export default function DropDownBtn(props: Props) {

   
    return (
       /*  <div id="dropDownWrapper" style={{padding: "10px"}}> */
            <div ref={props.dropDownRef} id="dropDownBtn" className='loginAlternativeBtn' style={props.navToggle? dropDownStyleOpen: dropDownStyleClosed} onClick={() => props.setNavToggle(!props.navToggle)} >
                <AiOutlineMenu color="white" />
            </div>      
       /*  </div> */
        
    );
}

const dropDownStyleOpen: CSSProperties = {
    fontSize: "2em", 
    display: "flex", 
    alignItems: "center", 
    cursor: "pointer", 
    borderRadius: "25px", 
    padding: "0.2em", 
    border: "2px solid black",
    //width: "100%",
    height: "100%",
    margin: "0 0.2em 0 0"
}

const dropDownStyleClosed: CSSProperties = {
    fontSize: "2em", 
    display: "flex", 
    alignItems: "center", 
    cursor: "pointer", 
    borderRadius: "5px", 
    padding: "0.2em", 
    border: "2px solid black",
    //width: "100%",
    height: "100%",
    margin: "0 0.2em 0 0"

}
