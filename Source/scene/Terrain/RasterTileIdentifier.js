/**
 * Created by luosong on 2014/4/30.
 */
define([],function(){
    'use strict';

    var RasterTileIdentifier = function(level, x, y){
        this.Level = level;
        this.X = x;
        this.Y = y;
    };

    RasterTileIdentifier.prototype.Equals = function(other){
        return this.Level == other.Level && this.X == other.X && this.Y == other.Y;
    };

    return RasterTileIdentifier;
});