import { DocumentData, FieldPath, WhereFilterOp } from 'firebase/firestore'
import { createContext } from 'react'
import { Company, Product } from "../../models"


export interface CompanyOptions {

    addCompany: (company: Company, to: "companies" | "pendingCompanies") => Promise<void>
    getCurrentUserCompany: () => Promise<Company[]>
    getAllCompanies: (company: "companies" | "pendingCompanies") => Promise<Company[]>
    getCompany: (from: "companies" | "pendingCompanies", fieldPath: string | FieldPath, opStr: WhereFilterOp, value: string | string[]) => Promise<Company[]>

    aproveCompany: (id: string) => void
    removeCompany: (id: string) => void
}


export const CompanyContext = createContext({
    addCompany: (company: Company, to: "companies" | "pendingCompanies") => {},
    getCurrentUserCompany: () => {},
    getAllCompanies: (company: "companies" | "pendingCompanies") => {},
    getCompany: (from: "companies" | "pendingCompanies", fieldPath: string | FieldPath, opStr: WhereFilterOp, value: string | string[]) => {},
    aproveCompany: (id: string) => {},
    removeCompany: (id: string) => {}
} as CompanyOptions)