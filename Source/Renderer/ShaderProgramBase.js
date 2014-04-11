/**
 * Created by luosong on 2014/4/11.
 */
define([
    'Core/defineProperties',
    'Renderer/Type',
    'Renderer/Uniform/DrawAutomaticUniformFactory'
],function(
    defineProperties,
    Type,
    DrawAutomaticUniformFactory
    ){
    'use strict';

    var ShaderProgramBase = function(){
        this._drawAutomaticUniforms = [];
    };


    ShaderProgramBase.prototype.initializeAutomaticUniforms = function(uniforms){


        for(var i = 0; i < uniforms.length; i++){
            var uniform = uniforms[i];
            if(ShaderProgramBase.ContainLinkAutomaticUniform(uniform.Name)){
                //ShaderProgramBase.GetLinkAutomaticUniform(uniform.Name).Set(uniform);
            }else if(ShaderProgramBase.ContainDrawAutomaticUniformFactory(uniform.Name)){
                this._drawAutomaticUniforms.push(ShaderProgramBase.GetDrawAutomaticUniformFactory(uniform.Name).Create(uniform));
            }

        }
    };


    ShaderProgramBase.prototype.setDrawAutomaticUniforms = function(gl,drawState,sceneState){
        for(var i = 0; i < this._drawAutomaticUniforms.length; i++){
            this._drawAutomaticUniforms[i].Set(gl,drawState,sceneState);
        }
    };



    ShaderProgramBase.LinkAutomaticUniforms = [];
    ShaderProgramBase.DrawAutomaticUniformFactories = [];

    ShaderProgramBase.DrawAutomaticUniformFactories.push(new DrawAutomaticUniformFactory['SunPositionFactory']());

    ShaderProgramBase.ContainLinkAutomaticUniform = function(name){
        //TODO
        return false;
    };
    ShaderProgramBase.GetLinkAutomaticUniform = function(name){

    };

    ShaderProgramBase.ContainDrawAutomaticUniformFactory = function(name){
        var factory = ShaderProgramBase.GetDrawAutomaticUniformFactory(name);

        if(factory !== null){
            return true;
        }else{
            return false;
        }
    };
    ShaderProgramBase.GetDrawAutomaticUniformFactory = function(name){
        var factory = null;

        for(var i = 0; i < ShaderProgramBase.DrawAutomaticUniformFactories.length; i++){
            var f = ShaderProgramBase.DrawAutomaticUniformFactories[i];
            if(f.Name == name){
                factory = f;
                break;
            }
        }

        return factory;
    };

    return ShaderProgramBase;
});