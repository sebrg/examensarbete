import React, { Component } from "react"
import { GeneralContext, GeneralOptions } from "./generalContext"


interface Props{}
export default class GeneralProvider extends Component<Props, GeneralOptions>   {

    state: GeneralOptions = {
        path: this.getPath(),
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



    render() {
        return(
            <GeneralContext.Provider value={this.state}>
                {this.props.children}
            </GeneralContext.Provider>
        )
    }
}

