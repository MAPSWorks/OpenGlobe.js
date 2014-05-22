/**
 * Created by Administrator on 2014/5/1.
 */
define([
    'Core/Vector2D',
    'Scene/Terrain/RasterLevel',
    'Renderer/Uniform/Texture2D'
],function(
    Vector2D,
    RasterLevel,
    Texture2D
    ){
    'use strict';

    var Extent = function(west, south, east, north){
        this.West = west;
        this.South = south;
        this.East = east;
        this.North = north;
    };

    var ClipmapLevel = function(){
        this.Terrain = null;
        this.Imagery = null;

        this.HeightTexture = null;
        this.NormalTexture = null;
        this.ImageryTexture = null;

        this.OriginIntextures = new Vector2D(0,0);
        this.OriginInImagery = new Vector2D(0,0);

        this.OffsetStripOnNorth = false;
        this.OffsetStripOnEast = false;

        this.CurrentExtent = new Extent(1,1,0,0);
        this.NextExtent = new Extent(0,0,0,0);

        this.CurrentImageryExtent = new Extent(1,1,0,0);
        this.NextImageryExtent = new Extent(0,0,0,0);

        this.FinerLevel = null;
        this.CoarserLevel = null;

        this.ImageryWidth = 0;
        this.ImageryHeight = 0;

    };

    ClipmapLevel.Extent = Extent;

    return ClipmapLevel;
});