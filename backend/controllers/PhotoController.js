const {PrismaClient} = require('@prisma/client');
const e = require('express')
const prisma = new PrismaClient();

const index = async(req, res, next) =>{
    try{
        const { title, page=1, postPerPage=10 } = req.query;
        let { published } = req.query 

        if (published){
            published === "true" ? published = true : published = false
        }

        // Paginazione
        const offset = (page - 1) * postPerPage;
        const totalPosts = await prisma.Post.count({ 
            where: {
                published,
                title: {
                    contains: title
                }
            }});
        const totalPages = Math.ceil(totalPosts / postPerPage);
        if (page > totalPages) {
            throw new Error("La pagina richiesta non esiste.");
        }

        // Fine Paginazione
        const posts = await prisma.Post.findMany({
            where:{
                published,
                title: {
                    contains: title
                }
            },
            include: {
                tags: true
            },
            orderBy: {
                id: 'desc'
            },
            take: parseInt(postPerPage),
            skip: offset
        });
        res.status(200).send({posts: posts, page: page, totalPages: totalPages, totalPosts: totalPosts});
    } catch(e) {
        next(e);
    }
}

const create = async(req, res, next) =>{

}

const show = async(req, res, next) =>{

}

const update = async(req, res, next) =>{

}

const destroy = async(req, res, next) =>{

}

module.exports = {
    index,
    create,
    show,
    update,
    destroy
}