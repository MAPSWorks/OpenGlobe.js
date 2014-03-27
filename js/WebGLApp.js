/**
 * Created by luosong on 14-3-19.
 */
define(['Axis','Floor','Scene','Utils'], function(Axis,Floor,Scene,Utils){

    var g_context = null;
    var g_scene = null;
    
    var WebGLApp = function(description){
        this.scene = null;
        this.gl = null;
        this.canvas = null;

        this.c_width = 0;
        this.c_height = 0;

        this.timer_id = null;
        this.render_rate = 50;


        if(description.canvas){
            this.gl = this.getGLContext(description.canvas);
            g_context = this.gl;
            this.c_width = this.canvas.width;
            this.c_height = this.canvas.height;

            this.scene = new Scene(this.gl,this.c_width,this.c_height);
            g_scene = this.scene;
        }
    };
    
    WebGLApp.prototype.refresh = function(){

    }

    WebGLApp.prototype.run = function(){
        this.configureGL();
        this.loadScene();

        var that = this;
        window.onblur = function(){
            clearInterval(that.timer_id);
            console.info('Rendering stopped.');
        };
        window.onfocus = function(){
            that.renderLoop();
            console.info('Rendering resumed.');
        }

        this.renderLoop();
    }

    WebGLApp.prototype.renderLoop = function(){

        this.timer_id = setInterval(this.drawScene,this.render_rate);
    }

    WebGLApp.prototype.configureGL = function(){
        this.gl.clearColor(0.3,0.3,0.3,1.0);
        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.depthFunc(this.gl.LEQUAL);

    }

    WebGLApp.prototype.loadScene = function(){
        Floor.build(60.2);
        Axis.build(60);

        this.scene.addObject(Floor);
        this.scene.addObject(Axis);

        this.scene.loadObject('models/geometry/cone.json','cone');

        this.scene.init('shader-vs','shader-fs');
    }

    WebGLApp.prototype.drawScene = function(){

        var scene = g_scene;
        scene.draw();

    }

    WebGLApp.prototype.getGLContext = function(name){
        var canvas = document.getElementById(name);
        var ctx = null;

        if (canvas == null){
            alert('there is no canvas on this page');
            return null;
        }

        this.canvas = canvas;

        var names = ["webgl", "experimental-webgl", "webkit-3d", "moz-webgl"];

        for (var i = 0; i < names.length; ++i) {
            try {
                ctx = canvas.getContext(names[i]);
            }
            catch(e) {}
            if (ctx) {
                break;
            }
        }
        if (ctx == null) {
            alert("Could not initialise WebGL");
            return null;
        }
        else {
            return ctx;
        }
    }

    return WebGLApp;
});