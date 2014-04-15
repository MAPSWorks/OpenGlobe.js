/**
 * Created by luosong on 2014/4/11.
 */
define(['Core/Matrix4D','Core/Ellipsoid'],function(Matrix4D,Ellipsoid){
   'use strict';

    var DrawAutomaticUniform = {};

    var SunPosition = function(uniform){
        this._uniform = uniform;
    };
    SunPosition.prototype.Set = function(context,drawState,sceneState){
        this._uniform.Value = sceneState.SunPosition.ToArray();

        //gl.uniform3fv(this._uniform.Location,this._uniform.Value.ToArray());
        //this._uniform.Set(context.GL);

    };

    var LightProperties = function(uniform){
        this._uniform = uniform;
    };
    LightProperties.Set = function(context,drawState,sceneState){
        this._uniform.Value = [
            sceneState.DiffuseIntensity,
            sceneState.SpecularIntensity,
            sceneState.AmbientIntensity,
            sceneState.Shininess
        ];
        //this._uniform.Set(context.GL);

    };

    var CameraLightPosition = function(uniform){
        this._uniform = uniform;
    };
    CameraLightPosition.prototype.Set = function(context,drawState,sceneState){
        this._uniform.Value = sceneState.CameraLightPosition.ToArray();
        //this._uniform.Set(context.GL);
    };

    var CameraEye = function(uniform){
        this._uniform = uniform;
    }
    CameraEye.prototype.Set = function(context,drawState,sceneState){
        this._uniform.Value = sceneState.Camera.Eye.ToArray();
        //this._uniform.Set(context.GL);
    };

    var CameraEyeHigh = function(uniform){
        this._uniform = uniform;
    };
    CameraEyeHigh.prototype.Set = function(context,drawState,sceneState){
        this._uniform.Value = sceneState.Camera.EyeHigh.ToArray();
        //this._uniform.Set(context.GL);
    };

    var CameraEyeLow = function(uniform){
        this._uniform = uniform;
    };
    CameraEyeLow.prototype.Set = function(context,drawState,sceneState){
        this._uniform.Value = sceneState.Camera.EyeLow.ToArray();
        //this._uniform.Set(context.GL);
    };

    var ModelViewPerspectiveMatrixRelativeToEye = function(uniform){
        this._uniform = uniform;
    };
    ModelViewPerspectiveMatrixRelativeToEye.prototype.Set = function(context,drawState,sceneState){
        this._uniform.Value = sceneState.ModelViewPerspectiveMatrixRelativeToEye.ReadOnlyColumnMajorValues;
        //this._uniform.Set(context.GL);
    };

    var ModelViewMatrixRelativeToEye = function(uniform){
        this._uniform = uniform;
    };
    ModelViewMatrixRelativeToEye.prototype.Set = function(context,drawState,sceneState){
        this._uniform.Value = sceneState.ModelViewMatrixRelativeToEye.ReadOnlyColumnMajorValues;
        //this._uniform.Set(context.GL);
    };

    var ModelViewPerspectiveMatrix = function(uniform){
        this._uniform = uniform;
    };
    ModelViewPerspectiveMatrix.prototype.Set = function(context,drawState,sceneState){
        this._uniform.Value = sceneState.ModelViewPerspectiveMatrix.ReadOnlyColumnMajorValues;
        //this._uniform.Set(context.GL);
    };

    var ModelViewOrthographicMatrix = function(uniform){
        this._uniform = uniform;
    };
    ModelViewOrthographicMatrix.prototype.Set = function(context,drawState,sceneState){
        this._uniform.Value = sceneState.ModelViewOrthographicMatrix.ReadOnlyColumnMajorValues;
        //this._uniform.Set(context.GL);
    };

    var ModelViewMatrix = function(uniform){
        this._uniform = uniform;
    };
    ModelViewMatrix.prototype.Set = function(context,drawState,sceneState){
        this._uniform.Value = sceneState.ModelViewMatrix.ReadOnlyColumnMajorValues;
        //this._uniform.Set(context.GL);
    };

    var ModelMatrix = function(uniform){
        this._uniform = uniform;
    };
    ModelMatrix.prototype.Set = function(context,drawState,sceneState){
        this._uniform.Value = sceneState.ModelMatrix.ReadOnlyColumnMajorValues;
        //this._uniform.Set(context.GL);
    };

    var ViewMatrix = function(uniform){
        this._uniform = uniform;
    };
    ViewMatrix.prototype.Set = function(context,drawState,sceneState){
        this._uniform.Value = sceneState.ViewMatrix.ReadOnlyColumnMajorValues;
        //this._uniform.Set(context.GL);
    };

    var PerspectiveMatrix = function(uniform){
        this._uniform = uniform;
    };
    PerspectiveMatrix.prototype.Set = function(context,drawState,sceneState){
        this._uniform.Value = sceneState.PerspectiveMatrix.ReadOnlyColumnMajorValues;
        //this._uniform.Set(context.GL);
    };

    var OrthographicMatrix = function(uniform){
        this._uniform = uniform;
    };
    OrthographicMatrix.prototype.Set = function(context,drawState,sceneState){
        this._uniform.Value = sceneState.OrthographicMatrix.ReadOnlyColumnMajorValues;
        //this._uniform.Set(context.GL);
    };

    var ViewportOrthographicMatrix = function(uniform){
        this._uniform = uniform;
    };
    ViewportOrthographicMatrix.prototype.Set = function(context,drawState,sceneState){
        this._uniform.Value = sceneState.ViewportOrthographicMatrix.ReadOnlyColumnMajorValues;
        //this._uniform.Set(context.GL);
    };

    var Viewport = function(uniform){
        this._uniform = uniform;
    };
    Viewport.prototype.Set = function(context,drawState,sceneState){
        var viewport = context.Viewport;
        this._uniform.Value = [viewport.Left,viewport.Top,viewport.Width,viewport.Height];
        //this._uniform.Set(context.GL);
    };

    var InverseViewportDimensions = function(uniform){
        this._uniform = uniform;
    };
    InverseViewportDimensions.prototype.Set = function(context,drawState,sceneState){
        var viewport = context.Viewport;
        this._uniform.Value = [1/viewport.Width,1/viewport.Height];
        //this._uniform.Set(context.GL);
    };

    var ViewportTransformationMatrix = function(uniform){
        this._uniform = uniform;
    };
    ViewportTransformationMatrix.prototype.Set = function(context,drawState,sceneState){
        this._uniform.Value = sceneState.ComputeViewportTransformationMatrix(
            context.Viewport,
            drawState.RenderState.DepthRange.Near,
            drawState.RenderState.DepthRange.Far
        ).ReadOnlyColumnMajorValues;
        //this._uniform.Set(context.GL);
    }

    var ModelZToClipCoordinates = function(uniform){
        this._uniform = uniform;
    };
    ModelZToClipCoordinates.prototype.Set = function(context,drawState,sceneState){
        this._uniform.Value = sceneState.ModelZToClipCoordinates.ReadOnlyColumnMajorValues;
        //this._uniform.Set(context.GL);
    };

    var WindowToWorldNearPlane = function(uniform){
        this._uniform = uniform;
    };
    WindowToWorldNearPlane.prototype.Set = function(context,drawState,sceneState){
        var camera = sceneState.Camera;
        var theta = camera.FieldOfViewX * 0.5;
        var phi = camera.FieldOfViewY * 0.5;
        var nearDistance = camera.PerspectiveNearPlaneDistance;

        //
        // Coordinate system for the near plane:  origin is at center, x and y
        // span [-1, 1] just like noramlized device coordinates.
        //
        var origin = camera.Eye.Add(camera.Forward.Multiply(nearDistance));    // Project eye onto near plane
        var xAxis = camera.Right.Multiply(nearDistance * Math.tan(theta));  // Rescale right to near plane
        var yAxis = camera.Up.Multiply(nearDistance * Math.tan(phi));       // Rescale up to near plane

        this._uniform.Value = new Matrix4D(
            xAxis.X, yAxis.X, 0.0, origin.X,
            xAxis.Y, yAxis.Y, 0.0, origin.Y,
            xAxis.Z, yAxis.Z, 0.0, origin.Z,
            0.0,     0.0,     0.0, 1.0
        ).ReadOnlyColumnMajorValues;

        //this._uniform.Set(context.GL);
    };

    var Wgs84Height = function(uniform){
        this._uniform = uniform;
    };
    Wgs84Height.prototype.Set = function(context,drawState,sceneState){
        this._uniform.Value = sceneState.Camera.height(Ellipsoid.Wgs84);
        //this._uniform.Set(context.GL);
    };

    var PerspectiveNearPlaneDistance = function(uniform){
        this._uniform = uniform;
    };
    PerspectiveNearPlaneDistance.prototype.Set = function(context,drawState,sceneState){
        this._uniform.Value = sceneState.Camera.PerspectiveNearPlaneDistance;
        //this._uniform.Set(context.GL);
    };

    var PerspectiveFarPlaneDistance = function(uniform){
        this._uniform = uniform;
    };
    PerspectiveFarPlaneDistance.prototype.Set = function(context,drawState,sceneState){
        this._uniform.Value = sceneState.Camera.PerspectiveFarPlaneDistance;
        //this._uniform.Set(context.GL);
    };

    var HighResolutionSnapScale = function(uniform){
        this._uniform = uniform;
    };
    HighResolutionSnapScale.prototype.Set = function(context,drawState,sceneState){
        this._uniform.Value = sceneState.Camera.HighResolutionSnapScale;
        //this._uniform.Set(context.GL);
    };

    var PixelSizePerDistance = function(uniform){
        this._uniform = uniform;
    };
    PixelSizePerDistance.prototype.Set = function(context,drawState,sceneState){
        this._uniform.Value = Math.tan(0.5 * sceneState.Camera.FieldOfViewY) * 2.0 / context.Viewport.Height;
        //this._uniform.Set(context.GL);
    };

    DrawAutomaticUniform['SunPosition']         = SunPosition;
    DrawAutomaticUniform['LightProperties']     = LightProperties;
    DrawAutomaticUniform['CameraLightPosition'] = CameraLightPosition;
    DrawAutomaticUniform['CameraEye']           = CameraEye;
    DrawAutomaticUniform['CameraEyeHigh']       = CameraEyeHigh;
    DrawAutomaticUniform['CameraEyeLow']        = CameraEyeLow;
    DrawAutomaticUniform['ModelViewPerspectiveMatrixRelativeToEye'] = ModelViewPerspectiveMatrixRelativeToEye;
    DrawAutomaticUniform['ModelViewMatrixRelativeToEye'] = ModelViewMatrixRelativeToEye;
    DrawAutomaticUniform['ModelViewPerspectiveMatrix']   = ModelViewPerspectiveMatrix;
    DrawAutomaticUniform['ModelViewOrthographicMatrix']  = ModelViewOrthographicMatrix;
    DrawAutomaticUniform['ModelViewMatrix']              = ModelViewMatrix;
    DrawAutomaticUniform['ModelMatrix']         = ModelMatrix;
    DrawAutomaticUniform['ViewMatrix']          = ViewMatrix;
    DrawAutomaticUniform['PerspectiveMatrix']   = PerspectiveMatrix;
    DrawAutomaticUniform['OrthographicMatrix']  = OrthographicMatrix;
    DrawAutomaticUniform['ViewportOrthographicMatrix'] = ViewportOrthographicMatrix;
    DrawAutomaticUniform['Viewport']            = Viewport;
    DrawAutomaticUniform['InverseViewportDimensions'] = InverseViewportDimensions;
    DrawAutomaticUniform['ViewportTransformationMatrix'] = ViewportTransformationMatrix;
    DrawAutomaticUniform['ModelZToClipCoordinates'] = ModelZToClipCoordinates;
    DrawAutomaticUniform['WindowToWorldNearPlane']  = WindowToWorldNearPlane;
    DrawAutomaticUniform['Wgs84Height']         = Wgs84Height;
    DrawAutomaticUniform['PerspectiveNearPlaneDistance'] = PerspectiveNearPlaneDistance;
    DrawAutomaticUniform['PerspectiveFarPlaneDistance'] = PerspectiveFarPlaneDistance;
    DrawAutomaticUniform['HighResolutionSnapScale'] = HighResolutionSnapScale;
    DrawAutomaticUniform['PixelSizePerDistance']    = PixelSizePerDistance;

    return DrawAutomaticUniform;
});