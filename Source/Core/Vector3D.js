/**
 * Created by Administrator on 2014/3/30.
 */
define(['Core/Utils','Core/defineProperties','Core/Vector2D'],function(Utils,defineProperties,Vector2D){
    var Vector3D = function(x, y, z){
        this._x = x;
        this._y = y;
        this._z = z;
    };

    Vector3D.Zero = function(){
        return new Vector3D(0,0,0);
    };

    Vector3D.UnitX = function(){
        return new Vector3D(1.0,0.0,0.0);
    };

    Vector3D.UnitY = function(){
        return new Vector3D(0.0,1.0,0.0);
    };

    Vector3D.UnitZ = function(){
        return new Vector3D(0.0,0.0,1.0);
    };

    defineProperties(Vector3D.prototype,{
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

        XY : {
            get : function(){
                return new Vector2D(this.X,this.Y);
            }
        },

        MagnitudeSquared : {
            get : function(){
                return this._x * this._x + this._y * this._y + this._z * this._z;
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

        MaximumComponent : {
            get : function(){
                return Math.max(Math.max(this._x,this._y),this._z);
            }
        },

        MinimumComponent : {
            get :function(){
                return Math.min(Math.min(this._x,this._y),this._z);
            }
        },

        MostOrthogonalAxis : {
            get : function(){
                var x = Math.abs(this._x);
                var y = Math.abs(this._y);
                var z = Math.abs(this._z);

                if( (x < y) && (x < z)){
                    return Vector3D.UnitX();
                }else if( (y < x) && (y < z)){
                    return Vector3D.UnitY();
                }else{
                    return Vector3D.UnitZ();
                }
            }
        }
    });

    Vector3D.prototype.Normalize = function(){
        var magnitude = this.Magnitude;
        return Vector3D._divide(this,magnitude);
    };

    Vector3D.prototype.ToArray = function(){
        return [this.X,this.Y,this.Z];
    };

    Vector3D.prototype.Cross = function(v){
        return new Vector3D(
            this.Y * v.Z - this.Z * v.Y,
            this.Z * v.X - this.X * v.Z,
            this.X * v.Y - this.Y * v.X
        );
    };

    Vector3D.prototype.Dot = function(v){
        return this.X * v.X + this.Y * v.Y + this.Z * v.Z;
    };

    Vector3D.prototype.Add = function(v){
        return Vector3D._add(this,v);
    };

    Vector3D.prototype.Subtract = function(v){
        return Vector3D._sub(this,v);
    };

    Vector3D.prototype.Multiply = function(d){
        return Vector3D._mul(this,d);
    };

    Vector3D.prototype.MultiplyComponents = function(v){
        return new Vector3D(this.X * v.X, this.Y * v.Y, this.Z * v.Z);
    };

    Vector3D.prototype.Divide = function(d){
        return Vector3D._divide(this,d);
    };


    Vector3D.prototype.AngleBetween = function(other){
        return Math.acos(this.Normalize().Dot(other.Normalize()));
    };

    Vector3D.prototype.RotateAroundAxis = function(axis, theta){
        var u = axis.X;
        var v = axis.Y;
        var w = axis.Z;

        var cosTheta = Math.cos(theta);
        var sinTheta = Math.sin(theta);

        var ms = axis.MagnitudeSquared;
        var m = Math.sqrt(ms);

        var _x = this._x;
        var _y = this._y;
        var _z = this._z;

        return new Vector3D(
                ((u * (u * _x + v * _y + w * _z)) +
                    (((_x * (v * v + w * w)) - (u * (v * _y + w * _z))) * cosTheta) +
                    (m * ((-w * _y) + (v * _z)) * sinTheta)) / ms,

                ((v * (u * _x + v * _y + w * _z)) +
                    (((_y * (u * u + w * w)) - (v * (u * _x + w * _z))) * cosTheta) +
                    (m * ((w * _x) - (u * _z)) * sinTheta)) / ms,

                ((w * (u * _x + v * _y + w * _z)) +
                    (((_z * (u * u + v * v)) - (w * (u * _x + v * _y))) * cosTheta) +
                    (m * (-(v * _x) + (u * _y)) * sinTheta)) / ms);
    };

    Vector3D.prototype.Negate = function(){
        return Vector3D._sub(Vector3D.Zero(),this);
    };

    Vector3D.prototype.EqualsEpsilon = function(other, epsilon){
        return (Math.abs(this._x - other.X) <= epsilon) &&
            (Math.abs(this._y - other.Y) <= epsilon) &&
            (Math.abs(this._z - other.Z) <= epsilon);
    };

    Vector3D.Equals = function(other){
        return (this._x == other.X) && (this._y == other.Y) && (this._z == other.Z);
    };

    Vector3D._sub = function(v1,v2){
        return new Vector3D(v1.X - v2.X, v1.Y - v2.Y, v1.Z - v2.Z);
    };

    Vector3D._add = function(v1,v2){
        return new Vector3D(v1.X + v2.X, v1.Y + v2.Y, v1.Z + v2.Z);
    };

    Vector3D._mul = function(v, d){
        return new Vector3D(v.X * d, v.Y * d, v.Z * d);
    };

    Vector3D._divide = function(v, d){
        return new Vector3D(v.X / d, v.Y / d, v.Z / d);
    };



    Vector3D.BiggerThan = function(v1,v2){
        return (v1.X > v2.X) && (v1.Y > v2.Y) && (v1.Z > v2.Z);
    };

    Vector3D.BiggerThanEquals = function(v1,v2){
        return (v1.X >= v2.X) && (v1.Y >= v2.Y) && (v1.Z >= v2.Z);
    };

    Vector3D.SmallThan = function(v1,v2){
        return (v1.X < v2.X) && (v1.Y < v2.Y) && (v1.Z < v2.Z);
    };

    Vector3D.SmallThanEquals = function(v1,v2){
        return (v1.X <= v2.X) && (v1.Y <= v2.Y) && (v1.Z <= v2.Z);
    };

//    Vector3D.Equals = function(v1,v2){
//        return (v1.X == v2.X) && (v1.Y == v2.Y) && (v1.Z == v2.Z);
//    };

//    Vector3D.NotEquals = function(v1,v2){
//        return !Vector3D.Equals(v1,v2);
//    };

    return Vector3D;
});