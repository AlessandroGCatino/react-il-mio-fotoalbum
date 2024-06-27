const {PrismaClient} = require('@prisma/client');
const e = require('express')
const {deletePic} = require("../utils")
const prisma = new PrismaClient();

const index = async(req, res, next) =>{
    try{
        const { title, page=1, photoPerPage=10 } = req.query;
        let { published } = req.query 

        if (published){
            published === "true" ? published = true : published = false
        }

        console.log(title)
        // Paginazione
        const offset = (page - 1) * photoPerPage;
        const totalPhotos = await prisma.Photo.count({ 
            where: {
                published,
                title: {
                    contains: title
                }
            }});
        const totalPages = Math.ceil(totalPhotos / photoPerPage);

        if (totalPages > 0){

            if (page > totalPages) {
                throw new Error("La pagina richiesta non esiste.");
            }
            // Fine Paginazione

            const photos = await prisma.Photo.findMany({
                where:{
                    published,
                    title: {
                        contains: title
                    }
                },
                include: {
                    categories: true
                },
                orderBy: {
                    id: 'desc'
                },
                take: parseInt(photoPerPage),
                skip: offset
            });
            res.status(200).send({photos: photos, page: page, totalPages: totalPages, totalPhotos: totalPhotos});
        } else {
            res.status(200).send({error: "No post found"})
        }
    } catch(e) {
        console.log(e);
        next(e);
    }
}

const create = async(req, res, next) =>{
    try{
        const { title, image, description, published} = req.body;
        let {categories} = req.body;

        // definiamo la struttura di data e il collegamento con le categories
        categories = categories.map(category => parseInt(category, 10))
        const data = {
            title,
            image,
            description,
            published,
            categories : {
                connect: categories.map(categoryId => ({ id: categoryId }))
            }
        }

        if(req.file){
            data.image = `photo_pics/${req.file.filename}`;
        }
        data.published === "false"? data.published = false : data.published = true

        const newPhoto = await prisma.Photo.create({data})
        res.status(200).send(newPhoto);

    } catch (e) {
        if(req.file){
            deletePic('photo_pics', req.file.filename);
        }
        next(e);
    }

}

const show = async(req, res, next) =>{
    try {
        const searchedID = req.params.id;
        const photo = await prisma.Photo.findUnique({
            where: { id: searchedID },
            include: {
                categories: {
                    select: {
                    title: true
                    }
                }
            }
        });
        if (photo) {
            res.status(200).json(photo);
        } else {
            res.status(404).send({ error: "Photo not found" });
        }
    } catch (e) {
        next(e);
    }
}

const update = async(req, res, next) =>{
    try{
        const { title, image, description, published } = req.body;
        const categories = req.body.categories;

        // bonus: verifichiamo se l'utente che sta modificando il photo è l'utente che ha creato il photo
        
        const thisPhoto = await prisma.Photo.findUnique({
            where: {
                id: req.params.id
            }
        });
        

        // definiamo la struttura di data e il collegamento con i categories
        const data = {
            ...(title && { title }),
            ...(image && { image }),
            ...(description && { description }),
            ...(published !== undefined && { published }),
            ...(categories && categories.length > 0 && {
                    categories: {
                        set: categories.map(categoryId => ({ id: categoryId }))
                    }
                })
          }
        const updatedPhoto = await prisma.Photo.update({
            where: { id: req.params.id },
            data: data
        })
        res.status(200).send({
            message: `Campo/i ${Object.keys(data).map(param => param).join(", ")} modificati`,
            photo: updatedPhoto});
    } catch (e) {
        next(e);
    }
}

const destroy = async (req, res, next) => {
    try {
        const photoId = parseInt(req.params.id);
        const photo = await prisma.Photo.findUnique({ where: { id: photoId } });

        if (!photo) {
            return res.status(404).send({ error: "Photo not found, can't delete" });
        }
        const deletedPhoto = await prisma.Photo.delete({ where: { id: photoId } });

        const filePath = path.join(__dirname, 'public', 'photo_pics', deletedPhoto.fileName); // Modifica questo percorso
        fs.unlink(filePath, (err) => {
            if (err) {
                return next(err); // Gestisci l'errore della cancellazione del file
            }

            res.status(200).send({ message: `Photo "${deletedPhoto.id}" eliminata` });
        });
    } catch (e) {
        next(e);
    }
}

module.exports = {
    index,
    create,
    show,
    update,
    destroy
}