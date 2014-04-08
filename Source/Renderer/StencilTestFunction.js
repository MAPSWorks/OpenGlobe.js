/**
 * Created by luosong on 2014/3/31.
 */
define(['Core/Enumeration'],function(Enumeration){
    "use strict";

    var StencilTestFunction = {
        Never : new Enumeration(0,'Never'),
        Less : new Enumeration(1,'Less'),
        Equal : new Enumeration(2,'Equal'),
        LessThanOrEqual : new Enumeration(3,'LessThanOrEqual'),
        Greater : new Enumeration(4,'Greater'),
        NotEqual : new Enumeration(5,'NotEqual'),
        GreaterThanOrEqual : new Enumeration(6,'GreaterThanOrEqual'),
        Always : new Enumeration(7,'Always')
    };

    return StencilTestFunction;
});