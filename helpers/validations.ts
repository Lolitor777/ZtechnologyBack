import { Request, Response } from "express";




export const validateNameUser =  async (nameUser: object, user: any) => {
    try {
        const validateNameUser = await user.findOne({
            where: {
                nameUser
            }
        })
    
        if (validateNameUser) {
            console.log(`El nombre de usuario ${nameUser} no está disponible`);   
        }

        return 0;
    } catch (error) {
        console.log(error);
    }
    
}



    
