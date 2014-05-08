/**
 * Created by luosong on 2014/4/30.
 */
define([
    'Core/defineProperties',
    'Core/GeodeticExtent',
    'Scene/Terrain/RasterTileIdentifier',
    'Scene/Terrain/RasterTile',
    'Scene/Terrain/RasterTileRegion',
    'Scene/Terrain/RasterLevel'
],function(
    defineProperties,
    GeodeticExtent,
    RasterTileIdentifier,
    RasterTile,
    RasterTileRegion,
    RasterLevel
    ){
   'use strict';

    var RasterLevel = function(
        source, level, extent,
        longitudePosts, latitudePosts,
        longitudePostsPerTile, latitudePostsPerTile){

        this._source = source;
        this._level = level;
        this._extent = extent;
        this._longitudePosts = longitudePosts;
        this._latitudePosts = latitudePosts;
        this._longitudePostsPerTile = longitudePostsPerTile;
        this._latitudePostsPerTile = latitudePostsPerTile;

        this._postDeltaLongitude = (this._extent.East - this._extent.West)/(longitudePosts - 1);
        this._postDeltaLatitude = (this._extent.North - this._extent.South)/(latitudePosts -1);
    };

    defineProperties(RasterLevel.prototype,{
        Source : {
            get : function(){
            return this._source;
        }},

        Level : {
            get : function(){
            return this._level;
        }},
        Extent : {
            get : function(){
            return this._extent;
        }},
        LongitudePosts : {
            get : function(){
            return this._longitudePosts;
        }},
        LatitudePosts : {
            get : function(){
            return this._latitudePosts;
        }},
        LongitudePostsPerTile : {
            get : function(){
            return this._longitudePostsPerTile;
        }},
        LatitudePostsPerTile : {
            get : function(){
            return this._latitudePostsPerTile;
        }},
        PostDeltaLongitude : {
            get : function(){
            return this._postDeltaLongitude;
        }},
        PostDeltaLatitude : {
            get : function(){
            return this._postDeltaLatitude;
        }}
    });

    RasterLevel.prototype.LongitudeToIndex = function(longitude){
        return (longitude - this._extent.West) / this._postDeltaLongitude;
    };


    RasterLevel.prototype.LatitudeToIndex = function(latitude){
        return (latitude - this._extent.South) / this._postDeltaLatitude;
    };

    RasterLevel.prototype.IndexToLongitude = function(longitudeIndex){
        return this._extent.West + longitudeIndex * this._postDeltaLongitude;
    };

    RasterLevel.prototype.IndexToLatitude = function(latitudeIndex){
        return this._extent.South + latitudeIndex * this._postDeltaLatitude;
    };

    RasterLevel.prototype.GetTilesInExtent = function(west, south, east, north){
        var tileXStart = west / this.LongitudePostsPerTile;
        var tileXStop = east / this.LongitudePostsPerTile;

        if(west < 0){
            --tileXStart;
        }
        if(east < 0){
            --tileXStop;
        }

        var tileYStart = south / this.LatitudePostsPerTile;
        var tileYStop = north / this.LatitudePostsPerTile;

        if(south < 0){
            --tileYStart;
        }
        if(north < 0){
            --tileYStop;
        }

        var tileWidth = tileXStop - tileXStart + 1;
        var tileHeight = tileYStop - tileYStart + 1;

        var result = new Array(tileWidth * tileHeight);            //RasterTileRegion
        var resultIndex = 0;

        for(var tileY = tileYStart; tileY <= tileYStop; ++tileY){
            var tileYOrigin = tileY * this.LatitudePostsPerTile;

            var currentSouth = south - tileYOrigin;
            if(currentSouth < 0){
                currentSouth = 0;
            }

            var currentNorth = north - tileYOrigin;
            if(currentNorth >= self.LatitudePostsPerTile){
                currentNorth = this.LatitudePostsPerTile - 1;
            }

            for(var tileX = tileXStart; tileX <= tileXStop; ++tileX){
                var tileXOrigin = tileX * this.LongitudePostsPerTile;

                var currentWest = west - tileXOrigin;
                if(currentWest < 0){
                    currentWest = 0;
                }

                var currentEast = east - tileXOrigin;
                if(currentEast >= self.LongitudePostsPerTile){
                    currentEast = self.LongitudePostsPerTile - 1;
                }

                var tileID = new RasterTileIdentifier(this._level,tileX,tileY);
                var tile = self.Source.GetTile(tileID);
                result[resultIndex] = new RasterTileRegion(tile,currentWest,currentSouth,currentEast,currentNorth);
                ++resultIndex;
            }
        }

        return result;

    };

    return RasterLevel;
});