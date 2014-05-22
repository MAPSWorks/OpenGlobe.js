/**
 * Created by luosong on 2014/4/30.
 */
define([
    'Core/defineProperties',
    'Core/Ellipsoid',
    'Renderer/Context',
    'Scene/Terrain/WorldWindTerrainSource',
    'Scene/Terrain/EsriRestImagery',
    'Scene/Terrain/ClipmapLevel'

],function(
    defineProperties,
    Ellipsoid,
    Context,
    WorldWindTerrainSource,
    EsriRestImagery,
    ClipmapLevel

    ){

    'use strict';

    var GlobeClipmapTerrain = function(context, terrainSource, imagery, ellipsoid, clipmapPosts){

        this._context = context;
        this._terrainSource = terrainSource;

        this._clipmapPosts = clipmapPosts;
        this._clipmapSegments = clipmapPosts - 1;

        var clipmapLevels = this._terrainSource.Levels.Count;
        this._clipmapLevels = new Array(clipmapLevels);

        for(var i = 0; i < self._clipmapLevels.Count; ++i){
            this._clipmapLevels[i] = new ClipmapLevel();
        }


    };

    return GlobeClipmapTerrain;
});