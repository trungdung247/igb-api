"use strict";

const Activity = require('../models/ActivityModels');
const config = require('../config');
const {
  pathImage,
  listLanguages
} = config;
exports.listActivity = function (req, res) {
  const col = 'image title_vi title_en sapo_vi sapo_en detail_vi detail_en';
  Activity.find({}, col).sort({
    created: 'desc'
  }).exec().then(result => {
    let dataResults = [];
    if (result?.length) {
      for (let i = 0; i < result.length; i++) {
        const item = result[i];
        dataResults.push({
          id: item?.id,
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
        message: "Cannot get list activity"
      }
    });
  });
};
exports.listActivityAdmin = function (req, res) {
  const col = 'title_vi title_en sapo_vi sapo_en detail_vi detail_en creator image created updated';
  Activity.find({}, col).sort({
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
        message: "Cannot get list activity"
      }
    });
  });
};
exports.detailActivityAdmin = function (req, res) {
  Activity.findById(req.query.id).populate('creator').then(result => {
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
        message: 'Cannot get detail activity'
      }
    });
  });
};
exports.detailActivity = function (req, res) {
  Activity.findById(req.query.id).then(result => {
    let dataResults = null;
    dataResults = {
      id: result.id,
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
        message: 'Cannot get detail activity'
      }
    });
  });
};
exports.createActivity = async function (req, res) {
  const activity = new Activity(req.body);
  activity.creator = req.session.user._id;
  activity.save().then(result => {
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
        message: 'Cannot save data activity'
      }
    });
  });
};
exports.editActivity = function (req, res) {
  Activity.findById(req.body.id, 'title_vi title_en sapo_vi sapo_en detail_vi detail_en image').then(async result => {
    result.title_vi = req.body.title_vi;
    result.title_en = req.body.title_en;
    result.sapo_vi = req.body.sapo_vi;
    result.sapo_en = req.body.sapo_en;
    result.detail_vi = req.body.detail_vi;
    result.detail_en = req.body.detail_en;
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
        message: 'Cannot edit activity'
      }
    });
  });
};
exports.deleteActivity = function (req, res) {
  Activity.findByIdAndRemove(req.body.id).then(result => {
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
        message: 'Cannot delete activity'
      }
    });
  });
};