var dataSource = function() {
	
	this.dataSource = mysql.createPool({
		connectionLimit: 10,
		host: 'localhost',
		user: 'root',
		password: '123456',
		database: 'mydb',
		dateStrings:true,
		multipleStatements:true
		
	});
}

dataSource.prototype.getCon = function() {

	var emitter =new events.EventEmitter();
	this.dataSource.getConnection(function(err, conn) {
		
		if (err) {
			
			return emitter.emit("error", err);
			
		}
		emitter.emit("success", conn);
		
	});
	
	return emitter;
};
module.exports = function() {
	return new dataSource();
};