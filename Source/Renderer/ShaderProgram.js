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
    'use strict';

    var ShaderProgram = function(context,vertexShaderSource,fragmentShaderSource){
        this._gl = context;
        this._program = null;
        this._uniforms = [];
        this._vertexAttributes = [];

        this._vertexShader = this.initVertexShader(vertexShaderSource);
        this._fragmentShader = this.initFragmentShader(fragmentShaderSource);

        this.initProgram(this._vertexShader,this._fragmentShader);

    };

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
            uniforms.push({
                uniformInfo: unifInfo,
                uniformLocation: uniformLocation
            });
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

    ShaderProgram.prototype.initializeAutomaticUniforms = function(uniforms){
        //TODO
        return;
        for(var i = 0; i < uniforms.length; i++){
            var uniform = uniforms[1];
        }
    };


    return ShaderProgram;
});