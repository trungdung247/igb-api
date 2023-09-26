const Service = require('../models/ServiceModels');
const config = require('../config');
const {pathImage, listLanguages} = config;

exports.listService = function(req, res){
    const col = 'image presen title_vi title_en sapo_vi sapo_en detail_vi detail_en';
    const { offset = 1, limit = 10, type } = req.query;
    Service.find(type == 'hightlight' ? {presen: true} : {}, col).limit(limit * 1).skip((offset - 1) * limit).sort({created: 'asc'}).exec().then((result) => {
        let dataResults = [];
        if(result?.length){
            for(let i = 0; i < result.length; i++){
                dataResults.push({
                    id: result[i].id,
                    creator: result[i].creator,
                    created: result[i].created,
                    presen: result[i].presen,
                    updated: result[i].updated,
                    image: result[i]?.image ? pathImage + result[i].image : "",
                    translation: []
                });
                for(let j = 0; j < listLanguages.length; j++){
                    dataResults[i].translation.push({
                        lang: listLanguages[j],
                        title: result[i][`title_${listLanguages[j]}`],
                        sapo: result[i][`sapo_${listLanguages[j]}`],
                        detail: result[i][`detail_${listLanguages[j]}`]
                    });
                }
            }
        }
        res.send({
            status: res.statusCode,
            success: true,
            results: {
                datas: dataResults,
                message: "Success"
            }
        });
    })
    .catch((err) => {
        res.send({
            status: res.statusCode,
            success: false,
            results: {
                datas: null,
                message: 'Cannot get list service'
            }
        });
    });
}

exports.listServiceAdmin = function(req, res){
    const col = 'title_vi title_en sapo_vi sapo_en detail_vi detail_en creator image presen created updated';
    Service.find({}, col).sort({created: 'desc'}).then((result) => {
        if(result?.length){
            for(let i = 0; i < result.length; i++){
                result[i].image = result[i]?.image ? pathImage + result[i].image : "";
                result[i].id = result[i]._id;
            }
        }
        res.send({
            status: res.statusCode,
            success: true,
            results: {
                datas: result,
                message: "Success"
            }
        });
    })
    .catch((err) => {
        res.send({
            status: res.statusCode,
            success: false,
            results: {
                datas: null,
                message: 'Cannot get list service'
            }
        });
    });
}

exports.detailServiceAdmin = function(req, res){
    Service.findById(req.query.id).populate('creator').then((result) => {
        result.image = result?.image ? pathImage + result.image : "";
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
                message: 'Cannot get detail service'
            }
        });
    });
}

exports.detailService = function(req, res){
    Service.findById(req.query.id).then((result) => {
        let dataResults = null;
        dataResults = {
            id: result.id,
            presen: result?.presen || false,
            image: result?.image ? pathImage + result.image : "",
            translation: []
        };
        for(let i = 0; i < listLanguages?.length; i++){
            dataResults.translation.push({
                lang: listLanguages[i],
                title: result[`title_${listLanguages[i]}`],
                sapo: result[`sapo_${listLanguages[i]}`],
                detail: result[`detail_${listLanguages[i]}`]
            });
        }
        res.send({
            status: res.statusCode,
            success: true,
            results: {
                data: dataResults,
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
                message: 'Cannot get detail service'
            }
        });
    });
}

exports.createService = async function(req, res){
    const service = new Service(req.body);
    service.creator = req.session.user._id;
    service.save().then(result => {
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
                message: 'Cannot save data service'
            }
        });
    });
}

exports.editService = function(req, res){
    Service.findById(req.body.id, 'title_vi title_en sapo_vi sapo_en detail_vi detail_en image').then(async (result) => {
        result.title_vi = req.body.title_vi;
        result.title_en = req.body.title_en;
        result.sapo_vi = req.body.sapo_vi;
        result.sapo_en = req.body.sapo_en;
        result.detail_vi = req.body.detail_vi;
        result.detail_en = req.body.detail_en;
        result.presen = req.body?.presen || false;
        if(req.body?.image){
            result.image = req.body.image;
        }
        
        result.updated = Date.now(); // Change time update
        result.save().then(data => {
            res.send({
                status: res.statusCode,
                success: true,
                results: {
                    data,
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
                message: 'Cannot edit service'
            }
        });
    });
}

exports.deleteService = function(req, res){
    Service.findByIdAndRemove(req.body.id).then((result) => {
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
                message: 'Cannot delete service'
            }
        });
    });
}