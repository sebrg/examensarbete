
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js';
import React, { CSSProperties, useContext, useEffect, useState } from 'react'
import { Link, Navigate, useMatch } from 'react-router-dom';
import { UserContext, UserOptions } from '../../context/users/userContext';
import { Product } from '../../models';
import Button from '../UI/button';
import CheckoutStripe from './checkoutStripe';
import { UserInfo } from '../../types';
import { BiEdit, BiLogIn } from 'react-icons/bi';
import DashEditUserInfo from '../dashboard/dashEditUserInfo';
import { getAuth } from 'firebase/auth';
import SpinnerModal from '../functions/spinnerModal';

type Cart = {
    companyId: string
    companyName: string
    shippingPrice: number,
    freeShippingOver: number
    stripeId: string
    products: Product[]
}

type Props = {
    setCheckoutOpen: (bool: boolean) => void,
    stripeAccountId: string,
    cartItem: Cart
    isLoggedIn: any
    setLoginToggle: any
}

export default function ToCheckout(props: Props) {

    const userContext: UserOptions = useContext(UserContext)
    const stripePK = 'pk_test_51KCOmfFKFGHIBqJeuHe27RBjAFluqc1kaOArTwLHDQ6H1rIrSPE4HBYMz6O3eHD2V5rqOkR4xBmumJlBdGj04l7J00azQB7MR5'

    const [currentView, setCurrentView] = useState<"start" | "stripe">("start")
    const [stripePromise, setStripePromise] = useState(() => loadStripe(stripePK, {stripeAccount: props.stripeAccountId}))
    const [purchaseTerms, setPurchaseTerms] = useState<boolean>(false)
    const [userInfo, setUserInfo] = useState<UserInfo>()
    const [showOrEdit, setShowOrEdit] = useState<"show" | "edit">("show")
    const [isLogged, setIsLogged] = useState<string | undefined>(undefined)
    const [shouldRedirect, setShouldRedirect] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false) //NOTE: Need some spinners

    const currentCompany = {
        name: props.cartItem.companyName,
        id: props.cartItem.companyId
    }

    const termsIsChecked = (element: any) => {
        if(element.target.checked) {
            setPurchaseTerms(true)
        }
        else {
            setPurchaseTerms(false)
        }
    }


    const idFromUrl = useMatch("cart/:userId/*")?.params.userId;

    const getCurrentUserInfo = async (param: string) => {
        if(param !== undefined) {
            let userInfo = await userContext.getUserInfo(param)
            setUserInfo(userInfo[0]) 
        }
    }

    useEffect(() => {
        getCurrentUserInfo(idFromUrl as string)
    },[])

    useEffect(() => {
        if(showOrEdit === "show") {
            getCurrentUserInfo(idFromUrl as string)
        }
    }, [showOrEdit])

    useEffect(() => {
        console.log(userInfo)
    },[userInfo])

    const auth = () => {
        const auth = getAuth()
        setIsLogged(auth.currentUser?.uid)
    }

     useEffect(() => {
        auth()
    },[props.isLoggedIn])
  
    useEffect(() => {
        getCurrentUserInfo(isLogged as string)
   },[isLogged])

    useEffect(() => {
        
    },[purchaseTerms])

    useEffect(() => { 
        if(props.isLoggedIn) {
            setShouldRedirect(true)
        }
    },[props.isLoggedIn])
    
    useEffect(() => {
        console.log(shouldRedirect)
        if(shouldRedirect === true) {
            setShouldRedirect(false)
        }
    },[shouldRedirect])

    useEffect(() => {
    }, [userInfo])
	
    return (

		<div onClick={() => props.setCheckoutOpen(false)} id='checkout-wrap' style={checkoutWrapper}>
            <div onClick={(event) => event.stopPropagation()} id='checkout-content' style={checkoutContent}>
                  
                    {shouldRedirect?
                        <Navigate to={`/cart/${isLogged}`} replace /> 
                        : null}

                    {isLogged === undefined?
                        <div id='noUserInfo'>
                                <p style={{marginTop: '2em'}}>Du måste logga in först.</p>
                                <Button onClick= {() => {props.setLoginToggle(true); } } icon={<BiLogIn size="2.5em"/>}/> 
                        </div> 
                        : null}
                    
                    {showOrEdit === "edit"? 
                        <DashEditUserInfo idFromUrl={idFromUrl as string} userInfo={userInfo} currentCompany={currentCompany} setShowOrEdit={(showOrEdit) => setShowOrEdit(showOrEdit)}/>
                        : null}

                    {currentView === "stripe"? 
                        <Elements stripe={stripePromise} key={props.stripeAccountId}>
                            <CheckoutStripe stripeAccountId={props.stripeAccountId} cartItem={props.cartItem} purchaseTerms={purchaseTerms} userInfo={userInfo as UserInfo} />
                        </Elements>    
                        : null}

                    

                {currentView === "start"?
                    <div id='checkOutWrapper' style={{height: "100%"}}>
    
                        {userInfo && showOrEdit === "show"?
                            <div id='userinfo-checkout' style={{marginTop: '1em'}}>
                                <h2>Stämmer uppgifterna?</h2>   
                                <p>{userInfo.firstName}</p>
                                <p>{userInfo.surName}</p>
                                <p>{userInfo.city}</p>
                                <p>{userInfo.municipality}</p>
                                <p>{userInfo.zipCode}</p>
                                <p>{userInfo.adress}</p>
                                <div className='btnWrapp' style={{display: "flex", justifyContent: "flex-end"}}>
                                    <Button onClick={() => setShowOrEdit("edit")} icon={<BiEdit size="2.5em"/>}/>
                                </div>
                                <div className='bottomCheckoutDiv' style={{display: "flex", flexDirection: "column", marginTop: "1.5em"}}>
                                    <p style={{fontSize: '1.5em', marginBottom: '1em'}}><input onChange={(event) => termsIsChecked(event)} style={{width: '3vw', height: '3vh'}} type="checkbox"/> Godkänn <Link style={{textDecoration: 'underline', color: 'purple', cursor: 'pointer'}} to={'/Policy'}> köpvillkor </Link> </p>
                                    {
                                    purchaseTerms?
                                        <Button  border='1px solid black' onClick={() => setCurrentView("stripe")} /* width="25vw" */ minWidth='50%' height='5vh' buttonText='Betala med Stripe'></Button>
                                        :
                                        <Button  border='1px solid black' onClick={() => alert('Du måste godkänna köpvillkoren & fylla i uppgifter för leverans')} /* width="25vw" */ minWidth='50%' height='5vh' buttonText='Betala med Stripe'></Button>
                                    }
                                </div>
                                
                            </div>
                            

                            : userInfo === undefined && isLogged?
                                <div id='noUserInfo'>
                                    <p style={{marginTop: '2em'}}>Du måste lägga till uppgifter.</p>
                                    <Button onClick={() => setShowOrEdit("edit")} icon={<BiEdit size="2.5em"/>}/>
                                </div>
                                : null

                        }
                        
                    </div>   
                    : null}
        
            </div>
       

        </div>

  
    );
}

const checkoutWrapper: CSSProperties = {
    position: "absolute",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    display: "flex",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: "98",
    padding: "2em",
    justifyContent: "center",
    alignItems: "center"
}

const checkoutContent: CSSProperties = {
    //width: "100%",
    //height: "70%",
    backgroundColor: "rgb(239, 225, 206)",
    borderRadius: "10px",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "1em",
    minWidth: "280px",
    minHeight: "300px"
}

const inputStyle: CSSProperties = {
    border: "none", 
    width: "100%",
    minHeight: "30px",
    borderTopRightRadius: "10px",
    borderBottomRightRadius: "10px",
    marginBottom: '0.5em'
}     