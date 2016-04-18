//引入第三方模块
var express=require("express");
var mysql=require("mysql");
var session=require("express-session");
var bodyParser=require("body-parser");
var events=require("events");
var path=require("path");
var log4js=require("log4js");
var wechat = require('wechat');
var multer  = require('multer')
var upload = multer({ dest: 'temp/' })

//加载日志
log4js.configure("config/logs4js.json");
//全局变量
global.events=events;
global.mysql=mysql;
global.log=log4js.getLogger("logInfo");
global.rootPaht=__dirname;
global.wechat=wechat;
//自定义中间件
var util=require("./util/util.js");
global.util=util;
global.info=util.loadConfig("info");
var loginRoute=require("./router/loginRoute.js");
global.router=loginRoute;
var dataSource=require("./module/dataSource.js")();
global.dataSource=dataSource;
var adminModule=require("./module/adminModule.js")();
global.adminModule=adminModule;
var newsModule=require("./module/newsModule.js")();
global.newsModule=newsModule;
//定义服务
var app=express();

//设置express的模板引擎
var ejs=require("ejs");
ejs.delimiter="$";
app.set("views",path.join(__dirname,"views"));
app.set("view engine","html");
app.engine(".html",ejs.__express);
//配置post请求
app.use(bodyParser.urlencoded({
	extended:true
}));
//session中间件配置
app.use(bodyParser.json());
app.use(session({
	secret: "!@#$",
	resave: true,
	saveUninitialized: true,
	rolling: true,
	cookie: {
		"maxAge": 1000*100
	}
}));

app.use("/login",loginRoute);
//使用中间件过来所有admin，只有登录或才能进入后台
app.use("/admin",util.checkLogin);
app.use("/admin/admin",require("./router/adminRouter.js"));
app.use("/admin/news",require("./router/newsRouter.js"));

app.use("/API",require("./router/apiRouter.js"));

app.use(express.query());
app.use('/wechat',require("./router/wechat.js") );

app.use('/upfiles',upload.array('upfile[]'), util.upfile);

//定义静态目录
app.use(express.static("./public"));
//请求出错处理
app.use(function(req,res,next){
	if(req.xhr){
		res.status(404).end();
	}else{
		res.status(404).redirect("/404.html");
	}
	
	
});
//内部错误
app.use(function(err,req,res,next){
	if(req.xhr){
		res.status(500).end();
		log.error(err.stack);
	}else{
		res.status(500).redirect("/500.html");
	    log.error(err.stack);
	}
	
	
});
//安全处理
process.on("uncaughtException",function(err){
	console.error(err.stack);
	log.error(err.stack);
});

//创建监听程序
app.listen(80,function(){
	console.log("服务器启动成功");

});