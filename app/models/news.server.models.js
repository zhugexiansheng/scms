/*
 * 数据模型
 * news scahema(用户数据模型)
 * @params(title) 标题
 * @params(content) 内容
 * @params(createTime) 创建时间
 */
var mongoose = require("mongoose");

var NewsSchema = new mongoose.Schema({
	title: String,
	content: String,
	createTime: {type: Date, default: Date.now}
});

var News = mongoose.model('News', NewsSchema);
