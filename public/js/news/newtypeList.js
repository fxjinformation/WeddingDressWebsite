$(function(){
	
	$("#main .newstypeList .glyphicon-plus").click(function(){
		var html=ejs.render($("#newtypeAdd").html());

		$.pageChange(html);

	});
	//删除
	$("#main .panel .glyphicon-trash").click(function(){
		
		M.newsDel({"typeid":$(this).attr("typeid")}).done(function(obj){
			if(obj.code){
				M.newstypeList();
			}else{
				$.modal("提示",obj.message);
			}
		});

	});
})