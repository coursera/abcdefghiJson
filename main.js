
var _ = require('underscore');

function alphabetize(obj){
	if (_.isArray(obj)){
		var result = [];
		_.each(obj, function(el){
			result.push(alphabetize(el));
		});
		var resultStr = '[';
		for(var item, i=0; item = result[i]; i++){
			resultStr += item;
			if(i !== result.length - 1){
				resultStr += ',';
			}
		}
		resultStr += ']';
		return resultStr;
	} else if(_.isObject(obj)){
		var result = [];
		_.each(obj, function(val, key){
			result.push({
				key: key,
				val: alphabetize(val)
			});
		});
		result = result.sort(function(a, b){
			if(a.key < b.key){
				return -1
			} 
			return 1;
		});

		var resultStr = '{';
		for(var item, i = 0; item = result[i]; i++){
			resultStr += '"' + item.key + '"' + ':' + item.val;
			if (i !== result.length - 1){
				resultStr += ','
			}
		}
		resultStr += '}';
		return resultStr;
	} else if(_.isString(obj)){
		// strings should be double-quoted
		return '"' + obj + '"';
	} else {
		// booleans, numbers, and null can just be returned
		return obj;
	}
};

module.exports.alphebatize = alphebatize;
