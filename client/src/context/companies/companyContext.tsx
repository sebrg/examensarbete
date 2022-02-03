import { DocumentData, FieldPath, WhereFilterOp } from 'firebase/firestore'
import { createContext } from 'react'
import { Company, Product } from "../../models"
import { FbQuery, StatusObject, Order } from '../../types'


export interface CompanyOptions {


    addCompany: (company: Company, to: "companies" | "pendingCompanies") => Promise<StatusObject>
    getCurrentUserCompany: () => Promise<Company[]>
    getAllCompanies: (company: "companies" | "pendingCompanies") => Promise<Company[]>
    updateCompany: (stripeId: string) => void
    setPaymentEnabled: (enabled: boolean) => void
    aproveCompany: (id: string) => void
    removeCompany: (id: string) => void
    getCompany: (from: "companies" | "pendingCompanies", queryOne: FbQuery, queryTwo?: FbQuery) => Promise<Company[]>
    getOrdersByCompany: (userId: string, shippingStatus: string) => Promise<DocumentData>
    orderIsShipped:(orderId: string, shipped: string) => Promise<StatusObject>
    getOrder: (orderId: string) => Promise<Order[]>
    denyCompany: (companyId: string) => void
    updateShipping: (shippingPrice: string, freeShippingOver: string) => Promise<StatusObject>

}


export const CompanyContext = createContext({
    addCompany: (company: Company, to: "companies" | "pendingCompanies") => {},
    getCurrentUserCompany: () => {},
    aproveCompany: (id: string) => {},
    removeCompany: (id: string) => {},
    getAllCompanies: (company: "companies" | "pendingCompanies") => {},
    updateCompany: (stripeId: string) => {},
    setPaymentEnabled: (enabled: boolean) => {},
    getCompany: (from: "companies" | "pendingCompanies", queryOne: FbQuery, queryTwo?: FbQuery) => {},
    getOrdersByCompany: (userId: string, shippingStatus: string) => {},
    orderIsShipped: (orderId: string, shipped: string) => {},
    getOrder: (orderId: string) => {},
    denyCompany: (companyId: string) => {},
    updateShipping: (shippingPrice: string, freeShippingOver: string) => {}





        
} as CompanyOptions)