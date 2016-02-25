/*
 *项目主文件
 */

var express = require("./config/express.js");
var mongodb = require("./config/mongoose.js");

var db = mongodb();
var app = new express();

module.exports = app;