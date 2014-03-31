/**
 * Created by luosong on 2014/3/31.
 */
define([
    'Core/defineProperties',
    'Core/WindingOrder',
    'Renderer/CullFace'
],function(
    defineProperties,
    WindingOrder,
    CullFace
){

    var FacetCulling = function(){
        this._enabled = true;
        this._face = CullFace.Back;
        this._frontFaceWindingOrder = WindingOrder.Counterclockwise;
    };

    defineProperties(FacetCulling.prototype,{
        Enabled : {
            get : function(){
                return this._enabled;
            },
            set : function(x){
                this._enabled = x;
            }
        },

        Face : {
            get : function(){
                return this._face;
            },
            set : function(x){
                this._face = x;
            }
        },

        FrontFaceWindingOrder : {
            get : function(){
                return this._frontFaceWindingOrder;
            },
            set : function(x){
                this._frontFaceWindingOrder = x;
            }
        }
    });

    return FacetCulling;

});