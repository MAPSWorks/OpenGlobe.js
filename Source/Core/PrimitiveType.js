/**
 * Created by luosong on 2014/3/31.
 */
define(['Core/Enumeration'],function(Enumeration){
    "use strict";

    var PrimitiveType = {

        Points : new Enumeration(0,'Points'),

        Lines : new Enumeration(1,'Lines'),

        LineLoop : new Enumeration(2,'LineLoop'),

        LineStrip : new Enumeration(3,'LineStrip'),

        Triangles : new Enumeration(4,'Triangles'),

        TriangleStrip : new Enumeration(5,'TriangleStrip'),

        TriangleFan : new Enumeration(6,'TriangleFan'),

        LinesAdjacency : new Enumeration(7,'LinesAdjacency'),

        LineStripAdjacency : new Enumeration(8,'LineStripAdjacency'),

        TrianglesAdjacency : new Enumeration(9,'TrianglesAdjacency'),

        TrianglesStripAdjacency : new Enumeration(10,'TrianglesStripAdjacency'),

        validate : function(primitiveType){
            return ((primitiveType === PrimitiveType.Points) ||
                (primitiveType === PrimitiveType.Lines) ||
                (primitiveType === PrimitiveType.LineLoop) ||
                (primitiveType === PrimitiveType.LineStrip) ||
                (primitiveType === PrimitiveType.Triangles) ||
                (primitiveType === PrimitiveType.TriangleStrip) ||
                (primitiveType === PrimitiveType.TriangleFan) ||
                (primitiveType === PrimitiveType.LinesAdjacency) ||
                (primitiveType === PrimitiveType.LineStripAdjacency) ||
                (primitiveType === PrimitiveType.TrianglesAdjacency) ||
                (primitiveType === PrimitiveType.TrianglesStripAdjacency));
        }

    };

    return PrimitiveType;
});