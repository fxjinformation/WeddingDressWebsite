var express=require("express");
var router=express.Router();
//查询所有资讯类型
router.all("/newtype",function(req,res,next){
	newsModule.newstypeList().on("success",function(rows,fields){
		res.send(req.query.cb+'('+JSON.stringify(rows)+')').end();
	}).on("error",function(err){
		return next(err);
	});
	
});
//根据新闻类型查询列表
router.all("/newslist/:tid",function(req,res,next){
	newsModule.getNewsTid(req.params.tid).on("success",function(rows,fields){
		
		res.send(req.query.cb+'('+JSON.stringify(rows)+')').end();
	}).on("error",function(err){
		return next(err);
	});
	
});
//根据新闻编号查新闻
router.all("/newsdetail/:nid",function(req,res,next){
	newsModule.getNewsNid(req.params.nid).on("success",function(rows,fields){
		res.send(req.query.cb+'('+JSON.stringify(rows)+')').end();
	}).on("error",function(err){
		return next(err);
	});
	
});

module.exports=router;