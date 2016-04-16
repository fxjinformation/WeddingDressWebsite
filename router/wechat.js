module.exports=wechat("xiaojunbg").text(function (message, req, res, next) {
 res.reply([
      {
        title: '点击进入晓君的博客',
        url: 'http://115.28.147.222:3000/wechat.html/'
      }
    ]);
}).image(function (message, req, res, next) {

}).voice(function (message, req, res, next) {

}).video(function (message, req, res, next) {

}).location(function (message, req, res, next) {

}).link(function (message, req, res, next) {

}).event(function (message, req, res, next) {
  if(message.Event=='subscribe'){
  	res.reply('欢迎来到晓君的博客');
  }

}).device_text(function (message, req, res, next) {

}).device_event(function (message, req, res, next) {

}).middlewarify();
