$(function(){
	
	$("#main .newtypeAdd .addbtn").click(function(){
		
		var typename=$("#main .newtypeAdd input[name=newtype]").val();
		
		if($.validate.isEmpty(typename)==false){
			$("#main .newtypeAdd .errorinfo").alert("warning","类型名称不能为空！");
			return;
		}
		M.newtypeAdd({"typename":typename}).done(function(obj){
			if(obj.code){
				M.newstypeList();
			}else{
				$("#main .newtypeAdd .errorinfo").alert('error',obj.message,2);
			}
		});
	});
})
