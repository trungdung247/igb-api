const Team = require('../models/TeamModels');
const config = require('../config');
const {pathImage} = config;

exports.listTeam = function(req, res){
    const col = 'image name position manager link_linkedin link_facebook link_github link_twitter';
    const manager = req?.query?.manager;
    Team.find(manager ? {manager} : {}, col).sort({created: 'asc'}).exec().then((result) => {
        let dataResults = [];
        if(result?.length){
            for(let i = 0; i < result.length; i++){
                const item = result[i];
                dataResults.push({
                    id: item?.id,
                    image: item?.image ? pathImage + item.image : "",
                    name: item?.name,
                    position: item?.position,
                    manager: item?.manager,
                    socials: [
                        {
                            icon: 'linkedin',
                            link: item?.link_linkedin
                        },
                        {
                            icon: 'facebook',
                            link: item?.link_facebook
                        },
                        {
                            icon: 'github',
                            link: item?.link_github
                        },
                        {
                            icon: 'twitter',
                            link: item?.link_twitter
                        }
                    ]
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
                message: "Cannot get list team"
            }
        });
    })
}

exports.listTeamAdmin = function(req, res){
    const col = 'image name position manager link_linkedin link_facebook link_github link_twitter';
    Team.find({}, col).sort({created: 'desc'}).exec().then((result) => {
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
                message: "Cannot get list team"
            }
        });
    })
}

exports.detailTeamAdmin = function(req, res){
    Team.findById(req.query.id).populate('creator').then((result) => {
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
                message: 'Cannot get detail team'
            }
        });
    });
}

exports.createTeam = async function(req, res){
    const team = new Team(req.body);
    team.creator = req.session.user._id;
    team.save().then(result => {
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
                message: 'Cannot save data team'
            }
        });
    });
}

exports.editTeam = function(req, res){
    Team.findById(req.body.id, 'image name position manager link_linkedin link_facebook link_github link_twitter').then(async (result) => {
        if(req.body?.image){
            result.image = req.body.image;
        }
        result.name = req.body.name;
        result.position = req.body.position;
        result.link_linkedin = req.body.link_linkedin;
        result.link_facebook = req.body.link_facebook;
        result.link_github = req.body.link_github;
        result.link_twitter = req.body.link_twitter;
        result.manager = req.body.manager;
        
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
                message: 'Cannot edit team'
            }
        });
    });
}

exports.deleteTeam = function(req, res){
    Team.findByIdAndRemove(req.body.id).then((result) => {
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
                message: 'Cannot delete team'
            }
        });
    });
}