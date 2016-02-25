/*
 * express route
 * 后端路由控制
 * 即设置请求某个路由时进行的处理
 */
var NewsController = require("../controllers/news.server.controllers");

module.exports = function(app){
	app.route("/news")
		.get(NewsController.list)
		.post(NewsController.create);

	app.route("/news/:nid")
		.get(NewsController.get);

	app.route("/remotenews")
		.get(NewsController.getNewsDetail)
		.post(NewsController.getRemote);

	app.param("nid",NewsController.getById);
};