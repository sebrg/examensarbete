
export type StatusObject = {
    /**
     ** 200 = OK
     ** 201 = Created
     ** 202 = Accepted
     ** 404 = Not found 
     ** 410 = Gone
     ** 400 = Bad Request
     * */  
    status: 200 | 201 | 202 |  404 | 410 | 400, 
    message: string
}