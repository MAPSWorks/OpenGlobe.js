/**
 * Created by luosong on 2014/3/27.
 */
define(['Core/defineProperties','Core/Geodetic2D','Core/Geodetic3D'],function(defineProperties,Geodetic2D,Geodetic3D){

    var Ellipsoid = function(x, y, z){
        if(x <= 0.0 || y <= 0.0 || z <= 0.0){
            throw new Error("radii error");
        }

        this._radii = vec3.fromValues(x,y,z);
        this._radiiSquared = vec3.fromValues(
            x * x,
            y * y,
            z * z
        );
        this._radiiToTheFourth = vec3.fromValues(
            this._radiiSquared[0] * this._radiiSquared[0],
            this._radiiSquared[1] * this._radiiSquared[1],
            this._radiiSquared[2] * this._radiiSquared[2]
        );
        this._oneOverRadiiSquared = vec3.fromValues(
            1.0 / (x * x),
            1.0 / (y * y),
            1.0 / (z * z)
        );

    };

    Ellipsoid.Wgs84 = new Ellipsoid(6378137.0, 6378137.0, 6356752.314245);
    Ellipsoid.ScaledWgs84 = new Ellipsoid(1.0, 1.0, 6356752.314245 / 6378137.0);
    Ellipsoid.UnitSphere = new Ellipsoid(1.0, 1.0, 1.0);

    Ellipsoid.CentricSurfaceNormal = function(positionOnEllipsoid){
        var out = vec3.create();
        vec3.normalize(out,positionOnEllipsoid);
        return out;
    };

    Ellipsoid.prototype.GeodeticSurfaceNormal = function(position){
        //var t = typeof position;
        var t = position instanceof Geodetic3D;
        if(t){
            var geodetic = position;
            var cosLatitude = Math.cos(geodetic.getLatitude());
            var out = vec3.create(
                cosLatitude * Math.cos(geodetic.getLongitude()),
                cosLatitude * Math.sin(geodetic.getLongitude()),
                Math.sin(geodetic.getLatitude())
            );
            return out;
        } 
        t = position instanceof Float32Array;
        if(t){
            var positionOnEllipsoid = position;
            var cossOut = vec3.create();
            var out = vec3.create();
            //vec3.cross(cossOut,positionOnEllipsoid,this._oneOverRadiiSquared);
            cossOut = vec3.fromValues(  positionOnEllipsoid[0] * this._oneOverRadiiSquared[0],
                                        positionOnEllipsoid[1] * this._oneOverRadiiSquared[1],
                                        positionOnEllipsoid[2] * this._oneOverRadiiSquared[2]);
            vec3.normalize(out,cossOut);
            return out;
        }
    }

    Ellipsoid.prototype.GeodeticSurfaceNormal_vec3 = function(positionOnEllipsoid){
        var cossOut = vec3.create();
        var out = vec3.create();
        cossOut = vec3.fromValues(  positionOnEllipsoid[0] * this._oneOverRadiiSquared[0],
                positionOnEllipsoid[1] * this._oneOverRadiiSquared[1],
                positionOnEllipsoid[2] * this._oneOverRadiiSquared[2]);
        vec3.normalize(out,cossOut);
        return out;
    };

    Ellipsoid.prototype.GeodeticSurfaceNormal_Geo = function(geodetic){
        var cosLatitude = Math.cos(geodetic.getLatitude());
        var out = vec3.create(
            cosLatitude * Math.cos(geodetic.getLongitude()),
            cosLatitude * Math.sin(geodetic.getLongitude()),
            Math.sin(geodetic.getLatitude())
        );

        return out;
    };

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
                return Math.min(this._radii[0], Math.min(this._radii[1], this._radii[2])); 
            }
        },
        MaximumRadius : {
            get : function(){
                return Math.max(this._radii[0], Math.max(this._radii[1], this._radii[2]));
            }
        }
    });


    Ellipsoid.prototype.Intersections = function(origin, direction){
        var normalizeDirection = vec3.create();
        vec3.normalize(normalizeDirection, direction);

        var a = normalizeDirection[0] * normalizeDirection[0] * this._oneOverRadiiSquared[0] + 
                normalizeDirection[1] * normalizeDirection[1] * this._oneOverRadiiSquared[1] + 
                normalizeDirection[2] * normalizeDirection[2] * this._oneOverRadiiSquared[2];
        var b = 2.0 * 
                (origin[0] * normalizeDirection[0] * this._oneOverRadiiSquared[0] + 
                 origin[1] * normalizeDirection[1] * this._oneOverRadiiSquared[1] +
                 origin[2] * normalizeDirection[2] * this._oneOverRadiiSquared[2]);
        var c = origin[0] * origin[0] * this._oneOverRadiiSquared[0] + 
                origin[1] * origin[1] * this._oneOverRadiiSquared[1] +
                origin[2] * origin[2] * this._oneOverRadiiSquared[2] - 1.0;

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
            geodetic3D = new Geodetic3D(geodetic.Longitude, geodetic.Latitude);
        }else{
            geodetic3D = geodetic;
        }

        var n = this.GeodeticSurfaceNormal(geodetic3D);
        var k = vec3.fromValues(
            this._radiiSquared[0] * n[0],
            this._radiiSquared[1] * n[1],
            this._radiiSquared[2] * n[2]
        );

        var gamma = Math.sqrt(
            (k[0] * n[0]) + (k[1] * n[1]) + (k[2] * n[2])
        );

        var rSurface = vec3.fromValues(
            k[0]/gamma,k[1]/gamma,k[2]/gamma
        );

        var res = vec3.create();
        vec3.scaleAndAdd(res, rSurface, n, geodetic3D.Height);

        return res;
    };

    Ellipsoid.prototype.ToGeodetic2D = function(positionOnEllipsoid){
        var n = this.GeodeticSurfaceNormal(positionOnEllipsoid);
        var nMagnitude = Math.sqrt(n[0]*n[0] + n[1]*n[1] + n[2]*n[2]);
        return new Geodetic2D(
            Math.atan2(n[1],n[0]),
            Math.asin(n[2] / nMagnitude)
        );
    };

    Ellipsoid.prototype.ToGeodetic3D = function(position){
        var p = this.ScaleToGeodeticSurface(position);
        var h = vec3.create();
        vec3.subtract(h, position, p);

        var hMagnitude = Math.sqrt(h[0]*h[0] + h[1]*h[1] + h[2]*h[2]);
        var tempDot = vec3.dot(h, position);
        if(tempDot > 0){
            tempDot = 1.0;
        }else if(tempDot == 0.0){
            tempDot = 0;
        }else{
            tempDot = -1.0;
        }

        var height = tempDot * hMagnitude;

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
    }

    Ellipsoid.prototype.ToGeodetic3Ds = function(positions){
        var geodetics = [];

        for( var i = 0; i < positions.length; i++){
            var position = positions[i];
            geodetics.push(this.ToGeodetic3D(position));
        }

        return geodetics;
    };

    Ellipsoid.prototype.ScaleToGeodeticSurface = function(position){
        //TODO
    };




    return Ellipsoid;
});