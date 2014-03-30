/**
 * Created by Administrator on 2014/3/30.
 */
define(function(){
    var Utils = function(){

    };

    Utils.AngleBetween = function(v1, v2){
        return Math.acos(Utils.Dot(Utils.Normalize(v1), Utils.Normalize(v2)));
    };

    Utils.MagnitudeSquare = function(position3D){
        return (position3D[0] * position3D[0] +
                position3D[1] * position3D[1] +
                position3D[2] * position3D[2]);
    };

    Utils.Magnitude = function(position3D){
        return Math.sqrt(Utils.MagnitudeSquare(position3D));
    };

    Utils.RotateAroundAxis = function(v, axis, theta){
        var _x = v[0];
        var _y = v[1];
        var _z = v[2];

        var u = axis[0];
        var v = axis[1];
        var w = axis[2];

        var cosTheta = Math.cos(theta);
        var sinTheta = Math.sin(theta);

        var ms = Utils.MagnitudeSquare(axis);
        var m = Math.sqrt(ms);

        return vec3.fromValues(
            ((u * (u * _x + v * _y + w * _z)) +
                (((_x * (v * v + w * w)) - (u * (v * _y + w * _z))) * cosTheta) +
                (m * ((-w * _y) + (v * _z)) * sinTheta)) / ms,

            ((v * (u * _x + v * _y + w * _z)) +
                (((_y * (u * u + w * w)) - (v * (u * _x + w * _z))) * cosTheta) +
                (m * ((w * _x) - (u * _z)) * sinTheta)) / ms,

            ((w * (u * _x + v * _y + w * _z)) +
                (((_z * (u * u + v * v)) - (w * (u * _x + v * _y))) * cosTheta) +
                (m * (-(v * _x) + (u * _y)) * sinTheta)) / ms
        );
    };


    Utils.Add = function(v1, v2){
        var res = vec3.create();
        ve3.add(res,v1,v2);
        return res;
    };

    Utils.Coss = function(v1 ,v2){
        var res = vec3.create();
        vec3.cross(res, v1, v2);
        return res;
    };

    Utils.Dot = function(v1, v2){
        return vec3.dot(v1, v2);
    };

    Utils.Normalize = function(v){
        var res = vec3.create();
        vec3.normalize(res, v);
        return res;
    };

    return Utils;
});