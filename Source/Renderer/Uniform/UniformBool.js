/**
 * Created by Administrator on 2014/4/12.
 */
define(['Core/defineProperties','Renderer/Uniform/Uniform'],function(defineProperties,Uniform){
    'use strict';

    var UniformBool = function(name, type, location,shaderProgram){
        this.Name = name;
        this.Size = null;
        this.Type = type;
        this.Location = location;
        this.ShaderProgram = shaderProgram;
        this.ShaderProgram.NotifyDirty(this);
        this._dirty = true;

        this._value = null;
    };

    defineProperties(UniformBool.prototype,{
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

    UniformBool.prototype.Set = function(gl){
        gl.uniform1i(this.Location,this.Value);
        this._dirty = false;
    };

    UniformBool.prototype.Clean = function(gl){
        gl.uniform1i(this.Location,this.Value);
        this._dirty = false;
    };

    return UniformBool;
});