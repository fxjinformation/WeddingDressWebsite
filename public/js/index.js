$(function(){
	$('#scrollToTop').mousemove(function(){
		$('#scrollToTop img:first-child').css('display','none');
		$('#scrollToTop img:last-child').css('display','block');
	});
	$('#scrollToTop').mouseout(function(){
		$('#scrollToTop img:first-child').css('display','block');
		$('#scrollToTop img:last-child').css('display','none');
	});
	var speed = 800;//滚动速度
	var h=document.body.clientHeight;
	
    //回到顶部
    $("#scrollToTop").click(function () {
	  	$('html,body').animate({
			scrollTop: '0px'
		},
		speed);			
    });

})