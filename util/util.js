var fs=require("fs");
var path=require("path");
//加载配置函数
exports.loadConfig=function(filename){
	var path=rootPaht+"/config/"+filename+".json";
	var data=fs.readFileSync(path);
	return JSON.parse(data);
}

//检测是否登录
exports.checkLogin=function(req,res,next){

	if(!req.session.admin){
	return	res.redirect("/login.html");
	}else{
		next();
	}
	
}

//创建一个分页的中间件
exports.creagePage=function(req,res,next){
	var page={
		"pageCount":2,
		"curPage":1,
		"totalPage":0,
		"pageData":{},
		"getStart":function(){
			return (this.curPage-1)*this.pageCount;
		}
	};
	page.curPage=req.body.curPage ? req.body.curPage :1;
	req.page=page;
	next();
}

exports.upfile=function(req, res, next){
	var urls=[];
//	把文件拷贝到publc/upfile下
   
    req.files.forEach(function(file,i){
    	var frpath=global.rootPaht+"/"+file.path;
    	var fr=fs.createReadStream(frpath);
    	var extname=path.extname(file.originalname);
    	var url="/image/"+new Date().getTime()+extname;
    	urls.push(url);
    	var fopath=global.rootPaht+"/public"+url;
        var fo=fs.createWriteStream(fopath);
        fr.pipe(fo);
        
        //  删除拷贝的临时文件
    fs.unlink(frpath,function(err){
    	if(err){
    		
    		return next(err);
    		
    	}
    	
    });
      if(i==req.files.length-1){
    		res.render("admin/upfileresult.html",{urls:urls});
    	}  
    });
}
