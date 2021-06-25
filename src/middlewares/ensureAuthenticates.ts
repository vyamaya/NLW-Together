import { Request, Response, NextFunction } from "express"
import { verify } from "jsonwebtoken"

interface IPayload {
    sub: string
}

export function ensureAuthenticated (request: Request, response: Response, next: NextFunction){

    // receber o token
    const authToken = request.headers.authorization
    
    // validar se token está preenchido
    if(!authToken) {
        return response.status(401).end()
    }

    const [, token] = authToken.split( " " )

    // validar se token é valido

    try {
        const { sub } = verify(token, "7e429fd220ae12f0dd437e7716281e88") as IPayload
        
        // recuperar informações do usuário
        request.user_id = sub

        return next()
    }catch(err) {
        return response.status(401).end()
    }


}