
import { CollectionReference } from 'firebase/firestore';
import React, { CSSProperties, useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';

export default function Policy() {


    return (

        <div id="policyWrapper" className='noScrollBar' style={policyDiv}>
            <Helmet>
                <title>{`Marung - Policy`}</title>
            </Helmet>
            <h1 style={{textAlign: 'center'}}>Köpvillkor</h1>

            <h2>Ångerrätt</h2>
            <h3 style={{marginTop: '1em'}}>14 dagars ångerrätt</h3>
            <p style={{marginTop: '1em'}}>Som företagare på Marung är du skyldig att erbjuda samt informera dina köpare 14 dagars ångerrätt oavsett ordervärde, enligt lag (2005:59) om distansavtal och avtal utanför affärslokaler. Ångerrätten börjar gälla när du och köpare ingår i köpeavtalet. Köparen har 14 dagars ångerfrist från dagen efter denne har mottagit varan. Köparen har rätt att ångra köpet, skicka tillbaka varan och få pengarna tillbaka utan dröjsmål. Som företagssäljare behöver du före köpet informera köparen om vem som ansvarar för kostnaden vid en eventuell returfrakt. Om detta inte sker innan köpet är gjort ansvarar du som säljare för kostnaden vid en retur.</p>
            
            <h2 style={{marginTop: '1em'}}>Betalning</h2>
            <h3 style={{marginTop: '1em'}}>Hur betalar jag?</h3>
            <p>Betalning sker med Stripe, vi erbjuder inget köpskydd från vår sida, det är mellan säljare och köpare.</p>

            <h2 style={{marginTop: '1em'}}>Frakt</h2>
            <h3 style={{marginTop: '1em'}}>Hur vet säljaren vart varan ska skickas?</h3>
            <p>Säljaren får dina leveransuppgifter automatiskt via oss och kommer boka frakt utifrån vad som är angivet i annonsen. Om du köpt flera varor från samma säljare är det alltid värt att kontakta säljaren och kolla om de har möjlighet att samfrakta varan då det både kostar dig mindre och är bättre för miljön.</p>
            <h3 style={{marginTop: '1em'}}>Hur ändrar jag min adress? </h3>
            <p>Om du vill ha varan skickad till en annan adress så kan du uppdatera adressen på Mina sidor innan säljaren bokar frakten. </p>
        </div>
    );
}

const policyDiv: CSSProperties = {
    display: 'flex',
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    color: 'white',
    padding: '1em',
    overflow: "auto"
  }