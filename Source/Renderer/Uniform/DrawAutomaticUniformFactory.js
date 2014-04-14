/**
 * Created by luosong on 2014/4/11.
 */
define(['Renderer/Uniform/DrawAutomaticUniform'],function(DrawAutomaticUniform){
    'use strict';

    var DrawAutomaticUniformFactory = {};

    var SunPositionFactory = function(){
        this.Name = 'og_sunPosition';
    };

    SunPositionFactory.prototype.Create = function(uniform){
        var SunPosition = DrawAutomaticUniform['SunPosition'];
        return new SunPosition(uniform);
    };


    var LightPropertiesUniformFactory = function(){
        this.Name = 'og_diffuseSpecularAmbientShininess';
    };

    LightPropertiesUniformFactory.prototype.Create = function(uniform){
        var LightProperties = DrawAutomaticUniform.LightProperties;
        return new LightProperties(uniform);
    };

    var CameraLightPositionUniformFactory = function(){
        this.Name = 'og_cameraLightPosition';
    };

    CameraLightPositionUniformFactory.prototype.Create = function(uniform){
        var CameraLightPosition = DrawAutomaticUniform.CameraLightPosition;
        return new CameraLightPosition(uniform);
    };






    DrawAutomaticUniformFactory['SunPositionFactory'] = SunPositionFactory;
    DrawAutomaticUniformFactory['LightPropertiesUniformFactory'] = LightPropertiesUniformFactory;
    DrawAutomaticUniformFactory['CameraLightPositionUniformFactory'] = CameraLightPositionUniformFactory;

    return DrawAutomaticUniformFactory;
});