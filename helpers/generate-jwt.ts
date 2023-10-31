import  jwt  from "jsonwebtoken";

const generatJWT = (id = '') => {

    return new Promise((resolve, reject) => {
        const payload = { id };
        jwt.sign(payload, process.env.SECRETORPRIVATEKEY || '', {
            expiresIn: '4h'
        },(err, token) => {
            if (err) {
                console.log(err);
                reject('No se pudo generar el token')
            } else {
                resolve(token);
            }
        });
    });
}

export default generatJWT;