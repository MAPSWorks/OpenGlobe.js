/**
 * Created by Administrator on 2014/4/26.
 */
define([
    'Core/Utils',
    'Core/defineProperties',
    'Core/Vector2D',
    'Core/Vector3D'],function(Utils,defineProperties,Vector2D,Vector3D){

    'use strict';

    var Vector4D = function(x, y, z, w){
        this._x = x;
        this._y = y;
        this._z = z;
        this._w = w;
    };

    Vector4D.Zero = function(){
        return new Vector4D(0,0,0,0);
    };

    Vector4D.UnitX = function(){
        return new Vector4D(1.0,0.0,0.0,0.0);
    };

    Vector4D.UnitY = function(){
        return new Vector4D(0.0,1.0,0.0,0.0);
    };

    Vector4D.UnitZ = function(){
        return new Vector4D(0.0,0.0,1.0,0.0);
    };

    Vector4D.UnitW = function(){
        return new Vector4D(0.0,0.0,0.0,1.0);
    };

    defineProperties(Vector4D.prototype,{
        X : {
            get : function(){
                return this._x;
            }
        },

        Y : {
            get : function(){
                return this._y;
            }
        },

        Z : {
            get : function(){
                return this._z;
            }
        },

        W : {
            get : function(){
                return this._w;
            }
        },

        XY : {
            get : function(){
                return new Vector2D(this.X,this.Y);
            }
        },

        XYZ : {
            get : function(){
                return new Vector3D(this.X,this.Y,this.Z);
            }
        },

        MagnitudeSquared : {
            get : function(){
                return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w;
            }
        },

        Magnitude : {
            get : function(){
                return Math.sqrt(this.MagnitudeSquared);
            }
        },

        IsUndefined : {
            get : function(){
                //TODO
                return false;
            }
        },

        MostOrthogonalAxis : {
            get : function(){
                var x = Math.abs(this.X);
                var y = Math.abs(this.Y);
                var z = Math.abs(this.Z);
                var w = Math.abs(this.W);

                if ((x < y) && (x < z) && (x < w))
                {
                    return this.UnitX;
                }
                else if ((y < x) && (y < z) && (y < w))
                {
                    return this.UnitY;
                }
                else if ((z < x) && (z < y) && (z < w))
                {
                    return this.UnitZ;
                }
                else
                {
                    return this.UnitW;
                }
            }
        }
    });

    Vector4D.prototype.Normalize = function(){
        var magnitude = this.Magnitude;
        return Vector4D._divide(this, magnitude);
    };

    Vector4D.prototype.ToArray = function(){
        return [this.X,this.Y,this.Z,this.W];
    };

    Vector4D.prototype.Dot = function(v){
        return this.X * v.X + this.Y * v.Y + this.Z * v.Z + this.W * v.W;
    };

    Vector4D.prototype.Add = function(v){
        return Vector4D._add(this,v);
    };

    Vector4D.prototype.Subtract = function(v){
        return Vector4D._sub(this,v);
    };

    Vector4D.prototype.Multiply = function(scalar){
        return Vector4D._mul(this,scalar);
    };

    Vector4D.prototype.MultiplyComponents = function(scale){
        return new Vector4D(
                this.X * scale.X,
                this.Y * scale.Y,
                this.Z * scale.Z,
                this.W * scale.W);
    };

    Vector4D.prototype.Negate = function(){
        return Vector4D._sub(Vector4D.Zero(),this);
    };

    Vector4D.prototype.Divide = function(scalar){
        return Vector4D._divide(this,scalar);
    };

    Vector4D.prototype.EqualsEpsilon = function(other,epsilon){
        return  (Math.abs(this._x - other._x) <= epsilon) &&
                (Math.abs(this._y - other._y) <= epsilon) &&
                (Math.abs(this._z - other._z) <= epsilon) &&
                (Math.abs(this._w - other._w) <= epsilon);
    };

    Vector4D.prototype.Equals = function(other){
        return this._x == other._x && this._y == other._y && this._z == other._z && this._w == other._w;
    };






    Vector4D._sub = function(v1,v2){
        return new Vector4D(v1.X - v2.X, v1.Y - v2.Y, v1.Z - v2.Z,v1.W - v2.W);
    };

    Vector4D._add = function(v1,v2){
        return new Vector4D(v1.X + v2.X, v1.Y + v2.Y, v1.Z + v2.Z, v1.W + v2.W);
    };

    Vector4D._mul = function(v, d){
        return new Vector4D(v.X * d, v.Y * d, v.Z * d, v.W * d);
    };

    Vector4D._divide = function(v, d){
        return new Vector4D(v.X / d, v.Y / d, v.Z / d, v.W/d);
    };

    return Vector4D;
});