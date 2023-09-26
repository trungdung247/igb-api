"use strict";

const User = require('../models/UserModels');
const bcrypt = require('bcrypt');
exports.register = async function (req, res, next) {
  try {
    const user = await User.findOne({
      email: req.body.email
    });
    if (user == null) {
      //Kiểm tra xem email đã được sử dụng chưa
      bcrypt.hash(req.body.password, 10, function (err, hash) {
        //Mã hóa mật khẩu trước khi lưu vào db
        if (err) {
          return next(err);
        }
        const user = new User(req.body);
        user.password = hash;
        user.password_confirm = hash;
        user.save().then(result => {
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
              message: 'Cannot register user'
            }
          });
        });
      });
    } else {
      res.send({
        status: res.statusCode,
        success: false,
        results: {
          data: null,
          message: 'Email has been used'
        }
      });
    }
  } catch (err) {
    console.log(err);
  }
};
exports.login = async function (req, res) {
  try {
    const user = await User.findOne({
      email: req.body.email
    });
    if (!user) {
      return res.send({
        status: res.statusCode,
        success: false,
        results: {
          data: null,
          message: 'Username and Password are incorrect'
        }
      });
    }
    bcrypt.compare(req.body.password, user.password, (err, result) => {
      if (result === true) {
        req.session.user = user;
        res.send({
          status: res.statusCode,
          success: true,
          results: {
            data: user,
            message: "Success"
          }
        });
      } else {
        return res.send({
          status: res.statusCode,
          success: false,
          results: {
            data: null,
            message: 'Username and Password are incorrect'
          }
        });
      }
    });
  } catch (err) {
    console.log(err);
  }
};
exports.logout = function (req, res) {
  if (req.session) {
    // delete session object
    req.session.destroy(function (err) {
      if (err) {
        return res.send({
          status: res.statusCode,
          success: false,
          results: {
            data: null,
            message: err
          }
        });
      } else {
        res.send({
          status: res.statusCode,
          success: true,
          results: {
            message: "Success"
          }
        });
      }
    });
  }
};