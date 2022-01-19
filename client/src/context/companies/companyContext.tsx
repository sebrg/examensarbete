import { DocumentData, FieldPath, WhereFilterOp } from 'firebase/firestore'
import { createContext } from 'react'
import { Company, Product } from "../../models"


export interface CompanyOptions {


    addCompany: (company: Company, to: "companies" | "pendingCompanies") => void
    getCurrentUserCompany: () => Promise<Company[]>
    getAllCompanies: (company: "companies" | "pendingCompanies") => Promise<Company[]>
    getCompany: (from: "companies" | "pendingCompanies", fieldPath: string | FieldPath, opStr: WhereFilterOp, value: string | string[]) => Promise<Company[]>
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
    getAllCompanies: (company: "companies" | "pendingCompanies") => {},
    getCompany: (from: "companies" | "pendingCompanies", fieldPath: string | FieldPath, opStr: WhereFilterOp, value: string | string[]) => {},
    updateCompany: (stripeId: string) => {},
    setPaymentEnabled: (enabled: boolean) => {}
        
} as CompanyOptions)