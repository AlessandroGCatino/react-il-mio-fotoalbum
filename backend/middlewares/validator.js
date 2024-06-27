const { checkSchema , validationResult } = require("express-validator");
const { deletePic } = require("../utils")

module.exports = (schema) => {
    return [
        checkSchema(schema),
        (req, res, next) => {
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                if(req.file){
                    const picFolder = "photo_pics";
                    deletePic(picFolder, req.file.filename);
                }
                return res.status(400).json({errors: errors.array()})
            }
            next();
        }
    ]
}