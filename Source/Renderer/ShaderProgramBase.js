/**
 * Created by luosong on 2014/4/11.
 */
define([
    'Core/defineProperties',
    'Renderer/Type',
    'Renderer/Uniform/DrawAutomaticUniformFactory',
    'Renderer/Uniform/TextureUniform'
],function(
    defineProperties,
    Type,
    DrawAutomaticUniformFactory,
    TextureUniform
    ){
    'use strict';

    var ShaderProgramBase = function(){
        this._drawAutomaticUniforms = [];
    };


    ShaderProgramBase.prototype.initializeAutomaticUniforms = function(uniforms){


        for(var i = 0; i < uniforms.length; i++){
            var uniform = uniforms[i];
            if(ShaderProgramBase.ContainLinkAutomaticUniform(uniform.Name)){
                ShaderProgramBase.GetLinkAutomaticUniform(uniform.Name).Set(uniform);
            }else if(ShaderProgramBase.ContainDrawAutomaticUniformFactory(uniform.Name)){
                this._drawAutomaticUniforms.push(ShaderProgramBase.GetDrawAutomaticUniformFactory(uniform.Name).Create(uniform));
            }

        }
    };


    ShaderProgramBase.prototype.setDrawAutomaticUniforms = function(context,drawState,sceneState){
        for(var i = 0; i < this._drawAutomaticUniforms.length; i++){
            var drawAutoUni = this._drawAutomaticUniforms[i];
            drawAutoUni.Set(context,drawState,sceneState);
        }
    };



    ShaderProgramBase.LinkAutomaticUniforms = [];
    ShaderProgramBase.DrawAutomaticUniformFactories = [];
    ShaderProgramBase.TextureUnitsCount = 0;

    for(var i = 0; i < ShaderProgramBase.TextureUnitsCount; i++){
        ShaderProgramBase.LinkAutomaticUniforms.push(new TextureUniform(i));
    }



    ShaderProgramBase.DrawAutomaticUniformFactories.push(new DrawAutomaticUniformFactory['SunPositionUniformFactory']());
    ShaderProgramBase.DrawAutomaticUniformFactories.push(new DrawAutomaticUniformFactory['LightPropertiesUniformFactory']());
    ShaderProgramBase.DrawAutomaticUniformFactories.push(new DrawAutomaticUniformFactory['CameraLightPositionUniformFactory']());
    ShaderProgramBase.DrawAutomaticUniformFactories.push(new DrawAutomaticUniformFactory['CameraEyeUniformFactory']());
    ShaderProgramBase.DrawAutomaticUniformFactories.push(new DrawAutomaticUniformFactory['CameraEyeHighUniformFactory']());
    ShaderProgramBase.DrawAutomaticUniformFactories.push(new DrawAutomaticUniformFactory['CameraEyeLowUniformFactory']());
    ShaderProgramBase.DrawAutomaticUniformFactories.push(new DrawAutomaticUniformFactory['ModelViewPerspectiveMatrixRelativeToEyeUniformFactory']());
    ShaderProgramBase.DrawAutomaticUniformFactories.push(new DrawAutomaticUniformFactory['ModelViewMatrixRelativeToEyeUniformFactory']());
    ShaderProgramBase.DrawAutomaticUniformFactories.push(new DrawAutomaticUniformFactory['ModelViewPerspectiveMatrixUniformFactory']());
    ShaderProgramBase.DrawAutomaticUniformFactories.push(new DrawAutomaticUniformFactory['ModelViewOrthographicMatrixUniformFactory']());
    ShaderProgramBase.DrawAutomaticUniformFactories.push(new DrawAutomaticUniformFactory['ModelViewMatrixUniformFactory']());
    ShaderProgramBase.DrawAutomaticUniformFactories.push(new DrawAutomaticUniformFactory.NormalMatrixUniformFactor());
    ShaderProgramBase.DrawAutomaticUniformFactories.push(new DrawAutomaticUniformFactory['ModelMatrixUniformFactory']());
    ShaderProgramBase.DrawAutomaticUniformFactories.push(new DrawAutomaticUniformFactory['ViewMatrixUniformFactory']());
    ShaderProgramBase.DrawAutomaticUniformFactories.push(new DrawAutomaticUniformFactory['PerspectiveMatrixUniformFactory']());
    ShaderProgramBase.DrawAutomaticUniformFactories.push(new DrawAutomaticUniformFactory['OrthographicMatrixUniformFactory']());
    ShaderProgramBase.DrawAutomaticUniformFactories.push(new DrawAutomaticUniformFactory['ViewportOrthographicMatrixUniformFactory']());
    ShaderProgramBase.DrawAutomaticUniformFactories.push(new DrawAutomaticUniformFactory['ViewportUniformFactory']());
    ShaderProgramBase.DrawAutomaticUniformFactories.push(new DrawAutomaticUniformFactory['InverseViewportDimensionsUniformFactory']());
    ShaderProgramBase.DrawAutomaticUniformFactories.push(new DrawAutomaticUniformFactory['ViewportTransformationMatrixUniformFactory']());
    ShaderProgramBase.DrawAutomaticUniformFactories.push(new DrawAutomaticUniformFactory['ModelZToClipCoordinatesUniformFactory']());
    ShaderProgramBase.DrawAutomaticUniformFactories.push(new DrawAutomaticUniformFactory['WindowToWorldNearPlaneUniformFactory']());
    ShaderProgramBase.DrawAutomaticUniformFactories.push(new DrawAutomaticUniformFactory['Wgs84HeightUniformFactory']());
    ShaderProgramBase.DrawAutomaticUniformFactories.push(new DrawAutomaticUniformFactory['PerspectiveNearPlaneDistanceUniformFactory']());
    ShaderProgramBase.DrawAutomaticUniformFactories.push(new DrawAutomaticUniformFactory['PerspectiveFarPlaneDistanceUniformFactory']());
    ShaderProgramBase.DrawAutomaticUniformFactories.push(new DrawAutomaticUniformFactory['HighResolutionSnapScaleUniformFactory']());
    ShaderProgramBase.DrawAutomaticUniformFactories.push(new DrawAutomaticUniformFactory['PixelSizePerDistanceUniformFactory']());


    ShaderProgramBase.ContainLinkAutomaticUniform = function(name){
        var uniform = ShaderProgramBase.GetLinkAutomaticUniform(name);
        if(uniform !== null){
            return true;
        }else{
            return false;
        }
    };
    ShaderProgramBase.GetLinkAutomaticUniform = function(name){
        var uniform = null;
        for(var i = 0; i < ShaderProgramBase.LinkAutomaticUniforms.length; i++){
            var u = ShaderProgramBase.LinkAutomaticUniforms[i];
            if(u.Name == name){
                uniform = u;
                break;
            }
        }

        return uniform;
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