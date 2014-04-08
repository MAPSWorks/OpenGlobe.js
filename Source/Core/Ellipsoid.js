/**
 * Created by luosong on 2014/3/27.
 */
define([
    'Core/Utils',
    'Core/defineProperties',
    'Core/Vector2D',
    'Core/Vector3D',
    'Core/Geodetic2D',
    'Core/Geodetic3D'],
function(
    Utils,
    defineProperties,
    Vector2D,
    Vector3D,
    Geodetic2D,
    Geodetic3D){

    var Ellipsoid = function(x, y, z){
        if(x <= 0.0 || y <= 0.0 || z <= 0.0){
            throw new Error("radii error");
        }

        this._radii = new Vector3D(x,y,z);
        this._radiiSquared = new Vector3D(
            x * x,
            y * y,
            z * z
        );
        this._radiiToTheFourth = new Vector3D(
            this._radiiSquared.X * this._radiiSquared.X,
            this._radiiSquared.Y * this._radiiSquared.Y,
            this._radiiSquared.Z * this._radiiSquared.Z
        );
        this._oneOverRadiiSquared = new Vector3D(
            1.0 / (x * x),
            1.0 / (y * y),
            1.0 / (z * z)
        );

    };

    Ellipsoid.Wgs84 = new Ellipsoid(6378137.0, 6378137.0, 6356752.314245);
    Ellipsoid.ScaledWgs84 = new Ellipsoid(1.0, 1.0, 6356752.314245 / 6378137.0);
    Ellipsoid.UnitSphere = new Ellipsoid(1.0, 1.0, 1.0);

    Ellipsoid.CentricSurfaceNormal = function(positionOnEllipsoid){
        return positionOnEllipsoid.Normalize();
    };

    Ellipsoid.prototype.GeodeticSurfaceNormal = function(position){
        //var t = typeof position;
        var t = position instanceof Geodetic3D;
        if(t){
            var geodetic = position;
            var cosLatitude = Math.cos(geodetic.getLatitude());
            var v = new Vector3D(
                cosLatitude * Math.cos(geodetic.getLongitude()),
                cosLatitude * Math.sin(geodetic.getLongitude()),
                Math.sin(geodetic.getLatitude())
            );
            return v;
        } 
        t = position instanceof Vector3D;
        if(t){
            return (position.MultiplyComponents(this._oneOverRadiiSquared)).Normalize();
        }
    }


    defineProperties(Ellipsoid.prototype, {
        Radii : {
            get : function(){
                return this._radii;
            }
        },
        RadiiSquared : {
            get : function(){
                return this._radiiSquared;
            }
        },
        OneOverRadiiSquared : {
            get : function(){
                return this._oneOverRadiiSquared;
            }
        },
        MinimumRadius : {
            get : function(){
                return Math.min(this._radii.X, Math.min(this._radii.Y, this._radii.Z));
            }
        },
        MaximumRadius : {
            get : function(){
                return Math.max(this._radii.X, Math.max(this._radii.Y, this._radii.Z));
            }
        }
    });

    Ellipsoid.prototype.Intersections = function(origin, direction){
        var normalizeDirection = direction.Normalize();

        var a = normalizeDirection.X * normalizeDirection.X * this._oneOverRadiiSquared.X +
                normalizeDirection.Y * normalizeDirection.Y * this._oneOverRadiiSquared.Y +
                normalizeDirection.Z * normalizeDirection.Z * this._oneOverRadiiSquared.Z;
        var b = 2.0 * 
                (origin.X * normalizeDirection.X * this._oneOverRadiiSquared.X +
                 origin.Y * normalizeDirection.Y * this._oneOverRadiiSquared.Y +
                 origin.Z * normalizeDirection.Z * this._oneOverRadiiSquared.Z);
        var c = origin.X * origin.X * this._oneOverRadiiSquared.X +
                origin.Y * origin.Y * this._oneOverRadiiSquared.Y +
                origin.Z * origin.Z * this._oneOverRadiiSquared.Z - 1.0;

        var discriminant = b * b - 4 * a * c;
        if(discriminant < 0.0){
            //no intersections
            return [];
        }else if(discriminant === 0.0){
            return [-0.5*b/a];
        }

        var t = -0.5 * (b + (b > 0.0 ? 1.0 : -1.0) * Math.sqrt(discriminant));
        var root1 = t / a;
        var root2 = c / t;

        if(root1 < root2){
            return [root1,root2];
        }else{
            return [root2,root1];
        }

    };

    Ellipsoid.prototype.ToVector3D = function(geodetic){
        var flags = geodetic instanceof Geodetic2D;
        var geodetic3D = null;
        if(flags){
            geodetic3D = new Geodetic3D(geodetic.Longitude, geodetic.Latitude, 0.0);
        }else{
            geodetic3D = geodetic;
        }

        var n = this.GeodeticSurfaceNormal(geodetic3D);
        var k = this._radiiSquared.MultiplyComponents(n);

        var gamma = Math.sqrt(
            (k.X * n.X) +
            (k.Y * n.Y) +
            (k.Z * n.Z)
        );

        var rSurface = new Vector3D(
            k.X/gamma, k.Y/gamma, k.Z/gamma
        );

        return rSurface.Add(n.Multiply(geodetic3D.Height));
    };

    Ellipsoid.prototype.ToGeodetic2D = function(positionOnEllipsoid){
        var n = this.GeodeticSurfaceNormal(positionOnEllipsoid);
        return new Geodetic2D(
            Math.atan2(n.Y, n.X),
            Math.asin(n.Z / n.Magnitude)
        );
    };

    Ellipsoid.prototype.ToGeodetic3D = function(position){
        var p = this.ScaleToGeodeticSurface(position);
        var h = position.Subtract(p);

        var height = Utils.Sign(h.Dot(position)) * h.Magnitude;

        var geo2d = this.ToGeodetic2D(p);

        return new Geodetic3D(geo2d.Longitude, geo2d.Latitude, height);

    };

    Ellipsoid.prototype.ToGeodetic2Ds = function(positions){
        var geodetics = [];

        for(var i = 0; i < positions.length; i++){
            var position = positions[i];
            geodetics.push(this.ToGeodetic2D(position));
        }

        return geodetics;
    };

    Ellipsoid.prototype.ToGeodetic3Ds = function(positions){
        var geodetics = [];

        for( var i = 0; i < positions.length; i++){
            var position = positions[i];
            geodetics.push(this.ToGeodetic3D(position));
        }

        return geodetics;
    };

    Ellipsoid.prototype.ScaleToGeodeticSurface = function(position){
        var  beta = 1.0 / Math.sqrt(
            (position.X * position.X) * this._oneOverRadiiSquared.X +
            (position.Y * position.Y) * this._oneOverRadiiSquared.Y +
            (position.Z * position.Z) * this._oneOverRadiiSquared.Z
        );

        var n = new Vector3D(
            beta * position.X * this._oneOverRadiiSquared.X,
            beta * position.Y * this._oneOverRadiiSquared.Y,
            beta * position.Z * this._oneOverRadiiSquared.Z).Magnitude;

        var alpha = (1.0 - beta) * (position.Magnitude/n);

        var x2 = position.X * position.X;
        var y2 = position.Y * position.Y;
        var z2 = position.Z * position.Z;

        var da = 0.0;
        var db = 0.0;
        var dc = 0.0;

        var s = 0.0;
        var dSdA = 1.0;

        do{
            alpha -= (s / dSdA);

            da = 1.0 + (alpha * this._oneOverRadiiSquared.X);
            db = 1.0 + (alpha * this._oneOverRadiiSquared.Y);
            dc = 1.0 + (alpha * this._oneOverRadiiSquared.Z);

            var da2 = da * da;
            var db2 = db * db;
            var dc2 = dc * dc;

            var da3 = da * da2;
            var db3 = db * db2;
            var dc3 = dc * dc2;

            s = x2 / (this._radiiSquared.X * da2) +
                y2 / (this._radiiSquared.Y * db2) +
                z2 / (this._radiiSquared.Z * dc2) - 1.0;

            dSdA = -2.0 * (
                x2 / (this._radiiToTheFourth.X * da3) +
                y2 / (this._radiiToTheFourth.Y * db3) +
                z2 / (this._radiiToTheFourth.Z * dc3)
                );
        }while(Math.abs(s) > 1e-10);

        return new Vector3D(
            position.X/da,
            position.Y/db,
            position.Z/dc
        );
    };

    Ellipsoid.prototype.ScaleTOGeocentricSurface = function(position){
        var  beta = 1.0 / Math.sqrt(
                (position.X * position.X) * this._oneOverRadiiSquared.X +
                (position.Y * position.Y) * this._oneOverRadiiSquared.Y +
                (position.Z * position.Z) * this._oneOverRadiiSquared.Z
        );

        return new Vector3D(
            beta * position.X,
            beta * position.Y,
            beta * position.Z
        );
    };

    Ellipsoid.prototype.ComputeCurve = function(start, stop, granularity){
        if(granularity <= 0.0){
            throw new Error('granularity must be >0.0');
        }

        var normal = start.Cross(stop).Normalize();
        var theta = start.AngleBetween(stop);
        var n = Math.max(Math.floor((theta / granularity)) - 1, 0);

        var positions = new Array(2 + n);

        positions.push(start);

        for(var i = 1; i <= positions.length; ++i){
            var phi = (i * granularity);
            positions.push(this.ScaleTOGeocentricSurface(
                start.RotateAroundAxis(normal,phi)
            ));
        }

        positions.push(stop);

        return positions;
    };







    return Ellipsoid;
});