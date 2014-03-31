/**
 * Created by luosong on 2014/3/31.
 */
define(['Core/Enumeration'],function(Enumeration){
    "use strict";

    var SourceBlendingFactor = {

        Zero : new Enumeration(0,'Zero'),

        One : new Enumeration(1,'One'),

        SourceAlpha : new Enumeration(2,'SourceAlpha'),

        OneMinusSourceAlpha : new Enumeration(3,'OneMinusSourceAlpha'),

        DestinationAlpha : new Enumeration(4,'DestinationAlpha'),

        OneMinusDestinationAlpha : new Enumeration(5,'OneMinusDestinationAlpha'),

        DestinationColor : new Enumeration(6,'DestinationColor'),

        OneMinusDestinationColor : new Enumeration(7,'OneMinusDestinationColor'),

        SourceAlphaSaturate : new Enumeration(8,'SourceAlphaSaturate'),

        ConstantColor : new Enumeration(9,'ConstantColor'),

        OneMinusConstantColor : new Enumeration(10,'OneMinusConstantColor'),

        ConstantAlpha : new Enumeration(11,'ConstantAlpha'),

        OneMinusConstantAlpha : new Enumeration(12,'OneMinusConstantAlpha')

    };

    return SourceBlendingFactor;
});