/**
 * Created by luosong on 2014/4/11.
 */
define([
    'Core/defineProperties',
    'Renderer/Uniform/Uniform'
],function(
    defineProperties,
    Uniform
    ){
    'use strict';

    var UniformFloatVec3 = function(name, type, location,shaderProgram){
        this.Name = name;
        this.Size = null;
        this.Type = type;
        this.Location = location;
        this.ShaderProgram = shaderProgram;
        this.ShaderProgram.NotifyDirty(this);
        this._dirty = true;

        this._value = null;


    };

    defineProperties(UniformFloatVec3.prototype,{
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

    UniformFloatVec3.prototype.Set = function(gl){
        gl.uniform3fv(this.Location,this.Value);
        this._dirty = false;
    };

    UniformFloatVec3.prototype.Clean = function(gl){
        gl.uniform3fv(this.Location,this.Value);
        this._dirty = false;
    };


    return UniformFloatVec3;
});