define(function(){
	
	var definePropertyWorks = (function(){
		try{
			return 'x' in Object.defineProperty({},'x',{});
		}catch(e){
			return false;
		}
	})();

	// var defineProperties = Object.defineProperties;
	// if(!definePropertyWorks){
	// 	defineProperties = function(o){
	// 		return o;
	// 	};
	// }

	var defineProperties = Object.defineProperties;
	if(!definePropertyWorks){
		defineProperties = function(obj, properties){
			function convertToDescriptor(desc)
			{
				function hasProperty(obj, prop)
				{
					return Object.prototype.hasOwnProperty.call(obj, prop);
				}

				function isCallable(v)
				{
					// 如果除函数以外,还有其他类型的值也可以被调用,则可以修改下面的语句
					return typeof v === "function";
				}

				if (typeof desc !== "object" || desc === null)
					throw new TypeError("不是正规的对象");

				var d = {};
				if (hasProperty(desc, "enumerable"))
					d.enumerable = !!obj.enumerable;
				if (hasProperty(desc, "configurable"))
					d.configurable = !!obj.configurable;
				if (hasProperty(desc, "value"))
					d.value = obj.value;
				if (hasProperty(desc, "writable"))
					d.writable = !!desc.writable;
				if (hasProperty(desc, "get")){
					var g = desc.get;
					if (!isCallable(g) && g !== "undefined")
					throw new TypeError("bad get");
					d.get = g;
				}
				if (hasProperty(desc, "set")){
					var s = desc.set;
					if (!isCallable(s) && s !== "undefined")
					throw new TypeError("bad set");
					d.set = s;
				}

				if (("get" in d || "set" in d) && ("value" in d || "writable" in d))
					throw new TypeError("identity-confused descriptor");

				return d;
			}

		  if (typeof obj !== "object" || obj === null)
		    throw new TypeError("不是正规的对象");

		  properties = Object(properties);
		  var keys = Object.keys(properties);
		  var descs = [];
		  for (var i = 0; i < keys.length; i++)
		    descs.push([keys[i], convertToDescriptor(properties[keys[i]])]);
		  for (var i = 0; i < descs.length; i++)
		    Object.defineProperty(obj, descs[i][0], descs[i][1]);

		  return obj;
		}
	}

	return defineProperties;

});