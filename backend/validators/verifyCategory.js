const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const verifyRequest = {
    name: {
        notEmpty: {
            errorMessage: 'Inserisci il nome della categoria',
            bail: true
        },
        isLength: {
            options: { min: 3},
            errorMessage: 'Il nome deve essere lungo almeno 3 caratteri',
            bail: true
        },
        isString: {
            errorMessage: 'Il nome deve essere una stringa'
        },
        custom: {
            options: async (value) =>{
                try {
                    const existingCat = await prisma.category.findUnique({
                        where: {
                            name: value
                        }
                    })
                    if(existingCat){
                        throw new Error('Categoria già esistente');
                    }
                    return true;
                } catch(e) {
                    throw e
                }
            }
        }
    }
}

module.exports = { verifyRequest };

