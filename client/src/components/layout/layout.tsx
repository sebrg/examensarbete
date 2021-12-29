import React, { CSSProperties } from 'react';
import Footer from './footer';
import Header from './header';
import Main from './main';

export default function Layout() {

    return(
        <div id="layoutWrap">
            <Header />
            <Main />
            <Footer />
        </div>
    )
}
