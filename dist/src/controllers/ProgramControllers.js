"use strict";

const Program = require('../models/ProgramModels');
const config = require('../config');
const {
  pathImage
} = config;
exports.listProgram = function (req, res) {
  const col = 'image link title';
  Program.find({}, col).sort({
    created: 'asc'
  }).exec().then(result => {
    let dataResults = [];
    if (result?.length) {
      for (let i = 0; i < result.length; i++) {
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
  }).catch(err => {
    res.send({
      status: res.statusCode,
      success: false,
      results: {
        datas: [],
        message: "Cannot get list program"
      }
    });
  });
};
exports.listProgramAdmin = function (req, res) {
  const col = 'image link title creator created updated';
  Program.find({}, col).sort({
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
        message: "Cannot get list program"
      }
    });
  });
};
exports.detailProgramAdmin = function (req, res) {
  Program.findById(req.query.id).populate('creator').then(result => {
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
        message: 'Cannot get detail program'
      }
    });
  });
};
exports.createProgram = async function (req, res) {
  const program = new Program(req.body);
  program.creator = req.session.user._id;
  program.save().then(result => {
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
        message: 'Cannot save data program'
      }
    });
  });
};
exports.editProgram = function (req, res) {
  Program.findById(req.body.id, 'image link title').then(async result => {
    if (req.body?.image) {
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
  }).catch(err => {
    res.send({
      status: res.statusCode,
      success: false,
      results: {
        data: null,
        message: 'Cannot edit program'
      }
    });
  });
};
exports.deleteProgram = function (req, res) {
  Program.findByIdAndRemove(req.body.id).then(result => {
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
        message: 'Cannot delete program'
      }
    });
  });
};