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

}


export const CompanyContext = createContext({
    addCompany: (company: Company) => {},
    getCurrentUserCompany: () => {},
    getAllCompanies: () => {},
    getCompany: (fieldPath: string | FieldPath, opStr: WhereFilterOp, value: string | string[]) => {},
    updateCompany: (stripeId: string) => {},
    setPaymentEnabled: (enabled: boolean) => {}
        
} as CompanyOptions)