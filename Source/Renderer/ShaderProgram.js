/**
 * Created by luosong on 2014/4/1.
 */
define([
    'Core/defineProperties',
    'Renderer/Type',
    'Renderer/Uniform/Uniform',
    'Renderer/Uniform/UniformBool',
    'Renderer/Uniform/UniformFloat',
    'Renderer/Uniform/UniformFloatVec3',
    'Renderer/Uniform/UniformFloatMatrix44',
    'Renderer/Uniform/UniformSampler2D',
    'Renderer/ShaderProgramBase'
],function(
    defineProperties,
    Type,
    Uniform,
    UniformBool,
    UniformFloat,
    UniformFloatVec3,
    UniformFloatMatrix44,
    UniformSampler2D,
    ShaderProgramBase
    )
{
    'use strict';

    var ShaderProgram = function(context,vertexShaderSource,fragmentShaderSource){
        this._gl = context;
        this._program = null;
        this._uniforms = [];
        this._vertexAttributes = [];

        this._dirtyUniforms = [];

        this._vertexShader = this.initVertexShader(vertexShaderSource);
        this._fragmentShader = this.initFragmentShader(fragmentShaderSource);



        this.initProgram(this._vertexShader,this._fragmentShader);

    };

    ShaderProgram.prototype = new ShaderProgramBase();
    ShaderProgram.prototype.constructor = ShaderProgram;

    defineProperties(ShaderProgram.prototype,{
        VertexAttributes:{
            get : function(){
                return this._vertexAttributes;
            }
        }
    });

    ShaderProgram.prototype.initVertexShader = function(vertexShaderSource){
        var gl = this._gl;

        var shader = gl.createShader(gl.VERTEX_SHADER);

        gl.shaderSource(shader,vertexShaderSource);
        gl.compileShader(shader);

        if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)){
            alert(gl.getShaderInfoLog(shader));
            return null;
        }

        return shader;

    };

    ShaderProgram.prototype.initFragmentShader = function(fragmentShaderSource){
        var gl = this._gl;

        var shader = gl.createShader(gl.FRAGMENT_SHADER);

        gl.shaderSource(shader,fragmentShaderSource);
        gl.compileShader(shader);

        if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)){
            alert(gl.getShaderInfoLog(shader));
            return null;
        }

        return shader;
    };

    ShaderProgram.prototype.initProgram = function(vertexShader,fragmentShader){
        var gl = this._gl;

        this._program = gl.createProgram();
        gl.attachShader(this._program,vertexShader);
        gl.attachShader(this._program,fragmentShader);
        gl.linkProgram(this._program);

        if(!gl.getProgramParameter(this._program, gl.LINK_STATUS)){
            alert("Counld not initialise shaders");
        }

        this._uniforms = this.findUniforms(this._program);
        this._vertexAttributes = this.findVertexAttributes(this._program);

        this.initializeAutomaticUniforms(this._uniforms);
    };

    ShaderProgram.prototype.findVertexAttributes = function(program){
        var gl = this._gl;

        var numberOfAttributes = gl.getProgramParameter(program,gl.ACTIVE_ATTRIBUTES);
        //var attributeNameMaxLength = gl.getParameter(gl.MAX_VERTEX_ATTRIBS);

        var vertexAttributes = [];
        for(var i=0; i<numberOfAttributes; ++i){
            //var attributeNameLength;
            //var attributeLength;

            var attrib = gl.getActiveAttrib(program, i);
            var size = attrib.size;
            var name = attrib.name;
            var type = attrib.type;

            if(name.indexOf('gl_') == 0){
                continue;
            }

            var attributeLocation = gl.getAttribLocation(program,name);
            vertexAttributes.push({
                Info: attrib,
                Name : name,
                Type : type,
                Location: attributeLocation
            });
        }

        return vertexAttributes;
    };

    ShaderProgram.prototype.findUniforms = function(program){
        var gl = this._gl;

        var numberOfUniforms = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
        var uniforms = [];
        for(var i = 0; i < numberOfUniforms; i++){
            var unifInfo = gl.getActiveUniform(program, i);

            var name = this.correctUniformName(unifInfo.name);
            if(name.indexOf('gl_') == 0){
                continue;
            }

            var uniformLocation = gl.getUniformLocation(program,name);
            var u = this.createUniform(name,unifInfo.type,uniformLocation);
            uniforms.push(u);
        }

        return uniforms;

    };

    ShaderProgram.prototype.correctUniformName = function(name){
        // on ati, array uniforms have a [0] suffix
        if(this.endsWith(name,'[0]')){
            return name.substr(0,name.length - 3);
        }
        return name;
    };

    ShaderProgram.prototype.endsWith = function(str, suffix) {
        return str.indexOf(suffix, str.length - suffix.length) !== -1;
    };

    ShaderProgram.prototype.createUniform = function(name,type,location){
        //return new Uniform(name,type,location);

        switch (type){
            case Type.BOOL:
                return new UniformBool(name,type,location,this);
            case Type.FLOAT:
                return new UniformFloat(name,type,location,this);
            //case Type.FLOAT_VEC2:
            case Type.FLOAT_VEC3:
                return new UniformFloatVec3(name,type,location,this);
            //case Type.FLOAT_VEC4:
            //case Type.FLOAT_MAT2:
            //case Type.FLOAT_MAT3:
            case Type.FLOAT_MAT4:
                return new UniformFloatMatrix44(name,type,location,this);
            case Type.SAMPLER_2D:
                return new UniformSampler2D(name,type,location,this);
        }

        throw new Error("A new Uniform derived class needs to be added to support this uniform type " + type);
    };

    ShaderProgram.prototype.NotifyDirty = function(uniform){
        this._dirtyUniforms.push(uniform);
    };

    ShaderProgram.prototype.getUniformByName = function(name){
        for(var i = 0; i < this._uniforms.length; i++){
            var u = this._uniforms[i];
            if(u.Name == name){
                return u;
            }
        }

        return null;
    };

    ShaderProgram.prototype.clean = function(context,drawState,sceneState){
        this.setDrawAutomaticUniforms(context,drawState,sceneState);

        for(var i = 0; i < this._dirtyUniforms.length; ++i){
            this._dirtyUniforms[i].Clean(this._gl);
        }

        this._dirtyUniforms = [];
    };

    return ShaderProgram;
});