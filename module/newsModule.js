var newModule=function(){};
newModule.prototype.newstypeList=function(){
	var emitter = new events.EventEmitter();
		dataSource.getCon().on("success", function(conn) {
                
				conn.query('select * from typenews', function(err, results, fields) {
						if (err) {
							return emitter.emit("error", err);
						}
						emitter.emit("success", results, fields);
						conn.release();
						return emitter;
				});
				
		}).on("err", function(err) {
			
			return emitter.emit("error", err);
		});
          
	return emitter;
}
newModule.prototype.getNewsTid=function(tid){
	var emitter = new events.EventEmitter();
		dataSource.getCon().on("success", function(conn) {
                
				conn.query('select * from news where typeid=?',[tid], function(err, results, fields) {
						if (err) {
							return emitter.emit("error", err);
						}
						emitter.emit("success", results, fields);
						conn.release();
						return emitter;
				});
				
		}).on("err", function(err) {
			
			return emitter.emit("error", err);
		});
          
	return emitter;
}
newModule.prototype.getNewsNid=function(nid){
	var emitter = new events.EventEmitter();
		dataSource.getCon().on("success", function(conn) {
                
				conn.query('select * from news where nid=?',[nid], function(err, results, fields) {
						if (err) {
							return emitter.emit("error", err);
						}
						emitter.emit("success", results, fields);
						conn.release();
						return emitter;
				});
				
		}).on("err", function(err) {
			
			return emitter.emit("error", err);
		});
          
	return emitter;
}
newModule.prototype.newstypeAdd=function(typename){
	var emitter = new events.EventEmitter();
		dataSource.getCon().on("success", function(conn) {
                
				conn.query('insert into typenews values(default,?,0,1)',[typename], function(err, rows, fields) {
						if (err) {
							return emitter.emit("error", err);
						}
						emitter.emit("success", rows, fields);
						conn.release();
						return emitter;
				});
				
		}).on("err", function(err) {
			
			return emitter.emit("error", err);
		});
          
	return emitter;
}

newModule.prototype.newstypeDel=function(typeid){
	var emitter = new events.EventEmitter();
		dataSource.getCon().on("success", function(conn) {
                
				conn.query('delete from typenews where tid=?',[typeid], function(err,rows, fields) {
						if (err) {
							return emitter.emit("error", err);
						}
						emitter.emit("success", rows, fields);
						conn.release();
						return emitter;
				});
				
		}).on("err", function(err) {
			
			return emitter.emit("error", err);
		});
          
	return emitter;
}

newModule.prototype.newsList=function(start,count){
	var emitter = new events.EventEmitter();
	var sqlcount="select count(*) as count from news";
	var sqldata='select * from news limit ?,?';
	var sql=sqlcount+";"+sqldata;
		dataSource.getCon().on("success", function(conn) {
                
				conn.query(sql,[start,count], function(err, results, fields) {
						if (err) {
							return emitter.emit("error", err);
						}
						emitter.emit("success", results, fields);
						conn.release();
						
						return emitter;
				});
				
		}).on("err", function(err) {
			
			return emitter.emit("error", err);
		});
          
	return emitter;
}

newModule.prototype.newsAdd=function(ntitle,aid,ncontent,ntypeid){
	var emitter = new events.EventEmitter();
		dataSource.getCon().on("success", function(conn) {
                
				conn.query('insert into news values(default,?,now(),?,?,?)',[ntitle,aid,ncontent,ntypeid], function(err, rows, fields) {
						if (err) {
							return emitter.emit("error", err);
						}
						emitter.emit("success", rows, fields);
						conn.release();
						return emitter;
				});
				
		}).on("err", function(err) {
			
			return emitter.emit("error", err);
		});
          
	return emitter;
}

newModule.prototype.newsDel=function(nid){
	var emitter = new events.EventEmitter();
		dataSource.getCon().on("success", function(conn) {
                
				conn.query('delete from news where nid=?',[nid], function(err,rows, fields) {
						if (err) {
							return emitter.emit("error", err);
						}
						emitter.emit("success", rows, fields);
						conn.release();
						return emitter;
				});
				
		}).on("err", function(err) {
			
			return emitter.emit("error", err);
		});
          
	return emitter;
}


module.exports=function(){
	return new newModule();
}