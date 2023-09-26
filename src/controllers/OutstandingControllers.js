const Outstanding = require('../models/OutstandingModels');
const config = require('../config');
const {listLanguages} = config;

exports.listOutstanding = function(req, res){
    const col = 'count suffix presen title_vi title_en description_vi description_en';
    Outstanding.find({}, col).sort({created: 'asc'}).exec().then((result) => {
        let dataResults = [];
        if(result?.length){
            for(let i = 0; i < result.length; i++){
                const item = result[i];
                dataResults.push({
                    id: item?.id,
                    count: item?.count,
                    suffix: item?.suffix,
                    presen: item?.presen,
                    translation: []
                });
                for(let j = 0; j < listLanguages.length; j++){
                    dataResults[i].translation.push({
                        lang: listLanguages[j],
                        title: item[`title_${listLanguages[j]}`],
                        description: item[`description_${listLanguages[j]}`]
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
    .catch ((err) => {
        res.send({
            status: res.statusCode,
            success: false,
            results: {
                datas: [],
                message: "Cannot get list project"
            }
        });
    })
}

exports.listOutstandingAdmin = async function(req, res){
    try{
        const col = 'title_vi title_en description_vi description_en count suffix presen created updated';
        const allData = await Outstanding.find({}, col).sort({created: 'desc'});
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
                message: "Cannot get list outstanding"
            }
        });
    }
}

exports.detailOutstandingAdmin = function(req, res){
    Outstanding.findById(req.query.id).then((result) => {
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
                message: 'Cannot get detail outstanding'
            }
        });
    });
}

exports.createOutstanding = function(req, res){
    const data = new Outstanding(req.body);
    data.save().then(result => {
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
                message: 'Cannot save data project'
            }
        });
    });
}

exports.editOutstanding = function(req, res){
    Outstanding.findById(req.body.id, 'title_vi title_en description_vi description_en count suffix presen').then((data) => {
        data.title_vi = req.body.title_vi;
        data.title_en = req.body.title_en;
        data.description_vi = req.body.description_vi;
        data.description_en = req.body.description_en;
        data.count = req.body.count;
        data.presen = req.body?.presen || false;
        data.suffix = req.body.suffix;
        data.updated = Date.now(); // Change time update
        data.save().then(result => {
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
                message: 'Cannot edit outstanding'
            }
        });
    });

}

exports.deleteOutstanding = function(req, res){
    Outstanding.findByIdAndRemove(req.body.id).then((result) => {
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
                message: 'Cannot delete outstanding'
            }
        });
    });
}