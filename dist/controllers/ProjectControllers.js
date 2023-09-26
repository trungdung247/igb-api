"use strict";

const Project = require('../models/ProjectModels');
const config = require('../config');
const {
  pathImage,
  listLanguages
} = config;
exports.listProject = function (req, res) {
  const col = 'image type title_vi title_en sapo_vi sapo_en detail_vi detail_en';
  const type = req?.query?.type;
  Project.find(type ? {
    type
  } : {}, col).sort({
    created: 'desc'
  }).exec().then(result => {
    let dataResults = [];
    if (result?.length) {
      for (let i = 0; i < result.length; i++) {
        const item = result[i];
        dataResults.push({
          id: item?.id,
          type: item?.type,
          image: item?.image ? pathImage + item.image : "",
          translation: []
        });
        for (let j = 0; j < listLanguages.length; j++) {
          dataResults[i].translation.push({
            lang: listLanguages[j],
            title: item[`title_${listLanguages[j]}`],
            sapo: item[`sapo_${listLanguages[j]}`],
            detail: item[`detail_${listLanguages[j]}`]
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
  }).catch(err => {
    res.send({
      status: res.statusCode,
      success: false,
      results: {
        datas: [],
        message: "Cannot get list project"
      }
    });
  });
};
exports.listProjectAdmin = function (req, res) {
  const col = 'title_vi title_en sapo_vi sapo_en detail_vi detail_en type creator image created updated';
  const type = req?.query?.type;
  Project.find(type ? {
    type
  } : {}, col).sort({
    created: 'desc'
  }).exec().then(result => {
    if (result?.length) {
      for (let i = 0; i < result.length; i++) {
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
  }).catch(err => {
    res.send({
      status: res.statusCode,
      success: false,
      results: {
        datas: [],
        message: "Cannot get list project"
      }
    });
  });
};
exports.detailProjectAdmin = function (req, res) {
  Project.findById(req.query.id).populate('creator').then(result => {
    result.image = result?.image ? pathImage + result.image : "";
    res.send({
      status: res.statusCode,
      success: true,
      results: {
        data: result,
        message: "Success"
      }
    });
  }).catch(err => {
    res.send({
      status: res.statusCode,
      success: false,
      results: {
        data: null,
        message: 'Cannot get detail project'
      }
    });
  });
};
exports.detailProject = function (req, res) {
  Project.findById(req.query.id).then(result => {
    let dataResults = null;
    dataResults = {
      id: result.id,
      type: result?.type,
      image: result?.image ? pathImage + result.image : "",
      translation: []
    };
    for (let i = 0; i < listLanguages?.length; i++) {
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
  }).catch(err => {
    res.send({
      status: res.statusCode,
      success: false,
      results: {
        data: null,
        message: 'Cannot get detail project'
      }
    });
  });
};
exports.createProject = async function (req, res) {
  const project = new Project(req.body);
  project.creator = req.session.user._id;
  project.save().then(result => {
    res.send({
      status: res.statusCode,
      success: true,
      results: {
        data: result,
        message: "Success"
      }
    });
  }).catch(err => {
    res.send({
      status: res.statusCode,
      success: false,
      results: {
        data: null,
        message: 'Cannot save data project'
      }
    });
  });
};
exports.editProject = function (req, res) {
  Project.findById(req.body.id, 'title_vi title_en sapo_vi sapo_en detail_vi detail_en type image').then(async result => {
    result.title_vi = req.body.title_vi;
    result.title_en = req.body.title_en;
    result.sapo_vi = req.body.sapo_vi;
    result.sapo_en = req.body.sapo_en;
    result.detail_vi = req.body.detail_vi;
    result.detail_en = req.body.detail_en;
    result.type = req.body.type;
    if (req.body?.image) {
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
  }).catch(err => {
    res.send({
      status: res.statusCode,
      success: false,
      results: {
        data: null,
        message: 'Cannot edit project'
      }
    });
  });
};
exports.deleteProject = function (req, res) {
  Project.findByIdAndRemove(req.body.id).then(result => {
    res.send({
      status: res.statusCode,
      success: true,
      results: {
        message: 'Delete success'
      }
    });
  }).catch(err => {
    res.send({
      status: res.statusCode,
      success: false,
      results: {
        data: null,
        message: 'Cannot delete project'
      }
    });
  });
};