$(function() {

	$("#main .adminAdd .addbtn").click(function() {
			
		var aname = $("#main .adminAdd input[name=aname]");
		var pwd = $("#main .adminAdd input[name=pwd]");
	
		if ($.validate.isEmpty(aname.val()) == false) {
			$("#main .adminAdd .errorinfo").alert("warning", "用户名不能为空！", 2);
			return;
		}
		if ($.validate.isEmail(aname.val()) == false) {
			$("#main .adminAdd .errorinfo").alert("warning", "用户名格式不正确！", 2);
			return;
		}
		if ($.validate.isEmpty(pwd.val()) == false) {
			$("#main .adminAdd .errorinfo").alert("warning", "密码不能为空！", 2);
			return;
		}
        
        M.checkAdminUser({"aname":aname.val()}).done(function(obj){
        	
        	if(obj.code){
        		M.adminAdd({"aname":aname.val(),"pwd":pwd.val()}).done(function(obj){
        			
        			if(obj.code){
        				M.adminList();
        			}else{
        				$("#main .adminAdd .errorinfo").alert("error", obj.message, 2);
        			}
        		});
        	}else{
        		$("#main .adminAdd .errorinfo").alert("error", obj.message, 2);
        	}
        });
        
//		M.adminAdd({
//			"aname": aname.val(),
//			"pwd": pwd.val()
//		}, function(obj) {
//			
//			if (obj.code) {
//				M.adminList();
//			} else {
//				$("#main .adminAddFrom .errorinfo").alert("warning", obj.message, 2);
//			}
//		});
		//	$.ajax({
		//		type:"post",
		//		url:"/admin/admin/adminAdd",
		//		data:{"aname":aname.val(),"pwd":pwd.val()},
		//		dataType:"json",
		//		success:function(obj){
		//			console.log(obj.code)
		//			if(obj.code){
		//				$("#main .adminAddFrom .errorinfo").alert("info","增加成功",2);
		//			}else{
		//				$("#main .adminAddFrom .errorinfo").alert("warning",obj.message,2);
		//			}
		//		},
		//		async:true
		//	});

	});

})