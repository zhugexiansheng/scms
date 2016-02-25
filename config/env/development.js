/*
 * 测试环境配置文件
 * @author xiaoming
 * @time 2015/01/24
 */

var webpackConf = require("../../webpack-dev-config");

module.exports = {
	port: 7010,
	mongodb: "mongodb://localhost/scms",
	isDev: true,
	webpackConf: webpackConf
}