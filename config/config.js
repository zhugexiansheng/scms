/**
 * [config description]
 * @description 配置文件是加载生产环境还是测试环境
 * @author xiaoming
 * @date 2016/01/28
 */
var config = null;

if (process && process.env && process.env.NODE_ENV) {
	config = require("./env/" + process.env.NODE_ENV + ".js");
} else {
	config = require("./env/development.js");
}

module.exports = config;