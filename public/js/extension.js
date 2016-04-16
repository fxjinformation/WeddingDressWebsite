(function() {
	$.validate = {};
	$.validate.isEmpty = function(str) {
		var reg = /\S+/;
		return reg.test(str);
	};
	$.validate.isEmail = function(str) {
		var reg = /^[a-z\d]+(\.[a-z\d]+)*@([\da-z](-[\da-z])?)+(\.{1,2}[a-z]+)+$/;
		return reg.test(str);
	}
	$.cookie = {};
	$.cookie.getCookie = function(name) {
		var cookie = decodeURIComponent(document.cookie);
		var index = cookie.indexOf(name);
		if (index == -1) {

			return false;
		}
		var star = index + name.length + 1;
		var end = cookie.indexOf(';', index);
		end = end == -1 ? cookie.length : end;
		return cookie.slice(star, end);

	}
	$.pageChange = function(html) {

		$("#main").find(".panel").removeClass("pt-page-flipInLeft").addClass("pt-page-flipOutLeft");
		setTimeout(function() {
			$("#main").html(html).find(".panel").addClass("pt-page-flipInLeft");
		}, 1000);
	}
	$.modal=function(title,message){
		$("#modalInfo #modalInfoTitle").html(title);
		$("#modalInfo .modal-body").html("<p>"+message+"</p>");
		$("#modalInfo").modal();
	}
	$.fn.alert = function(type, mes, delay) {
		var classtype = "alert-info";
		var title = "成功";
		if (type == "warning") {
			classtype = "alert-warning";
			title = "警告";
		} else if (type == "danger") {
			classtype = "alert-danger";
			title = "错误";
		}


		var html = '<div class="alert ' + classtype + ' alert-dismissable"> <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button><strong>' + title + '</strong><span>' + mes + '</span></div>'
		$(this).prepend(html).find(".alert").delay(1000 * delay).fadeOut(function() {
			$(this).remove();
		});



	}
}());



(function() {
		(function(window, factory) {
				factory(window);
			}(window, function(window) {
             
				window.M = {};
				M.adminList = function() {
					return $.ajax({
						type: "post",
						url: "/admin/admin/list",
						dataType:"json",
						async: true
					}).done(function(users) {
							var html = ejs.render($("#adminList").html(), { users: users});
					        $.pageChange(html);
		
						});

				}
				M.newstypeList = function() {
					$.ajax({
						type: "post",
						url: "/admin/news/newstypeList",
						dataType:"json",
						async: true
					}).done(function(news) {
							var html = ejs.render($("#newstypeList").html(), { news: news});
					        $.pageChange(html);
		
						});

				}
				//资讯管理列表
				M.newsList = function(data) {
					data=data?data:{};
					$.ajax({
						type: "post",
						url: "/admin/news/newsList",
						dataType:"json",
						data:data,
						async: true
					}).done(function(page) {
						
							var html = ejs.render($("#newsList").html(), { page: page});
					        $.pageChange(html);
		
						});

				}
				M.getNewType=function(){
				return	$.ajax({
						type: "post",
						url: "/admin/news/newstypeList",
						dataType:"json",
						async: true
					})
				}
				M.adminAdd = function(data) {
				return	$.ajax({
						type: "post",
						url: "/admin/admin/adminAdd",
						data: data,
						dataType: "json",
						async: true
					});

				}
				M.newtypeAdd = function(data) {
				return	$.ajax({
						type: "post",
						url: "/admin/news/newtypeAdd",
						data: data,
						dataType: "json",
						async: true
					});

				}
				M.newsAdd = function(data) {
				return	$.ajax({
						type: "post",
						url: "/admin/news/newsAdd",
						data: data,
						dataType: "json",
						async: true
					});

				}
				M.imgAdd = function(){
					var html = ejs.render($("#imgAdd").html());
					  $.pageChange(html);
				}

				M.checkAdminUser = function(data) {
				return	$.ajax({
						type: "post",
						url: "/admin/admin/checkAdminUser",
						data: data,
						dataType: "json",
						async: true
					});
				}
				
				M.adminDel=function(data){
				return	$.ajax({
						type: "post",
						url: "/admin/admin/adminDel",
						data: data,
						dataType: "json",
						async: true
					});
				}
				M.newstypeDel=function(data){
				return	$.ajax({
						type: "post",
						url: "/admin/news/newstypeDel",
						data: data,
						dataType: "json",
						async: true
					});
				}
				M.newsDel=function(data){
				return	$.ajax({
						type: "post",
						url: "/admin/news/newsDel",
						data: data,
						dataType: "json",
						async: true
					});
				}
				M.loginOut=function(){
				return	$.ajax({
						type: "post",
						url: "/login/loginOut",
						dataType: "json",
						async: true
					});
				}
				
				

            })
		);

	}
)();
