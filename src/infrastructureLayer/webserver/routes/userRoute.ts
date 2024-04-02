import express, { NextFunction, Request, Response, Router } from "express"



export function userRoute(router:Router){

    router.post(
        '/signup',
        (req:Request, res:Response) =>{
            console.log(req.body);
            res.send({message:'signup'})
            
        }
    )

    return router
}

