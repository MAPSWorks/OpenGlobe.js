/**
 * Created by Administrator on 2014/4/12.
 */
define(['Renderer/Uniform/Uniform'],function(Uniform){
    'use strict';

    var UniformBool = function(name, type, location){
        this.Name = name;
        this.Size = null;
        this.Type = type;
        this.Location = location;
        this.Value = null;
    };

    UniformBool.prototype.Set = function(gl){
        gl.uniform1i(this.Location,this.Value);
    };

    return UniformBool;
});