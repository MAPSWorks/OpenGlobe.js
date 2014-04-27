/**
 * Created by Administrator on 2014/4/26.
 */
define([
    'Core/defineProperties',
    'Core/Matrix3D',
    'Core/Geodetic3D',
    'Core/Vector3D'
],function(
    defineProperties,
    Matrix3D,
    Geodetic3D,
    Vector3D
    )
{
    'use strict';

    var CameraLookAtPoint = function(camera, window, ellipsoid){

        this._camera = camera;
        this._window = window;

        this._centerPoint = camera.Target;
        this._fixedToLocalRotation = Matrix3D.Identity;

        this._zoomFactor = 5.0;
        this._zoomRateRangeAdjustment = ellipsoid.MaximumRadius;
        this._maximumZoomRate = Number.MAX_VALUE;
        this._minimumZoomRate = ellipsoid.MaximumRadius / 100.0;

        this._rotateFactor = 1.0 / ellipsoid.MaximumRadius;
        this._rotateRateRangeAdjustment = ellipsoid.MaximumRadius;
        this._maximumRotateRate = 1.0;
        this._minimumRotateRate = 1.0 / 5000.0;

        this._azimuth = 0;
        this._elevation = 0;
        this._range = ellipsoid.MaximumRadius * 2.0;

        this._mouseEnabled = false;
        this._leftButtonDown = false;
        this._rightButtonDown = false;
        this._lastPoint = {X:0,Y:0};

        this._mouseDownCallBack = (function(that){
            var mouseDown = function(point,button){
                that.MouseDown(point,button);
            };
            return mouseDown;
        })(this);
        this._mouseUpCallBack = (function(that){
            var mouseUp = function(point,button){
                that.MouseUp(point,button);
            };
            return mouseUp;
        })(this);
        this._mouseMoveCallBack = (function(that){
            var mouseMove = function(point){
                that.MouseMove(point);
            };
            return mouseMove;
        })(this);


        this.MouseEnabled = true;
    };

    defineProperties(CameraLookAtPoint.prototype,{
        Camera : {
            get : function(){
                return this._camera;
            }
        },

        Window : {
            get : function(){
                return this._window;
            }
        },

        ZoomFactor : {
            get : function(){
                return this._zoomFactor;
            },
            set : function(x){
                this._zoomFactor = x;
            }
        },

        ZoomRateRangeAdjustment : {
            get : function(){
                return this._zoomRateRangeAdjustment;
            },
            set : function(x){
                this._zoomRateRangeAdjustment = x;
            }
        },

        RotateRateRangeAdjustment : {
            get : function(){
                return this._rotateRateRangeAdjustment;
            },
            set : function(x){
                this._rotateRateRangeAdjustment = x;
            }
        },

        RotateFactor : {
            get : function(){
                return this._rotateFactor;
            },
            set : function(x){
                this._rotateFactor = x;
            }
        },

        MinimumRotateRate : {
            get : function(){
                return this._minimumRotateRate;
            },
            set : function(x){
                this._minimumRotateRate = x;
            }
        },

        MaximumRotateRate : {
            get : function(){
                return this._maximumRotateRate;
            },
            set : function(x){
                this._maximumRotateRate = x;
            }
        },

        MaximumZoomRate : {
            get : function(){
                return this._maximumZoomRate;
            },
            set : function(x){
                this._maximumZoomRate = x;
            }
        },

        MinimumZoomRate : {
            get : function(){
                return this._minimumZoomRate;
            },
            set : function(x){
                this._minimumZoomRate = x;
            }
        },

        Azimuth : {
            get : function(){
                return this._azimuth;
            },
            set : function(x){
                this._azimuth = x;
                this.UpdateCameraFromParameters();
            }
        },

        Elevation : {
            get : function(){
                return this._elevation;
            },
            set : function(x){
                this._elevation = x;
                this.UpdateCameraFromParameters();
            }
        },

        Range : {
            get : function(){
                return this._range;
            },
            set : function(x){
                this._range = x;
                this.UpdateCameraFromParameters();
            }
        },

        CenterPoint : {
            get : function(){
                return this._centerPoint;
            },
            set : function(x){
                this._centerPoint = x;
                this.UpdateCameraFromParameters();
            }
        },

        FixedToLocalRotation : {
            get : function(){
                return this._fixedToLocalRotation;
            },
            set : function(x){
                this._fixedToLocalRotation = x;
                this.UpdateCameraFromParameters();
            }
        },

        MouseEnabled : {
            get : function(){
                return this._mouseEnabled;
            },
            set : function(x){
                if(x != this._mouseEnabled){
                    this._mouseEnabled = x;
                    if(this._mouseEnabled){
                        this._window.Mouse.AddMouseDownHandler(this._mouseDownCallBack);
                        this._window.Mouse.AddMouseUpHandler(this._mouseUpCallBack);
                        this._window.Mouse.AddMouseMoveHandler(this._mouseMoveCallBack);
                    }
                    else{
                        this._window.Mouse.RemoveMouseDownHandler(this._mouseDownCallBack);
                        this._window.Mouse.RemoveMouseUpHandler(this._mouseUpCallBack);
                        this._window.Mouse.RemoveMouseMoveHandler(this._mouseMoveCallBack);
                    }
                }
            }
        }
    });


    CameraLookAtPoint.prototype.ViewPoint = function(ellipsoid, geographic){
        this._centerPoint = ellipsoid.ToVector3D(geographic);

        // Fixed to East-North-Up rotation, from Wikipedia's "Geodetic System" topic.
        var cosLon = Math.cos(geographic.Longitude);
        var cosLat = Math.cos(geographic.Latitude);
        var sinLon = Math.sin(geographic.Longitude);
        var sinLat = Math.sin(geographic.Latitude);

        this._fixedToLocalRotation =
            new Matrix3D(-sinLon,            cosLon,             0.0,
                    -sinLat * cosLon,   -sinLat * sinLon,   cosLat,
                    cosLat * cosLon,    cosLat * sinLon,    sinLat);

        this.UpdateCameraFromParameters();
    };

    CameraLookAtPoint.prototype.UpdateParametersFromCamera = function(){
        var eyePosition = Matrix3D.MultiplyMatrix3DAndVector3D(
            this._fixedToLocalRotation,
            (this._camera.Eye.Subtract(this._camera.Target))
        );
        var up = Matrix3D.MultiplyMatrix3DAndVector3D(
            this._fixedToLocalRotation,
            this._camera.Up
        );

        this._range = Math.sqrt(eyePosition.X * eyePosition.X + eyePosition.Y * eyePosition.Y + eyePosition.Z * eyePosition.Z);
        this._elevation = Math.asin(eyePosition.Z / this._range);

        if (eyePosition.XY.MagnitudeSquared < up.XY.MagnitudeSquared)
        {
            // Near the poles, determine the azimuth from the Up direction instead of from the Eye position.
            if (eyePosition.Z > 0.0)
            {
                this._azimuth = Math.atan2(-up.Y, -up.X);
            }
            else
            {
                this._azimuth = Math.atan2(up.Y, up.X);
            }
        }
        else
        {
            this._azimuth = Math.atan2(eyePosition.Y, eyePosition.X);
        }
    };


    CameraLookAtPoint.prototype.UpdateCameraFromParameters = function(){
        this._camera.Target = this._centerPoint;

        var rangeTimesSinElevation = this._range * Math.cos(this._elevation);
        this._camera.Eye = new Vector3D(
                rangeTimesSinElevation * Math.cos(this._azimuth),
                rangeTimesSinElevation * Math.sin(this._azimuth),
                this._range * Math.sin(this._elevation));

        var right = this._camera.Eye.Cross(Vector3D.UnitZ());
        this._camera.Up = right.Cross(this._camera.Eye).Normalize();

        if (this._camera.Up.IsUndefined)
        {
            //TODO IsUndefined is not working now
            // Up vector is invalid because _camera.Eye is all Z (or very close to it).
            // So compute the Up vector directly assuming no Z component.
            this._camera.Up = new Vector3D(-Math.cos(this._azimuth), -Math.sin(this._azimuth), 0.0);
        }

        var localToFixed = this._fixedToLocalRotation.Transpose();
        this._camera.Eye = Matrix3D.MultiplyMatrix3DAndVector3D(localToFixed,this._camera.Eye);
        this._camera.Eye = this._camera.Eye.Add(this._centerPoint);
        this._camera.Up = Matrix3D.MultiplyMatrix3DAndVector3D(localToFixed ,this._camera.Up);
    };

    CameraLookAtPoint.prototype.MouseDown = function(point,button){
        if(button == 2){
            this._rightButtonDown = true;
        }else{
            this._leftButtonDown = true;
        }
        this._lastPoint = point;
    };

    CameraLookAtPoint.prototype.MouseUp = function(point,button){
        if(button == 2){
            this._rightButtonDown = false;
        }else{
            this._leftButtonDown = false;
        }
    };

    CameraLookAtPoint.prototype.MouseMove = function(point){
        if(!this._leftButtonDown && !this._rightButtonDown){
            return;
        }

        this.UpdateParametersFromCamera();
        var movement = {
            Width   :   (point.X - this._lastPoint.X),
            Height  :   (point.Y - this._lastPoint.Y)
        };

        if(this._leftButtonDown){
            this.Rotate(movement);
        }

        if(this._rightButtonDown){
            this.Zoom(movement);
        }

        this.UpdateCameraFromParameters();

        this._lastPoint = point;

    };



    CameraLookAtPoint.prototype.Rotate = function(movement){

        var rotateRate = this._rotateFactor * (this._range - this._rotateRateRangeAdjustment);
        if(rotateRate > this._maximumRotateRate){
            rotateRate = this._maximumRotateRate;
        }
        if(rotateRate < this._minimumRotateRate){
            rotateRate = this._minimumRotateRate;
        }

        var azimuthWindowRatio = movement.Width / this._window.Width;
        var elevationWindowRatio = movement.Height / this._window.Height;

        this._azimuth -= rotateRate * azimuthWindowRatio * 2 * Math.PI;
        this._elevation += rotateRate * elevationWindowRatio * Math.PI;

        var PiOverTwo = Math.PI * 0.5;

        while(this._azimuth > Math.PI){
            this._azimuth -= 2 * Math.PI;
        }
        while(this._azimuth < -Math.PI){
            this._azimuth += 2 * Math.PI;
        }

        if(this._elevation < -PiOverTwo){
            this._elevation = -PiOverTwo + 0.001;
        }else if(this._elevation > PiOverTwo){
            this._elevation = PiOverTwo - 0.001;
        }


        //console.log('Rotate');
    };

    CameraLookAtPoint.prototype.Zoom = function(movement){

        var zoomRate = this._zoomFactor * (this._range - this._zoomRateRangeAdjustment);
        if (zoomRate > this._maximumZoomRate)
        {
            zoomRate = this._maximumZoomRate;
        }
        if (zoomRate < this._minimumZoomRate)
        {
            zoomRate = this._minimumZoomRate;
        }

        var rangeWindowRatio = movement.Height / this._window.Height;
        this._range -= zoomRate * rangeWindowRatio;

        //console.log('zoom');
    };






    return CameraLookAtPoint;
});