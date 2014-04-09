/**
 * Created by luosong on 2014/3/27.
 */

define([
    'Renderer/GraphicsWindow',
    'Renderer/ShaderProgram'],
function(
    GraphicsWindow,
    ShaderProgram
    )
{
    'use strict';

    var Device = function(canvasName){
        this._canvas = null;
        this._context = null;       //this is a gl context, not class context
        this.getContext(canvasName);


    };

    Device.prototype.CreateWindow = function(width, height, title){
        return new GraphicsWindow(this._context,width,height,title);
    };

    Device.prototype.CreateProgram = function(vertexShaderSource,fragmentShaderSource){
        return new ShaderProgram(this._context,vertexShaderSource,fragmentShaderSource);
    };

    Device.prototype.CreateProgramFromID = function(vertexID,fragmentID){
        var vertexSource = this.getShaderSourceFromId(vertexID);
        var fragmentSource = this.getShaderSourceFromId(fragmentID);

        return this.CreateProgram(vertexSource,fragmentSource);
    };

    Device.prototype.getShaderSourceFromId = function(id){
        var shaderScript = document.getElementById(id);
        if(!shaderScript){
            return null;
        }

        var str = "";
        var k = shaderScript.firstChild;
        while (k) {
            if (k.nodeType == 3) {
                str += k.textContent;
            }
            k = k.nextSibling;
        }

        return str;
    };

    Device.prototype.getContext = function(canvasName){
        this._canvas = document.getElementById(canvasName);
        this._context = this._canvas.getContext('experimental-webgl');

    };

    ///////////////////////////////////////////////




    return Device;
});