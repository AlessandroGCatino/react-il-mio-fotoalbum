const {PrismaClient} = require('@prisma/client');
const e = require('express')
const prisma = new PrismaClient();

const index = async(req, res, next) =>{
    try{
        const { title, page=1, photoPerPage=10 } = req.query;
        let { published } = req.query 

        if (published){
            published === "true" ? published = true : published = false
        }

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
    } catch(e) {
        next(e);
    }
}

const create = async(req, res, next) =>{

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

}

const destroy = async (req, res, next) => {
    try {
        const photoId = parseInt(req.params.id);
        const photo = await prisma.Photo.findUnique({ where: { id: photoId } });

        if (!photo) {
            return res.status(404).send({ error: "Photo not found, can't delete" });
        }
        const deletedPhoto = await prisma.Photo.delete({ where: { id: photoId } });

        const filePath = path.join(__dirname, 'public', 'post_pics', deletedPhoto.fileName); // Modifica questo percorso
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