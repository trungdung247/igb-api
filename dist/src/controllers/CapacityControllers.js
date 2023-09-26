"use strict";

const Capacity = require('../models/CapacityModels');
const config = require('../config');
const {
  listLanguages
} = config;
exports.listCapacity = function (req, res) {
  const col = 'title_vi title_en detail_vi detail_en';
  Capacity.find({}, col).sort({
    created: 'asc'
  }).exec().then(result => {
    let dataResults = [];
    if (result?.length) {
      for (let i = 0; i < result.length; i++) {
        const item = result[i];
        dataResults.push({
          id: item?.id,
          translation: []
        });
        for (let j = 0; j < listLanguages.length; j++) {
          dataResults[i].translation.push({
            lang: listLanguages[j],
            title: item[`title_${listLanguages[j]}`],
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
        message: "Cannot get list capacity"
      }
    });
  });
};
exports.listCapacityAdmin = function (req, res) {
  const col = 'title_vi title_en detail_vi detail_en creator created updated';
  Capacity.find({}, col).sort({
    created: 'desc'
  }).exec().then(result => {
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
        message: "Cannot get list capacity"
      }
    });
  });
};
exports.detailCapacityAdmin = function (req, res) {
  Capacity.findById(req.query.id).populate('creator').then(result => {
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
        message: 'Cannot get detail capacity'
      }
    });
  });
};
exports.createCapacity = async function (req, res) {
  const capacity = new Capacity(req.body);
  capacity.creator = req.session.user._id;
  capacity.save().then(result => {
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
        message: 'Cannot save data capacity'
      }
    });
  });
};
exports.editCapacity = function (req, res) {
  Capacity.findById(req.body.id, 'title_vi title_en detail_vi detail_en').then(async result => {
    result.title_vi = req.body.title_vi;
    result.title_en = req.body.title_en;
    result.detail_vi = req.body.detail_vi;
    result.detail_en = req.body.detail_en;
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
        message: 'Cannot edit capacity'
      }
    });
  });
};
exports.deleteCapacity = function (req, res) {
  Capacity.findByIdAndRemove(req.body.id).then(result => {
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
        message: 'Cannot delete capacity'
      }
    });
  });
};