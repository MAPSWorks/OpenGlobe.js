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
    'Renderer/Uniform/UniformFloatVec4',
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
    UniformFloatVec4,
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

        var builtinConstants = '' +
            '#ifdef GL_ES;\n' +
            'precision highp float;\n' +
            '#endif;\n' +
            'const float og_E = ' + Math.E + ';\n' +
            'const float og_pi = ' + Math.PI + ';\n' +
            'const float og_oneOverPi = ' + 1.0/Math.PI + ';\n' +
            'const float og_piOverTwo = ' + Math.PI/2.0 + ';\n' +
            'const float og_piOverThree = ' + Math.PI/3.0 + ';\n' +
            'const float og_piOverFour = ' + Math.PI/4.0 + ';\n' +
            'const float og_piOverSix = ' + Math.PI/6.0 + ';\n' +
            'const float og_threePiOver2 = ' + 3 * Math.PI/2.0 + ';\n' +
            'const float og_twoPi = ' + 2 * Math.PI + ';\n' +
            'const float og_oneOverTwoPi = ' + 1.0 /(2 * Math.PI) + ';\n' +
            'const float og_radiansPerDegree = ' + Math.PI/180.0 + ';\n' +
            'const float og_maximumFloat = ' + Number.MAX_VALUE + ';\n' +
            'const float og_minimumFloat = ' + Number.MIN_VALUE + ';\n';
        var builtinFunctions = '' +
            '//\n' +
            '// (C) Copyright 2010 Patrick Cozzi and Kevin Ring\n' +
            '// Distributed under the MIT License.\n' +
            '// See License.txt or http://www.opensource.org/licenses/mit-license.php.\n' +
            '//\n' +
            '\n' +
            'vec4 og_ClipToWindowCoordinates(vec4 v, mat4 viewportTransformationMatrix)\n' +
            '{\n' +
            '    v.xyz /= v.w;                                                  // normalized device coordinates\n' +
            '    v.xyz = (viewportTransformationMatrix * vec4(v.xyz, 1.0)).xyz; // window coordinates\n' +
            '    return v;\n' +
            '}\n' +

            'float og_distanceToLine(vec2 f, vec2 p0, vec2 p1)\n' +
            '{\n' +
            '    vec2 l = f - p0;\n' +
            '    vec2 d = p1 - p0;\n' +
            '\n' +
            '    //\n' +
            '    // Closed point on line to f\n' +
            '    //\n' +
            '    vec2 p = p0 + (d * (dot(l, d) / dot(d, d)));\n' +
            '    return distance(f, p);\n' +
            '}\n' +

            '//\n' +
            '// Emulates double precision subtraction.\n' +
            '// Returns left - right.\n' +
            '//\n' +
            'vec3 og_EmulatedDoubleSubtract(\n' +
            'vec3 leftHigh,  vec3 leftLow,\n' +
            'vec3 rightHigh, vec3 rightLow)\n' +
            '{\n' +
            '    vec3 t1 = leftLow - rightLow;\n' +
            '    vec3 e = t1 - leftLow;\n' +
            '    vec3 t2 = ((-rightLow - e) + (leftLow - (t1 - e))) + leftHigh - rightHigh;\n' +
            '    vec3 highDifference = t1 + t2;\n' +
            '    vec3 lowDifference = t2 - (highDifference - t1);\n' +
            '\n' +
            '    return highDifference + lowDifference;\n' +
            '}\n' +

            '//\n' +
            '// Typical inputs:\n' +
            '//\n' +
            '//   in vec3 positionHigh;\n' +
            '//   in vec3 positionLow;\n' +
            '//   uniform vec3 og_cameraEyeHigh;\n' +
            '//   uniform vec3 og_cameraEyeLow;\n' +
            '//   uniform mat4 og_modelViewPerspectiveMatrixRelativeToEye;\n' +
            '//\n' +
            'vec4 ogTransformEmulatedDoublePosition(\n' +
            'vec3 positionHigh,  vec3 positionLow,\n' +
            'vec3 cameraEyeHigh, vec3 cameraEyeLow,\n' +
            'mat4 modelViewPerspectiveMatrixRelativeToEye)\n' +
            '{\n' +
            '    vec3 positionEye = og_EmulatedDoubleSubtract(positionHigh, positionLow, cameraEyeHigh, cameraEyeLow);\n' +
            '    return modelViewPerspectiveMatrixRelativeToEye * vec4(positionEye, 1.0);\n' +
            '}\n' +

            'vec4 ogTransformEmulatedDoublePosition(\n' +
            'vec3 positionHigh,  vec3 positionLow,\n' +
            'vec3 cameraEyeHigh, vec3 cameraEyeLow,\n' +
            'mat4 modelViewPerspectiveMatrixRelativeToEye,\n' +
            'out vec3 positionInModelCoordinates)\n' +
            '{\n' +
            '    vec3 positionEye = og_EmulatedDoubleSubtract(positionHigh, positionLow, cameraEyeHigh, cameraEyeLow);\n' +
            '\n' +
            '    positionInModelCoordinates = cameraEyeHigh + positionEye;\n' +
            '    return modelViewPerspectiveMatrixRelativeToEye * vec4(positionEye, 1.0);\n' +
            '}\n';

        this._vertexShader = this.initVertexShader(builtinConstants + builtinFunctions + vertexShaderSource);
        this._fragmentShader = this.initFragmentShader(builtinConstants + builtinFunctions +fragmentShaderSource);



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
            // An error occurred while linking
            alert("Counld not initialise shaders");

            var lastError = gl.getProgramInfoLog(this._program);
            alert("Error in program linking:" + lastError);

            gl.deleteProgram(this._program);
            return null;
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
            case Type.FLOAT_VEC4:
                return new UniformFloatVec4(name,type,location,this);
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