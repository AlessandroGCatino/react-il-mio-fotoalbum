const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

const create = async (req, res, next) => {
    try{
        const {name} = req.body;
        const data = {name}
        const newCategory = await prisma.Category.create({data})
        res.status(200).send(newCategory);
    } catch (e) {
        next(e);
    }
}

const show = async (req, res, next) => {
    try {
        const searchedID = req.params.id;
        const category = await prisma.Category.findUnique({
            where: { id: parseInt(searchedID) }
        });
        if (category) {
            res.status(200).json(category);
        } else {
            res.status(404).send({ error: "Category non trovata" });
        }
    } catch (e) {
        next(e);
    }
}

const index = async (req, res, next) => {
    try{
        const categories = await prisma.Category.findMany({});
        res.status(200).send(categories);
    } catch(e) {
        next(e);
    }
}

const update = async (req, res, next) => {
    try{
        const {name} = req.body
        const data = {name}

        const updatedCategory = await prisma.Category.update({
            where: { id: parseInt(req.params.id) },
            data: data
        })
        if (updatedCategory) {
        res.status(200).send({
            message: `Campo name modificato`,
            category: updatedCategory});
        } else {
            res.status(404).send({ error: "Category non trovata" });
        }
    } catch (e) {
        next(e);
    }

}

const destroy = async (req, res, next) => {
    try{
        const deletedCategory = await prisma.Category.delete({
            where: { id: parseInt(req.params.id) }
        });
        res.status(200).send({
            message: `Il Category ${deletedCategory.id} è stato eliminato`,
        });
    } catch (e) {
        next(e);
    }
}

module.exports = { create, show, index, update, destroy };