/**
 * Created by Administrator on 2014/4/5.
 */
define([
    'Core/defineProperties',
    'Core/Vector3D'
],function(
    defineProperties,
    Vector3D
    ){
    'use strict';

    var Camera  = function(){
        this._eye = Vector3D.UnitY().Negate();
        this._target = Vector3D.Zero();
        this._up = Vector3D.UnitZ();

        this._fieldOfViewY = Math.PI / 6.0;
        this._aspectRatio = 1;

        this._perspectiveNearPlaneDistance = 0.01;
        this._perspectiveFarPlaneDistance = 64;

        this._orthographicNearPlaneDistance = 0;
        this._orthographicFarPlaneDistance = 1;

        this._orthographicLeft = 0;
        this._orthographicRigth = 1;

        this._orthographicBottom = 0;
        this._orthographicTop = 1;

    };

    defineProperties(Camera.prototype,{
        Eye:{
            get : function(){
                return this._eye;
            },
            set : function(x){
                this._eye = x;
            }
        },

        Target:{
            get : function(){
                return this._target;
            },
            set : function(x){
                this._target = x;
            }
        },

        Up:{
            get : function(){
                return this._up;
            },
            set : function(x){
                this._up = x;
            }
        },

        EyeHigh:{
            get : function(){
                return this._eye;
            }
        },

        EyeLow:{
            get : function(){
                return this.Eye.Subtract(this.EyeHigh);
            }
        },

        Forward:{
            get : function(){
                return (this.Target.Subtract(this.Eye)).Normalize();
            }
        },

        Right:{
            get : function(){
                return (this.Forward.Cross(this.Up)).Normalize();
            }
        },

        FieldOfViewX:{
            get : function(){
                return (2.0 * Math.atan(this._aspectRatio * Math.tan(this._fieldOfViewY * 0.5)));
            }
        },

        FieldOfViewY:{
            get : function(){
                return this._fieldOfViewY;
            },
            set : function(d){
                this._fieldOfViewY = d;
            }
        },

        AspectRatio:{
            get : function(){
                return this._aspectRatio;
            },
            set : function(x){
                this._aspectRatio = x;
            }
        },

        PerspectiveNearPlaneDistance:{
            get : function(){
                return this._perspectiveNearPlaneDistance;
            },
            set : function(x){
                this._perspectiveNearPlaneDistance = x;
            }
        },

        PerspectiveFarPlaneDistance:{
            get : function(){
                return this._perspectiveFarPlaneDistance;
            },
            set : function(x){
                this._perspectiveFarPlaneDistance = x;
            }
        },

        OrthographicNearPlaneDistance:{
            get : function(){
                return this._orthographicNearPlaneDistance;
            },
            set : function(x){
                this._orthographicNearPlaneDistance = x;
            }
        },

        OrthographicFarPlaneDistance:{
            get : function(){
                return this._orthographicFarPlaneDistance;
            },
            set : function(x){
                this._orthographicFarPlaneDistance = x;
            }
        },

        OrthographicDepth:{
            get : function(){
                return Math.abs(this.OrthographicFarPlaneDistance - this.OrthographicNearPlaneDistance);
            }
        },

        OrthographicLeft:{
            get : function(){
                return this._orthographicLeft;
            },
            set : function(x){
                this._orthographicLeft = x;
            }
        },

        OrthographicRight:{
            get : function(){
                return this._orthographicRigth;
            },
            set : function(x){
                this._orthographicRigth = x;
            }
        },

        OrthographicBottom:{
            get : function(){
                return this._orthographicBottom;
            },
            set : function(d){
                this._orthographicBottom = d;
            }
        },

        OrthographicTop:{
            get : function(){
                return this._orthographicTop;
            },
            set : function(d){
                this._orthographicTop = d;
            }
        }

    });


    Camera.prototype.zoomToTarget = function(radius){
        var toEye = (this.Eye.Subtract(this.Target)).Normalize();

        var sin = Math.sin(Math.min(this.FieldOfViewX,this.FieldOfViewY) * 0.5);
        var distance = (radius / sin);

        this.Eye = this.Target.Add(toEye.Multiply(distance));
    };

    Camera.prototype.height = function(ellipsoid){
        return ellipsoid.ToGeodetic3D(this.Eye).getHeight();
    };



    return Camera;
});