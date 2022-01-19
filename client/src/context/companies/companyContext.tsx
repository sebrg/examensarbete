import { DocumentData, FieldPath, WhereFilterOp } from 'firebase/firestore'
import { createContext } from 'react'
import { Company, Product } from "../../models"


export interface CompanyOptions {


    addCompany: (company: Company) => void
    getCurrentUserCompany: () => Promise<DocumentData[]>
    getAllCompanies: () => Promise<DocumentData[]>
    getCompany: (fieldPath: string | FieldPath, opStr: WhereFilterOp, value: string | string[]) => Promise<Company[]>
    updateCompany: (stripeId: string) => void,
    setPaymentEnabled: (enabled: boolean) => void
    aproveCompany: (id: string) => void
    removeCompany: (id: string) => void
}


export const CompanyContext = createContext({
    addCompany: (company: Company, to: "companies" | "pendingCompanies") => {},
    getCurrentUserCompany: () => {},
    aproveCompany: (id: string) => {},
    removeCompany: (id: string) => {},
    getAllCompanies: () => {},
    getCompany: (fieldPath: string | FieldPath, opStr: WhereFilterOp, value: string | string[]) => {},
    updateCompany: (stripeId: string) => {},
    setPaymentEnabled: (enabled: boolean) => {}
        
} as CompanyOptions)