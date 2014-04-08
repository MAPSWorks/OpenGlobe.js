/**
 * Created by luosong on 2014/4/8.
 */
define([
    "Core/defineProperties",
    'Core/Vector3D',
    'Core/Matrix42',
    'Core/Matrix4D',
    'Renderer/Camera'
],function(
    defineProperties,
    Vector3D,
    Matrix42,
    Matrix4D,
    Camera
    )
{
    "use strict";

    var SceneState = function(){
        this._diffuseIntensity = 0.65;
        this._specularIntensity = 0.25;
        this._ambientIntensity = 0.10;
        this._shininess = 12;
        this._camera = new Camera();
        this._sunPosition = new Vector3D(200000,0,0);
        this._modelMatrix = Matrix4D.Identity;
        this._highResolutionSnapScale = 1;
    };

    defineProperties(SceneState.prototype,{
        DiffuseIntensity:{
            get : function(){
                return this._diffuseIntensity;
            },
            set : function(x){
                this._diffuseIntensity = x;
            }
        },

        SpecularIntensity:{
            get : function(){
                return this._specularIntensity;
            },
            set : function(x){
                this._specularIntensity = x;
            }
        },

        AmbientIntensity:{
            get : function(){
                return this._ambientIntensity;
            },
            set : function(x){
                this._ambientIntensity = x;
            }
        },

        Shininess:{
            get : function(){
                return this._shininess;
            },
            set : function(x){
                this._shininess = x;
            }
        },

        Camera:{
            get : function(){
                return this._camera;
            },
            set : function(x){
                this._camera = x;
            }
        },

        SunPosition : {
            get : function(){
                return this._sunPosition;
            },
            set : function(x){
                this._sunPosition = x;
            }
        },

        CameraLightPosition : {
            get : function(){
                return this.Camera.Eye;
            }
        },

        OrthographicMatrix : {
            get : function(){
                //
                // Bottom and top swapped:  MS -> OpenGL
                //

                return Matrix4D.CreateOrthographicOffCenter(
                    this.Camera.OrthographicLeft,this.Camera.OrthographicRight,
                    this.Camera.OrthographicTop,this.Camera.OrthographicBottom,
                    this.Camera.OrthographicNearPlaneDistance,
                    this.Camera.OrthographicFarPlaneDistance
                );
            }
        },

        PerspectiveMatrix:{
            get : function(){
                return Matrix4D.CreatePerspectiveFieldOfView(
                    this.Camera.FieldOfViewY,this.Camera.AspectRatio,
                    this.Camera.PerspectiveNearPlaneDistance,
                    this.Camera.PerspectiveFarPlaneDistance
                );
            }
        },

        ViewMatrix : {
            get : function(){
                return Matrix4D.LookAt(this.Camera.Eye,this.Camera.Target,this.Camera.Up);
            }
        },

        ModelMatrix : {
            get : function(){
                return this._modelMatrix;
            },
            set : function(x){
                this._modelMatrix = x;
            }
        },

        ModelViewMatrix : {
            get : function(){
                return Matrix4D.MultiplyMatrix4D(this.ViewMatrix, this.ModelMatrix);
            }
        },

        ModelViewMatrixRelativeToEye:{
            get : function(){
                var m = this.ModelViewMatrix;

                return new Matrix4D(
                    m.Column0Row0, m.Column1Row0, m.Column2Row0, 0.0,
                    m.Column0Row1, m.Column1Row1, m.Column2Row1, 0.0,
                    m.Column0Row2, m.Column1Row2, m.Column2Row2, 0.0,
                    m.Column0Row3, m.Column1Row3, m.Column2Row3, m.Column3Row3
                );
            }
        },

        ModelViewPerspectiveMatrixRelativeToEye:{
            get : function(){
                return Matrix4D.MultiplyMatrix4D(this.PerspectiveMatrix, this.ModelViewMatrixRelativeToEye);
            }
        },

        ModelViewPerspectiveMatrix : {
            get : function(){
                return Matrix4D.MultiplyMatrix4D(this.PerspectiveMatrix, this.ModelViewMatrix);
            }
        },

        ModelViewOrthographicMatrix : {
            get : function(){
                return Matrix4D.MultiplyMatrix4D(this.ModelViewMatrix, this.OrthographicMatrix);
            }
        },

        ModelZToClipCoordinates : {
            get : function(){
                //
                // Bottom two rows of model-view-projection matrix
                //

                var m = this.ModelViewPerspectiveMatrix;
                return new Matrix42(
                    m.Column0Row2, m.Column1Row2, m.Column2Row2, m.Column3Row2,
                    m.Column0Row3, m.Column1Row3, m.Column2Row3, m.Column3Row3
                );
            }
        },

        HighResolutionSnapScale:{
            get : function(){
                return this._highResolutionSnapScale;
            },
            set : function(x){
                this._highResolutionSnapScale = x;
            }
        }


    });


    SceneState.prototype.ComputeViewportTransformationMatrix = function(viewport,nearDepthRange,farDepthRange){
        var halfWidth = viewport.Width * 0.5;
        var halfHeight = viewport.Height * 0.5;
        var halfDepth = (farDepthRange - nearDepthRange) * 0.5;

        //
        // Bottom and top swapped:  MS -> OpenGL
        //
        return new Matrix4D(
            halfWidth, 0.0,        0.0,       viewport.Left + halfWidth,
            0.0,       halfHeight, 0.0,       viewport.Top + halfHeight,
            0.0,       0.0,        halfDepth, nearDepthRange + halfDepth,
            0.0,       0.0,        0.0,       1.0);

    };

    SceneState.ComputeViewportOrthographicMatrix = function(viewport){
        //
        // Bottom and top swapped:  MS -> OpenGL
        //
        return Matrix4D.CreateOrthographicOffCenter(
            viewport.Left, viewport.Right,
            viewport.Top, viewport.Bottom,
            0.0, 1.0);
    };





    return SceneState;
});