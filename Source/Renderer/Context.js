/**
 * Created by luosong on 2014/4/8.
 */
define([
    'Core/defineProperties',
    'Renderer/Color',
    'Renderer/Rectangle',
    'Renderer/ClearState'
],function(
    defineProperties,
    Color,
    Rectangle,
    ClearState
    ){
   'use strict';

    var Context = function(gl, width, height){
        this._gl = gl;

        this._viewport = new Rectangle(0, 0, width, height);


        this._clearColor = Color.FromArgb(
            255,0,0,0
        );

    };

    Context.prototype.Clear = function(clearState){
        this._gl.clearColor(0.0,0.0,0.0,1.0);
        this._gl.clearDepth(1.0);
        this._gl.clear(this._gl.COLOR_BUFFER_BIT | this._gl.DEPTH_BUFFER_BIT);

    };


    return Context;

});