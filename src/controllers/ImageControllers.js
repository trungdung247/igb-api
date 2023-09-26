const Image = require('../models/ImageModels');
const config = require('../config');
const {pathImage} = config;

exports.uploadImage = function(req, res){
    const module = req.body?.module || "";
    const result = req?.file;
    if(result?.filename){
        const data = {
            module,
            name: result?.filename, 
            path: result?.filename,
            size: result?.size,
            originalName: result?.originalname,
            destination: result?.destination,
            mimeType: result?.mimetype,
            url: pathImage + result?.filename
        };
        const image = new Image(data);
        image.save();

        res.send({
            status: 200,
            success: true,
            results: {
                data,
                message: "Success upload image",
            }
        });
    } else{
        res.send({
            status: 400,
            success: false,
            results: {
                data: null,
                message: "Please upload a valid image",
            }
        });
    }
}