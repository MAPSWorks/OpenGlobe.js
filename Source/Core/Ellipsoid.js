/**
 * Created by luosong on 2014/3/27.
 */
define(['Core/Geodetic2D','Core/Geodetic3D'],function(Geodetic2D,Geodetic3D){

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

    Ellipsoid.prototype.GeodeticSurfaceNormal_vec3 = function(positionOnEllisoid){
        var cossOut = vec3.create();
        var out = vec3.create();
        vec3.cos(cossOut,positionOnEllisoid,this._oneOverRadiiSquared);
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

    };

    Ellipsoid.prototype.getRadii = function(){
        return this._radii;
    };

    Ellipsoid.prototype.getRadiiSquared = function(){
        return this._radiiSquared;
    };

    Ellipsoid.prototype.getOneOverRadiiSquared = function(){
        return this._oneOverRadiiSquared;
    };

    Ellipsoid.prototype.getMinimumRadius = function(){
        return Math.min(this._radii[0], Math.min(this._radii[1], this._radii[2]));
    };

    Ellipsoid.prototype.getMaximumRadius = function(){
        return Math.max(this._radii[0], Math.max(this._radii[1], this._radii[2]));
    };


    Ellipsoid.prototype.Intersections = function(origin, direction){
        //TODO

    };

    return Ellipsoid;
});