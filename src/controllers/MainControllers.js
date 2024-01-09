const Service = require('../models/ServiceModels');
const Project = require('../models/ProjectModels');
const config = require('../config');
const {pathImage, listLanguages} = config;

exports.getConfig = async function(req, res){
    const colSer = 'image title_vi title_en sapo_vi sapo_en detail_vi detail_en';
    const colPro = 'image title_vi title_en sapo_vi sapo_en detail_vi detail_en';
    let listServices = [];
    let listProjects = [];

    await Service.find({presen: true}, colSer).limit(4).skip(0).sort({created: 'desc'}).exec().then((result) => {
        if(result?.length){
            for(let i = 0; i < result.length; i++){
                const item = result[i];
                listServices.push({
                    id: item?.id,
                    image: item?.image ? pathImage + item.image : "",
                    translation: []
                });
                for(let j = 0; j < listLanguages.length; j++){
                    listServices[i].translation.push({
                        lang: listLanguages[j],
                        title: item[`title_${listLanguages[j]}`],
                        sapo: item[`sapo_${listLanguages[j]}`],
                        detail: item[`detail_${listLanguages[j]}`]
                    });
                }
            }
        }
    });

    await Project.find({type: 'highlight'}, colPro).sort({created: 'desc'}).exec().then((result) => {
        if(result?.length){
            for(let i = 0; i < result.length; i++){
                const item = result[i];
                listProjects.push({
                    id: item?.id,
                    image: item?.image ? pathImage + item.image : "",
                    translation: []
                });
                for(let j = 0; j < listLanguages.length; j++){
                    listProjects[i].translation.push({
                        lang: listLanguages[j],
                        title: item[`title_${listLanguages[j]}`],
                        sapo: item[`sapo_${listLanguages[j]}`],
                        detail: item[`detail_${listLanguages[j]}`]
                    });
                }
            }
        }
    });

    res.send({
        status: res.statusCode,
        success: true,
        results: {
            datas: {
                listServices, 
                listProjects
            },
            message: "Success"
        }
    });
}