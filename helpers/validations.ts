export const validateNameUser = async (nameUser: object, model: any) => {
    
    const validateNameUser = await model.findOne({
        where: {
            nameUser
        }
    });

    if (validateNameUser) {
        return `El nombre de usuario ${nameUser} no está disponible`;
    }
};


export const validateEmail = async (email: object, model: any) => {

    const validateEmail = await model.findOne({
        where: {
            email
        }
    });

    if (validateEmail) {
        return  `El correo electrónico ${email} no está disponible`      
    }  
};


export const validateDocument = async (document_number: any, model: any) => {
    
    const validateDocument = await model.findOne({
        where: {
            document_number
        }
    })

    if (!validateDocument) {
        return `El numero de documento ${document_number} no se encuentra registrado`     
    }
}



