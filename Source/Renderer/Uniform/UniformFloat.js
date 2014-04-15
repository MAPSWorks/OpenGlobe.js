/**
 * Created by luosong on 2014/4/11.
 */
define(['Core/defineProperties','Renderer/Uniform/Uniform'],function(defineProperties,Uniform){
    'use strict';

    var UniformFloat = function(name, type, location,shaderProgram){
        this.Name = name;
        this.Size = null;
        this.Type = type;
        this.Location = location;
        this.ShaderProgram = shaderProgram;
        this.ShaderProgram.NotifyDirty(this);
        this._dirty = true;

        this._value = null;
    };

    defineProperties(UniformFloat.prototype,{
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


    UniformFloat.prototype.Set = function(gl){
        gl.uniform1f(this.Location,this.Value);
        this._dirty = false;
    };

    UniformFloat.prototype.Clean = function(gl){
        gl.uniform1f(this.Location,this.Value);
        this._dirty = false;
    };

    return UniformFloat;
});