/**
 * Created by luosong on 2014/4/17.
 */
define([
    'Core/defineProperties',
    'Renderer/Uniform/Uniform'
],function(
    defineProperties,
    Uniform
    ){
    'use strict';

    var UniformSampler2D = function(name, type, location,shaderProgram){
        this.Name = name;
        this.Size = null;
        this.Type = type;
        this.Location = location;
        this.ShaderProgram = shaderProgram;
        this.ShaderProgram.NotifyDirty(this);
        this._dirty = true;

        this._value = null;


    };

    defineProperties(UniformSampler2D.prototype,{
        // {number} textureUnit
        Value : {
            get : function(){
                return this._value;
            },
            set : function(x){
                if(!this._dirty && (this._value !== x)){
                    this._dirty = true;
                    this.ShaderProgram.NotifyDirty(this);
                }
                this._value = x;
            }
        }
    });

    UniformSampler2D.prototype.Clean = function(gl){
        gl.uniform1i(this.Location,this.Value);
        this._dirty = false;
    };


    return UniformSampler2D;
});