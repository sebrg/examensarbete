import { FieldPath, WhereFilterOp } from "firebase/firestore";

export type FbQuery = {
    fieldPath: string | FieldPath,
    opStr: WhereFilterOp, 
    value: string | string[] | boolean,
}