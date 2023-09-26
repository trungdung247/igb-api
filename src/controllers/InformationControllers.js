const Information = require('../models/InformationModels');

exports.listInformationAdmin = async function(req, res){
    try{
        const col = 'key type content_vi content_en created updated';
        const allData = await Information.find({}, col).sort({created: 'desc'});
        if(allData?.length){
            for(let i = 0; i < allData.length; i++){
                allData[i].id = allData[i]._id;
            }
        }
        res.send({
            status: res.statusCode,
            success: true,
            results: {
                datas: allData,
                message: "Success"
            }
        });
    } catch (err){
        res.send({
            status: res.statusCode,
            success: false,
            results: {
                datas: [],
                message: "Cannot get list information"
            }
        });
    }
}

exports.detailInformationAdmin = function(req, res){
    Information.findById(req.query.id).then((result) => {
        res.send({
            status: res.statusCode,
            success: true,
            results: {
                data: result,
                message: "Success"
            }
        });
    })
    .catch((err) => {
        res.send({
            status: res.statusCode,
            success: false,
            results: {
                data: null,
                message: 'Cannot get detail information'
            }
        });
    });
}

exports.createInformation = function(req, res){
    const information = new Information(req.body);
    information.save().then(result => {
        res.send({
            status: res.statusCode,
            success: true,
            results: {
                data: result,
                message: "Success"
            }
        });
    })
    .catch((err) => {
        res.send({
            status: res.statusCode,
            success: false,
            results: {
                data: null,
                message: 'Cannot save data information'
            }
        });
    });
}

exports.editInformation = function(req, res){
    Information.findById(req.body.id, 'key type content_vi content_en').then((result) => {
        if(req.body.key){
            result.key = req.body.key;
        }
        if(req.body.type){
            result.type = req.body.type;
        }
        if(req.body.content_vi){
            result.content_vi = req.body.content_vi;
        }
        if(req.body.content_en){
            result.content_en = req.body.content_en;
        }
        result.updated = Date.now(); // Change time update
        result.save().then(result => {
            res.send({
                status: res.statusCode,
                success: true,
                results: {
                    data: result,
                    message: "Success"
                }
            });
        });
    })
    .catch((err) => {
        res.send({
            status: res.statusCode,
            success: false,
            results: {
                data: null,
                message: 'Cannot edit information'
            }
        });
    });

}

exports.deleteInformation = function(req, res){
    Information.findByIdAndRemove(req.body.id).then((result) => {
        res.send({
            status: res.statusCode,
            success: true,
            results: {
                message: 'Delete success'
            }
        });
    })
    .catch((err) => {
        res.send({
            status: res.statusCode,
            success: false,
            results: {
                data: null,
                message: 'Cannot delete information'
            }
        });
    });
}