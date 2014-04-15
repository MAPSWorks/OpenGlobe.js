/**
 * Created by luosong on 2014/4/11.
 */
define(['Renderer/Uniform/DrawAutomaticUniform'],function(DrawAutomaticUniform){
    'use strict';

    var DrawAutomaticUniformFactory = {};

    var SunPositionUniformFactory = function(){
        this.Name = 'og_sunPosition';
    };
    SunPositionUniformFactory.prototype.Create = function(uniform){
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


    var CameraEyeUniformFactory = function(){
        this.Name = 'og_cameraEye';
    };
    CameraEyeUniformFactory.prototype.Create = function(uniform){
        var CameraEyeUniform = DrawAutomaticUniform.CameraEye;
        return new CameraEyeUniform(uniform);
    };

    var CameraEyeHighUniformFactory = function(){
        this.Name = 'og_cameraEyeHigh';
    };
    CameraEyeHighUniformFactory.prototype.Create = function(uniform){
        var CameraEyeHighUniform = DrawAutomaticUniform.CameraEyeHigh;
        return new CameraEyeHighUniform(uniform);
    };

    var CameraEyeLowUniformFactory = function(){
        this.Name = 'og_cameraEyeLow';
    };
    CameraEyeLowUniformFactory.prototype.Create = function(uniform){
        var CameraEyeLow = DrawAutomaticUniform.CameraEyeLow;
        return new CameraEyeLow(uniform);
    };


    var ModelViewPerspectiveMatrixRelativeToEyeUniformFactory = function(){
        this.Name = 'og_modelViewPerspectiveMatrixRelativeToEye';
    };
    ModelViewPerspectiveMatrixRelativeToEyeUniformFactory.prototype.Create = function(uniform){
        var ModelViewPerspectiveMatrixRelativeToEyeUniform = DrawAutomaticUniform.ModelViewPerspectiveMatrixRelativeToEye;
        return new ModelViewPerspectiveMatrixRelativeToEyeUniform(uniform);
    };

    var ModelViewMatrixRelativeToEyeUniformFactory = function(){
        this.Name = 'og_modelViewMatrixRelativeToEye';
    };
    ModelViewMatrixRelativeToEyeUniformFactory.prototype.Create = function(uniform){
        var ModelViewMatrixRelativeToEyeUniform = DrawAutomaticUniform.ModelViewMatrixRelativeToEye;
        return new ModelViewMatrixRelativeToEyeUniform(uniform);
    };

    var ModelViewPerspectiveMatrixUniformFactory = function(){
        this.Name = "og_modelViewPerspectiveMatrix";
    };
    ModelViewPerspectiveMatrixUniformFactory.prototype.Create = function(uniform){
        var ModelViewPerspectiveMatrixUniform = DrawAutomaticUniform.ModelViewPerspectiveMatrix;
        return new ModelViewPerspectiveMatrixUniform(uniform);
    };

    var ModelViewOrthographicMatrixUniformFactory = function(){
        this.Name = 'og_modelViewOrthographicMatrix';
    };
    ModelViewOrthographicMatrixUniformFactory.prototype.Create = function(uniform){
        var ModelViewOrthographicMatrixUniform = DrawAutomaticUniform.ModelViewOrthographicMatrix;
        return new ModelViewOrthographicMatrixUniform(uniform);
    };

    var ModelViewMatrixUniformFactory = function(){
        this.Name = 'og_modelViewMatrix';
    };
    ModelViewMatrixUniformFactory.prototype.Create = function(uniform){
        var ModelViewMatrixUniform = DrawAutomaticUniform.ModelViewMatrix;
        return new ModelViewMatrixUniform(uniform);
    };

    var ModelMatrixUniformFactory = function(){
        this.Name = 'og_modelMatrix';
    };
    ModelMatrixUniformFactory.prototype.Create = function(uniform){
        var ModelMatrixUniform = DrawAutomaticUniform.ModelMatrix;
        return new ModelMatrixUniform(uniform);
    };

    var ViewMatrixUniformFactory = function(){
        this.Name = 'og_viewMatrix';
    };
    ViewMatrixUniformFactory.prototype.Create = function(uniform){
        var ViewMatrixUniform = DrawAutomaticUniform.ViewMatrix;
        return new ViewMatrixUniform(uniform);
    };

    var PerspectiveMatrixUniformFactory = function(){
        this.Name = 'og_perspectiveMatrix';
    };
    PerspectiveMatrixUniformFactory.prototype.Create = function(uniform){
        var PerspectiveMatrixUniform = DrawAutomaticUniform.PerspectiveMatrix;
        return new PerspectiveMatrixUniform(uniform);
    };

    var OrthographicMatrixUniformFactory = function(){
        this.Name = 'og_orthographicMatrix';
    };
    OrthographicMatrixUniformFactory.prototype.Create = function(uniform){
        var OrthographicMatrixUniform = DrawAutomaticUniform.OrthographicMatrix;
        return new OrthographicMatrixUniform(uniform);
    };

    var ViewportOrthographicMatrixUniformFactory = function(){
        this.Name = 'og_viewportOrthographicMatrix';
    };
    ViewportOrthographicMatrixUniformFactory.prototype.Create = function(uniform){
        var ViewportOrthographicMatrixUniform = DrawAutomaticUniform.ViewportOrthographicMatrix;
        return new ViewportOrthographicMatrixUniform(uniform);
    };

    var ViewportUniformFactory = function(){
        this.Name = 'og_viewport';
    };
    ViewportUniformFactory.prototype.Create= function(uniform){
        var ViewportUniform = DrawAutomaticUniform.Viewport;
        return new ViewportUniform(uniform);
    };

    var InverseViewportDimensionsUniformFactory = function(){
        this.Name = 'og_inverseViewportDimensions';
    };
    InverseViewportDimensionsUniformFactory.prototype.Create = function(uniform){
        var InverseViewportDimensionsUniform = DrawAutomaticUniform.InverseViewportDimensions;
        return new InverseViewportDimensionsUniform(uniform);
    };

    var ViewportTransformationMatrixUniformFactory = function(){
        this.Name = 'og_viewportTransformationMatrix';
    };
    ViewportTransformationMatrixUniformFactory.prototype.Create = function(uniform){
        var ViewportTransformationMatrixUniform = DrawAutomaticUniform.ViewportTransformationMatrix;
        return new ViewportTransformationMatrixUniform(uniform);
    };

    var ModelZToClipCoordinatesUniformFactory = function(){
        this.Name = 'og_modelZToClipCoordinates';
    };
    ModelZToClipCoordinatesUniformFactory.prototype.Create = function(uniform){
        var ModelZToClipCoordinatesUniform = DrawAutomaticUniform.ModelZToClipCoordinates;
        return new ModelZToClipCoordinatesUniform(uniform);
    };

    var WindowToWorldNearPlaneUniformFactory = function(){
        this.Name = 'og_windowToWorldNearPlane';
    };
    WindowToWorldNearPlaneUniformFactory.prototype.Create = function(uniform){
        var WindowToWorldNearPlaneUniform = DrawAutomaticUniform.WindowToWorldNearPlane;
        return new WindowToWorldNearPlaneUniform(uniform);
    };

    var Wgs84HeightUniformFactory = function(){
        this.Name = 'og_wgs84Height';
    };
    Wgs84HeightUniformFactory.prototype.Create = function(uniform){
        var Wgs84HeightUniform = DrawAutomaticUniform.Wgs84Height;
        return new Wgs84HeightUniform(uniform);
    };

    var PerspectiveNearPlaneDistanceUniformFactory = function(){
        this.Name = 'og_perspectiveNearPlaneDistance';
    };
    PerspectiveNearPlaneDistanceUniformFactory.prototype.Create = function(uniform){
        var PerspectiveNearPlaneDistanceUniform = DrawAutomaticUniform.PerspectiveNearPlaneDistance;
        return new PerspectiveNearPlaneDistanceUniform(uniform);
    };

    var PerspectiveFarPlaneDistanceUniformFactory = function(){
        this.Name = 'og_perspectiveFarPlaneDistance';
    };
    PerspectiveFarPlaneDistanceUniformFactory.prototype.Create = function(uniform){
        var PerspectiveFarPlaneDistanceUniform = DrawAutomaticUniform.PerspectiveFarPlaneDistance;
        return new PerspectiveFarPlaneDistanceUniform(uniform);
    };

    var HighResolutionSnapScaleUniformFactory = function(){
        this.Name = 'og_highResolutionSnapScale';
    };
    HighResolutionSnapScaleUniformFactory.prototype.Create = function(uniform){
        var HighResolutionSnapScaleUniform = DrawAutomaticUniform.HighResolutionSnapScale;
        return new HighResolutionSnapScaleUniform(uniform);
    };

    var PixelSizePerDistanceUniformFactory = function(){
        this.Name = 'og_pixelSizePerDistance';
    };
    PixelSizePerDistanceUniformFactory.prototype.Create = function(uniform){
        var PixelSizePerDistanceUniform = DrawAutomaticUniform.PixelSizePerDistance;
        return new PixelSizePerDistanceUniform(uniform);
    };

    DrawAutomaticUniformFactory['SunPositionUniformFactory'] = SunPositionUniformFactory;
    DrawAutomaticUniformFactory['LightPropertiesUniformFactory'] = LightPropertiesUniformFactory;
    DrawAutomaticUniformFactory['CameraLightPositionUniformFactory'] = CameraLightPositionUniformFactory;
    DrawAutomaticUniformFactory['CameraEyeUniformFactory'] = CameraEyeUniformFactory;
    DrawAutomaticUniformFactory['CameraEyeHighUniformFactory'] = CameraEyeHighUniformFactory;
    DrawAutomaticUniformFactory['CameraEyeLowUniformFactory'] = CameraEyeLowUniformFactory;
    DrawAutomaticUniformFactory['ModelViewPerspectiveMatrixRelativeToEyeUniformFactory'] = ModelViewPerspectiveMatrixRelativeToEyeUniformFactory;
    DrawAutomaticUniformFactory['ModelViewMatrixRelativeToEyeUniformFactory'] = ModelViewMatrixRelativeToEyeUniformFactory;
    DrawAutomaticUniformFactory['ModelViewPerspectiveMatrixUniformFactory'] = ModelViewPerspectiveMatrixUniformFactory;
    DrawAutomaticUniformFactory['ModelViewOrthographicMatrixUniformFactory'] = ModelViewOrthographicMatrixUniformFactory;
    DrawAutomaticUniformFactory['ModelViewMatrixUniformFactory'] = ModelViewMatrixUniformFactory;
    DrawAutomaticUniformFactory['ModelMatrixUniformFactory'] = ModelMatrixUniformFactory;
    DrawAutomaticUniformFactory['ViewMatrixUniformFactory'] = ViewMatrixUniformFactory;
    DrawAutomaticUniformFactory['PerspectiveMatrixUniformFactory'] = PerspectiveMatrixUniformFactory;
    DrawAutomaticUniformFactory['OrthographicMatrixUniformFactory'] = OrthographicMatrixUniformFactory;
    DrawAutomaticUniformFactory['ViewportOrthographicMatrixUniformFactory'] = ViewportOrthographicMatrixUniformFactory;
    DrawAutomaticUniformFactory['ViewportUniformFactory'] = ViewportUniformFactory;
    DrawAutomaticUniformFactory['InverseViewportDimensionsUniformFactory'] = InverseViewportDimensionsUniformFactory;
    DrawAutomaticUniformFactory['ViewportTransformationMatrixUniformFactory'] = ViewportTransformationMatrixUniformFactory;
    DrawAutomaticUniformFactory['ModelZToClipCoordinatesUniformFactory'] = ModelZToClipCoordinatesUniformFactory;
    DrawAutomaticUniformFactory['WindowToWorldNearPlaneUniformFactory'] = WindowToWorldNearPlaneUniformFactory;
    DrawAutomaticUniformFactory['Wgs84HeightUniformFactory'] = Wgs84HeightUniformFactory;
    DrawAutomaticUniformFactory['PerspectiveNearPlaneDistanceUniformFactory'] = PerspectiveNearPlaneDistanceUniformFactory;
    DrawAutomaticUniformFactory['PerspectiveFarPlaneDistanceUniformFactory'] = PerspectiveFarPlaneDistanceUniformFactory;
    DrawAutomaticUniformFactory['HighResolutionSnapScaleUniformFactory'] = HighResolutionSnapScaleUniformFactory;
    DrawAutomaticUniformFactory['PixelSizePerDistanceUniformFactory'] = PixelSizePerDistanceUniformFactory;

    return DrawAutomaticUniformFactory;
});