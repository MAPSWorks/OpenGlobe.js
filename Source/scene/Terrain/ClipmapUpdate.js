/**
 * Created by Administrator on 2014/5/1.
 */
define([
    'Core/defineProperties',
    'Scene/Terrain/ClipmapLevel'
],function(defineProperties,ClipmapLevel){
   'use strict';

    var ClipmapUpdate = function(clipmapLevel,west,south,east,north){
        this._level = clipmapLevel;
        this._west = west;
        this._south = south;
        this._east = east;
        this._north = north;
    };

    defineProperties(ClipmapUpdate.prototype,{
        Level : {
            get : function(){
                return this._level;
            }
        },
        West : {
            get : function(){
                return this._west;
            }
        },
        South : {
            get : function(){
                return this._south;
            }
        },
        East : {
            get : function(){
                return this._east;
            }
        },
        North : {
            get : function(){
                return this._north;
            }
        },
        Width : {
            get : function(){
                return this.East - this.West + 1;
            }
        },
        Height : {
            get : function(){
                return this.North - this.South + 1;
            }
        }
    });

    ClipmapUpdate.AddBufferWithinLevelNextExtent = function(){
        return new ClipmapUpdate(
            this._level,
            Math.max(this._west - 1,this.Level.NextExtent.West),
            Math.max(this._south - 1,this.Level.NextExtent.South),
            Math.min(this._east + 1,this.Level.NextExtent.East),
            Math.min(this._north + 1,this.Level.NextExtent.North)
        );
    };

    return ClipmapUpdate;
});