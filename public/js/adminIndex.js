
$(function() {
	$(".list-group a").click(function() {
		M[$(this).data("role")]();
		
//		M.adminList();

	});
	
	//退出点击事件
	$("#loginout").click(function() {
		M.loginOut(function(){
			window.location.href("/login.html");
		});
	})
});