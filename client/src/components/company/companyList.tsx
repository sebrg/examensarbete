import React, { CSSProperties, useContext, useEffect, useState } from 'react';
import { CompanyContext, CompanyOptions } from '../../context/companies/companyContext';
import SpinnerModal from '../functions/spinnerModal';
import { Company } from '../../types';
import CompanyCard from '../UI/companyCard';



export default function CompanyList() {

    const companyContext: CompanyOptions = useContext(CompanyContext)
    
    const [loading, setLoading] = useState<boolean>(true)    
    const [companies, setCompanies] = useState<Company[]>()


    const getCompanies = async () => {
        const companies = await companyContext.getAllCompanies("companies")
        setCompanies(companies) /* FIXME: Dont set all company data in state */
        setLoading(false)
    }
    
    useEffect(() => {
        getCompanies()
    }, [])
    
    useEffect(() => {
        
    }, [companies])
    
    //<Button  border='1px solid black' key={i} linkTo={`/company/${company.data.name.replace(" ", '').replace("-", "").replace("_", "")}/${company.id}`} buttonText={`${company.data.name}`}></Button>
    return (
        loading?
        <SpinnerModal />
        : <div id="companyView" style={companyView}>
            <div className="contentHeader" style={contentHeader}> 
                <h3>
                    Alla företag
                </h3>
            </div>
            <div id="companyContent" style={companyContent}>
                { 
                companies?    
                    companies.map((company, i) => {
                        return( 
                            <CompanyCard key={i} company={company} />
                        )
                    })
                    :
                    <p>Något fel inträffade.. det finns inga företag att hämta</p>
                } 
            </div>
        </div>    
    );
}

const companyContent: CSSProperties = {
    display: "flex",
    flexWrap: "wrap",
    width: "100%",
    justifyContent: "space-evenly",
    margin: "1em 0 0 0"
}

const companyView: CSSProperties = {
    display: "flex",
    flexDirection: "column",
}

const contentHeader: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: "100%", 
   // height: "10%",
    backgroundColor: '#92A8D1',
    fontSize: '1.5em',
    color: 'white',
    borderBottom: "1px solid black",
    borderBottomLeftRadius: "15px",
    borderBottomRightRadius: "15px",
    position: "sticky",
    top: 0
}