import React, { Component } from "react"
import { GeneralContext, GeneralOptions } from "./generalContext"


interface Props{}
export default class GeneralProvider extends Component<Props, GeneralOptions>   {
    state: GeneralOptions = {
        path: this.getPath(),
        amountInCart: this.countCart("return"),
        functions: {
            countCart: this.countCart.bind(this)
        }
    }

    getPath() {
        if(window.location.hostname === "localhost") {
            const path = `http://${window.location.hostname}:3001`  
            return path
        }else {
            const path = 'https://examensarbete-zeta.vercel.app'
            return path
        }
    }

    countCart(setStateOrReturn: "state" | "return") {
        let localst: string | null = localStorage.getItem('cart')
        let currentCart = JSON.parse(localst as string)
        let amount: number = 0
        if(currentCart) {
            currentCart.forEach((cartItem: any) => {
                amount = amount + cartItem.quantity
            })
            if(amount > 0) {
                if(setStateOrReturn === "return") {
                    return amount
                } else if(setStateOrReturn === "state") {
                    this.setState({amountInCart: amount})
                }
            } else {
                if(setStateOrReturn === "return") {
                    return null
                } else if(setStateOrReturn === "state") {
                    this.setState({amountInCart: null})
                }
            }
        } else {
            if(setStateOrReturn === "return") {
                return null
            } else if(setStateOrReturn === "state") {
                this.setState({amountInCart: null})
            }
        }
    }

    render() {
        return(
            <GeneralContext.Provider value={this.state}>
                {this.props.children}
            </GeneralContext.Provider>
        )
    }
}

