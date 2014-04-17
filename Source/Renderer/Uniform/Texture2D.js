/**
 * Created by luosong on 2014/4/17.
 */
define(['Core/defineProperties'],function(defineProperties){
    'use strict';

    var Texture2D = function(image,gl){
        this.Image = image;
        this.Texture = gl.createTexture();

        gl.bindTexture(gl.TEXTURE_2D,this.Texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

        //当贴图的是2的n次方的时候
        //    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        //    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
        //当贴图的不是2的n次方的时候
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); //gl.NEAREST is also allowed, instead of gl.LINEAR, as neither mipmap.
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); //Prevents s-coordinate wrapping (repeating).
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE); //Prevents t-coordinate wrapping (repeating).


        gl.generateMipmap(gl.TEXTURE_2D);
        gl.bindTexture(gl.TEXTURE_2D,null);
    };

    Texture2D.prototype.Bind = function(gl){
        gl.bindTexture(gl.TEXTURE_2D,this.Texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.Image);
    };

    Texture2D.UnBind = function(gl){
        gl.bindTexture(gl.TEXTURE_2D,null);
    };

    return Texture2D;
});