/**
 * Created by luosong on 2014/3/31.
 */
define(function(){
    var Enumeration = function(value , name){
        this._value = value;
        this._name = name;
    };

    Enumeration.prototype.valueOf = function(){
        return this._value;
    };

    Enumeration.prototype.toString = function(){
        return this._name;
    };

    return Enumeration;
});