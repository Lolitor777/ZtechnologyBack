export const validateNameUser =  async (nameUser: object, user: any) => {
        const validateNameUser = await user.findOne({
            where: {
                nameUser
            }
        })
    
        if (validateNameUser) {
            console.log(`El nombre de usuario ${nameUser} no está disponible`);
            
        }
    } 
    



    
