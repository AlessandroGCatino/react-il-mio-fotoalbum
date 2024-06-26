const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const verifyRequest = {
    title: {
        notEmpty: {
            errorMessage: 'Inserisci il titolo',
            bail: true
        },
        isLength: {
            options: { min: 5},
            errorMessage: 'Il titolo deve essere lungo almeno 5 caratteri',
            bail: true
        },
        isString: {
            errorMessage: 'Il titolo deve essere una stringa'
        }
    },
    image: {
        notEmpty: {
            errorMessage: "Inserisci l'immagine",
            bail: true
        },
        isLength: {
            options: { min: 5},
            errorMessage: "La stringa dell'immagine deve essere lunga almeno 5 caratteri",
            bail: true
        },
        isString: {
            errorMessage: "L'immagine deve essere una stringa"
        }
    },
    description: {
        notEmpty: {
            errorMessage: "Inserisci la descrizione",
            bail: true
        },
        isLength: {
            options: { min: 1},
            errorMessage: "La stringa della descrizione deve essere lunga almeno 1 carattere",
            bail: true
        },
        isString: {
            errorMessage: "La descrizione deve essere una stringa"
        }
    },
    published: {
        notEmpty: {
            errorMessage: "Dichiara se il post è pubblicato o meno",
            bail: true
        },
        isBoolean: {
            errorMessage: "Il campo published deve contenere true o false",
        },
        toBoolean: true
    },
    categories: {
        in : ["body"],
        notEmpty: {
            errorMessage: "Inserisci almeno una category",
            bail: true
        },
        isArray: {
            errorMessage: "Categories deve essere un array",
            bail: true
        },
        custom: {
            options: async (categories) => {
                try{
                    if(categories.length === 0){
                        throw new Error(`Inserisci almeno una category`);
                    }
                    const checkId = categories.find(categoryID => isNaN(parseInt(categoryID)));
        
                    if(checkId){
                        throw new Error(`Verifica che tutti i category siano numeri interi`);
                    }
                    
                    const intCategories = categories.map(categoryID => {
                        const intCategoryID = parseInt(categoryID, 10);
                        if (isNaN(intCategoryID)) {
                            throw new Error(`Verifica che tutti i category siano numeri interi`);
                        }
                        return intCategoryID;
                    });
    
                    categories = intCategories

                    const linkedCategories = await prisma.category.findMany({
                        where: {
                            id: {
                                in: intCategories
                            }
                        }
                    })
                    if (linkedCategories.length !== categories.length) {
                        throw new Error("Almeno un category inserito non esiste");
                    }
                    return true;
                } catch (e) {
                    throw e;
                }
            }
    
        }
    }
}

module.exports = {verifyRequest}
