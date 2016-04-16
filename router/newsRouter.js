var express=require("express");
var router=express.Router();

router.post("/newstypeList",function(req,res,next){

newsModule.newstypeList().on("success",function(rows, fields){
	res.json(rows).end();
}).on("error",function(err){
	return next(err);
});

});

router.post("/newtypeAdd",function(req,res,next){
	
newsModule.newstypeAdd(req.body.typename).on("success",function(rows, fields){
	
	if(rows.insertId){
		res.json(info.message.success).end();
	}else{
		
		res.json(info.error.newtypeAddError).end();
	}
}).on("error",function(error){
	return next(error);
});

});

router.post("/newstypeDel",function(req,res,next){
	
 	newsModule.newstypeDel(req.body.typeid).on("success",function(result,fields){
 		if(result.affectedRows==1){
 			res.json(info.message.success).end();
 		}else{
 			res.json(info.error.newsDel).end();
 		}
 	}).on("error",function(err){
 		return next(err);
 	})
 });
 
 //资讯管理列表的路由
router.post("/newsList",util.creagePage,function(req,res,next){
 


newsModule.newsList(req.page.getStart(),req.page.pageCount).on("success",function(rows, fields){
	
	req.page.data=rows[1];
	req.page.totalPage=Math.ceil(rows[0][0].count/req.page.pageCount);
	res.json(req.page).end();
}).on("error",function(err){
	return next(err);
});
})
 
  router.post("/newsAdd",function(req,res,next){

newsModule.newsAdd(req.body.ntitle,req.session.admin.id,req.body.ncontent,req.body.typeid).on("success",function(result, fields){
	
	if(result.insertId){
		res.json(info.message.success).end();
	}else{
		res.json(info.error.newsAddError).end();
	}
	
}).on("error",function(err){
	return next(err);
});
})
  
  router.post("/newsDel",function(req,res,next){
	
 	newsModule.newsDel(req.body.typeid).on("success",function(result,fields){
 		if(result.affectedRows==1){
 			res.json(info.message.success).end();
 		}else{
 			res.json(info.error.newsDel).end();
 		}
 	}).on("error",function(err){
 		return next(err);
 	})
 });
module.exports=router;