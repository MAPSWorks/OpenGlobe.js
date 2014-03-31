/**
 * Created by luosong on 2014/3/31.
 */
define(['Core/Enumeration'],function(Enumeration){
    var CullFace = {

        Front : new Enumeration(0,'Front'),

        Back : new Enumeration(1,'Back'),

        FrontAndBack : new Enumeration(2,'FrontAndBack'),

        validate : function(cullFace){
            return ((cullFace === CullFace.Front)||
                (cullFace === CullFace.Back)||
                (cullFace === CullFace.FrontAndBack));
        }
    };

    return CullFace;
});