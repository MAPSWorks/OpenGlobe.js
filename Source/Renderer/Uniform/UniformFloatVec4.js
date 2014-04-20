/**
 * Created by Administrator on 2014/4/20.
 */

define([
    'Core/defineProperties',
    'Renderer/Uniform/Uniform'
],function(
    defineProperties,
    Uniform
    ){
    'use strict';

    var UniformFloatVec4 = function(name, type, location,shaderProgram){
        this.Name = name;
        this.Size = null;
        this.Type = type;
        this.Location = location;
        this.ShaderProgram = shaderProgram;
        this.ShaderProgram.NotifyDirty(this);
        this._dirty = true;

        this._value = null;


    };

    defineProperties(UniformFloatVec4.prototype,{
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

    UniformFloatVec4.prototype.Set = function(gl){
        gl.uniform4fv(this.Location,this.Value);
        this._dirty = false;
    };

    UniformFloatVec4.prototype.Clean = function(gl){
        gl.uniform4fv(this.Location,this.Value);
        this._dirty = false;
    };


    return UniformFloatVec4;
});