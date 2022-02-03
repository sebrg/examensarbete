import { AiOutlineShopping } from 'react-icons/ai';
import { CSSProperties, useContext, useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { Link } from "react-router-dom";
import { GeneralContext, GeneralOptions } from "../../context/general/generalContext";

type Props = {
    scrollContentIntoView?: (always: boolean) => void
}

export default function CartBtn(props: Props) {
    
    const generalContext: GeneralOptions = useContext(GeneralContext)
    const auth = getAuth();

    const [amountInCart, setAmountInCart] = useState<number | null>()
    //const [currentCart, setCurrentCart] = useState<string>()


    useEffect(() => {
        setAmountInCart(generalContext.amountInCart)
    }, [generalContext.amountInCart])
    


    
    return (
        <Link to={`/cart/${auth.currentUser?.uid}`} style={linkWrapp} onClick={() => {
            if(props.scrollContentIntoView) {
                props.scrollContentIntoView(true)
            }
        }}>
            <div id="cartBtnWrapper" className="loginAlternativeBtn" style={cartBtnWrapper}>
                <AiOutlineShopping color="white" fontSize={"3em"}/>
                <div id="cartCounter" style={cartCounter}>
                    {amountInCart}
                </div>
            </div>
        </Link>
    );
}

const cartBtnWrapper: CSSProperties = {
    display: "flex",
    border: "2px solid black",
    borderRadius: "5px",
    alignItems: "center",
    position: "relative",
    justifyContent: "center"
    //maxWidth: "3em"
}

const linkWrapp: CSSProperties = {
    display: "flex"
}

const cartCounter: CSSProperties = {
    position: "absolute",
    color: "black",
    //top: "0",
    //right: "0",
    //bottom: 0,
    fontSize: "2em"
}











/*     const countCart = () => {
        let localst: string | null = localStorage.getItem('cart')
        let currentCart = JSON.parse(localst as string)
        let amount: number = 0

        currentCart.forEach((cartItem: any) => {
            amount = amount + cartItem.quantity
        })
        if(amount > 0) {
            setAmountInCart(amount)
        } else {
            setAmountInCart(null)
        }
    } */