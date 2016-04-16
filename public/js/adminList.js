$(function(){
	//增加用户
	$("#main .panel .glyphicon-plus").click(function(){
		var html=ejs.render($("#adminAdd").html());

		$.pageChange(html);

	});
	
	//删除用户
	$("#main .panel .glyphicon-trash").click(function(){
		M.adminDel({"uid":$(this).attr("uid")}).done(function(obj){
			if(obj.code){
				M.adminList();
			}else{
				$.modal("提示",obj.message);
			}
		});

	});
})
