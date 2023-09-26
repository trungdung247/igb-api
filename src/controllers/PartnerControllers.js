const Partner = require('../models/PartnerModels');
const config = require('../../config');
const {pathImage} = config;

exports.listPartner = function(req, res){
    const col = 'image link title';
    Partner.find({}, col).sort({created: 'asc'}).exec().then((result) => {
        let dataResults = [];
        if(result?.length){
            for(let i = 0; i < result.length; i++){
                const item = result[i];
                dataResults.push({
                    id: item?.id,
                    link: item?.link || "",
                    title: item?.title,
                    image: item?.image ? pathImage + item.image : ""
                });
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
                datas: [],
                message: "Cannot get list partner"
            }
        });
    })
}

exports.listPartnerAdmin = function(req, res){
    const col = 'image link title creator created updated';
    Partner.find({}, col).sort({created: 'desc'}).exec().then((result) => {
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
    .catch ((err) => {
        res.send({
            status: res.statusCode,
            success: false,
            results: {
                datas: [],
                message: "Cannot get list partner"
            }
        });
    })
}

exports.detailPartnerAdmin = function(req, res){
    Partner.findById(req.query.id).populate('creator').then((result) => {
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
                message: 'Cannot get detail partner'
            }
        });
    });
}

exports.createPartner = async function(req, res){
    const partner = new Partner(req.body);
    partner.creator = req.session.user._id;
    partner.save().then(result => {
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
                message: 'Cannot save data partner'
            }
        });
    });
}

exports.editPartner = function(req, res){
    Partner.findById(req.body.id, 'image link title').then(async (result) => {
        if(req.body?.image){
            result.image = req.body.image;
        }
        result.link = req.body.link;
        result.title = req.body.title;
        
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
                message: 'Cannot edit partner'
            }
        });
    });
}

exports.deletePartner = function(req, res){
    Partner.findByIdAndRemove(req.body.id).then((result) => {
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
                message: 'Cannot delete partner'
            }
        });
    });
}