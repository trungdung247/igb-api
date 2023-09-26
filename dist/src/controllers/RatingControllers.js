"use strict";

const Rating = require('../models/RatingModels');
const config = require('../config');
const {
  listLanguages
} = config;
exports.listRating = function (req, res) {
  const col = 'name_vi name_en review_vi review_en position rating';
  Rating.find({}, col).sort({
    created: 'asc'
  }).exec().then(result => {
    let dataResults = [];
    if (result?.length) {
      for (let i = 0; i < result.length; i++) {
        const item = result[i];
        dataResults.push({
          id: item?.id,
          rating: item?.rating || 1,
          position: item?.position,
          translation: []
        });
        for (let j = 0; j < listLanguages.length; j++) {
          dataResults[i].translation.push({
            lang: listLanguages[j],
            name: item[`name_${listLanguages[j]}`],
            review: item[`review_${listLanguages[j]}`]
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
        message: "Cannot get list rating"
      }
    });
  });
};
exports.listRatingAdmin = function (req, res) {
  const col = 'name_vi name_en review_vi review_en position rating creator created updated';
  Rating.find({}, col).sort({
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
        message: "Cannot get list rating"
      }
    });
  });
};
exports.detailRatingAdmin = function (req, res) {
  Rating.findById(req.query.id).populate('creator').then(result => {
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
        message: 'Cannot get detail rating'
      }
    });
  });
};
exports.createRating = async function (req, res) {
  const rating = new Rating(req.body);
  rating.creator = req.session.user._id;
  rating.save().then(result => {
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
        message: 'Cannot save data rating'
      }
    });
  });
};
exports.editRating = function (req, res) {
  Rating.findById(req.body.id, 'name_vi name_en review_vi review_en position rating').then(async result => {
    result.name_vi = req.body.name_vi;
    result.name_en = req.body.name_en;
    result.review_vi = req.body.review_vi;
    result.review_en = req.body.review_en;
    result.rating = req.body.rating;
    result.position = req.body.position;
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
        message: 'Cannot edit rating'
      }
    });
  });
};
exports.deleteRating = function (req, res) {
  Rating.findByIdAndRemove(req.body.id).then(result => {
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
        message: 'Cannot delete rating'
      }
    });
  });
};