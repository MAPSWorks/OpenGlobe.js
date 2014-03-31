/**
 * Created by luosong on 2014/3/31.
 */
define(['Core/Enumeration'],function(Enumeration){
    "use strict";

    var ClearBuffers = {

        ColorBuffer : new Enumeration(1,'ColorBuffer'),

        DepthBuffer : new Enumeration(2,'DepthBuffer'),

        StencilBuffer : new Enumeration(4,'StencilBuffer'),

        ColorAndDepthBuffer : new Enumeration((1|2),'ColorAndDepthBuffer'),

        All : new Enumeration((1 | 2 | 4),'All')

    };

    return ClearBuffers;
});