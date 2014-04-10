/**
 * Created by luosong on 2014/4/1.
 */
define([
    'Core/defineProperties',
    'Renderer/Device'
],function(
    defineProperties,
    Device
    )
{
    var FragmentOutputs = function(shaderProgram){
        this._program = shaderProgram;
    };




    return FragmentOutputs;
});