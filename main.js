require.config({
	paths:{
		jquery : './thirdparty/jquery-1.11.0'
	},

	baseUrl:'Source'
});

//require(['jquery','WebGLApp'],function($,App) {
//    var app = new App({canvas:'canvas'});
//    app.run();
//});


require(['jquery','Render/Device'],function($,Device) {
    var app = new App({canvas:'canvas'});
    app.run();
});